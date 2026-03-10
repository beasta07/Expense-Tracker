"use server";
import { hashPassword, verifyFunction } from "@/lib/auth";
import { createToken, verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// in app/actions/auth.ts
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;
  if (!token) return null;
  return await verifyToken(token); // returns { userId } or null
}

export async function signUp(prevData, formData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return {
        success: false,
        error: "Email Address and Passwords are required",
      };
    }
    // STEP 3: Check if email already exists

    const exisitngUser = await prisma.user.findUnique({
      where: { email },
    });

    if (exisitngUser) {
      return {
        success: false,
        error: "Email already exists",
      };
    }
    //STEP 4 : Hash the password
    const hashedPassword = await hashPassword(password);

    // STEP 5: Create user in database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: email.split("@")[0], // <- Remove the extra brace
      },
    });
    //STEP 6: Create JWT token
    const token = await createToken(user.id);

    //STEP 7: STORE SESSION IN DATABASE
    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const cookiesStore = await cookies();
    cookiesStore.set("jwt_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours in seconds
    });
    //STEP 8: Return success
    return {
      success: true,

      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      message: "Successfully signed in ",
    };
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      sucess: false,
      error: "Something went wrong. Please try again",
    };
  }
}
export async function logIn(prevData, formData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    //Checking if email and passwor is entered by the user
    if (!email || !password) {
      return {
        success: false,
        error: "Both emails and password are required.",
      };
    }
    //Hash password

    //Checking email exists from database
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    //Checking if the entered passwrod is correct

    //If user doesn't exist
    if (!userExists) {
      return {
        success: false,
        error: "Email or Password is incorrect",
      };
    }
    if (!(await verifyFunction(password, userExists.password))) {
      return {
        success: false,
        error: "Email or Password is incorrect",
      };
    }

    // CREATE A TOKEN
    const token =await createToken(userExists.id);

    //STORE SESSION IN DATABASE
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
      maxAge: 60 * 60 * 24, // 24 hours in seconds
    });
    return {
      success: true,

      user: {
        id: userExists.id,
        email: userExists.email,
        name: userExists.name,
      },
      message: "Successfully Logged In",
    };
  } catch (err) {
    console.error("Login error", err);
  }
}
export async function logout() {
  try {
     const cookieStore =await cookies()
    const token = cookieStore.get('jwt_token')?.value
    await prisma.session.deleteMany({
      where: {
        token: token,
      },
    });
    cookieStore.delete('jwt_token')

   

  } catch (err) {
    return {
      success: false,
      message: err,
    };
  }
      redirect('/login')

}
