export async function GET(request:Request,response:Response){
const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:3000/api/auth/callback/google&response_type=code&scope=profile email`
   return Response.redirect(googleAuthUrl)
}