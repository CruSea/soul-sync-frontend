import { withAuth } from "next-auth/middleware"


export const config = { matcher: ["/dashboard"] }


export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
})