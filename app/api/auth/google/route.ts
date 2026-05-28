export async function GET(){
const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=https://expense-tracker-ol76mlxj0-pranishbistas-projects.vercel.app/api/auth/callback/google`
   return Response.redirect(googleAuthUrl)
}