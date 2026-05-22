import { createToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const tokenRes = await fetch(`https://oauth2.googleapis.com/token`, {
    method: "POST",
    body: JSON.stringify({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/api/auth/callback/google",
      grant_type: "authorization_code",
    }),
  });
  const tokenData = await tokenRes.json();

  const access_token = tokenData.access_token;

  const info = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const userInfo = await info.json();
  const { id, name, email } = userInfo;

  const userExists = await prisma.user.findFirst({
    where: {
      googleId: id,
    },
  });

  if (userExists) {
    const token = await createToken(userExists.id);
    await prisma.session.create({
      data: {
        userId: userExists.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
    const cookieStore = await cookies();
    cookieStore.set("jwt_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
    return Response.redirect(new URL("/", request.url));

  } else {
    const emailExists = await prisma.user.findUnique({
      where: { email },
    });

    if (emailExists) {
      await prisma.user.update({
        data: { googleId: id },
        where: { email },
      });
      const token = await createToken(emailExists.id);
      await prisma.session.create({
        data: {
          userId: emailExists.id,
          token,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });
      const cookieStore = await cookies();
      cookieStore.set("jwt_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });
      return Response.redirect(new URL("/", request.url));

    } else {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          googleId: id,
        },
      });
      const token = await createToken(user.id);
      await prisma.session.create({
        data: {
          userId: user.id,
          token,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });
      const cookieStore = await cookies();
      cookieStore.set("jwt_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      });
      return Response.redirect(new URL("/", request.url));
    }
  }

  return new Response("Authentication failed", { status: 400 });
}