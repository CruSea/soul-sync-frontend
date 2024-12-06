import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { state, code } = req.query;

  if (!code || !state) {
    return res.status(400).json({ error: "Missing code or state parameter" });
  }
console.log("code",code)
//   try {
//     // Step 2: Exchange the `code` for tokens with Google
//     const response = await fetch("https://oauth2.googleapis.com/token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({
//         code: code as string,
//         client_id: process.env.GOOGLE_CLIENT_ID as string,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
//         redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
//         grant_type: "authorization_code",
//       }),
//     });

//     const tokens = await response.json();

//     if (!response.ok) {
//       console.error("Failed to exchange code for tokens:", tokens);
//       return res.status(500).json({ error: "Failed to exchange code for tokens" });
//     }

//     // Step 3: Use tokens to fetch the user's Google profile
//     const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
//       headers: {
//         Authorization: `Bearer ${tokens.access_token}`,
//       },
//     });

//     const userInfo = await userInfoResponse.json();

//     if (!userInfoResponse.ok) {
//       console.error("Failed to fetch user info:", userInfo);
//       return res.status(500).json({ error: "Failed to fetch user info" });
//     }

//     // Step 4: Respond or redirect based on your application logic
//     console.log("User info:", userInfo);
//     res.status(200).json({ message: "Authentication successful", user: userInfo, tokens });
//   } catch (error) {
//     console.error("Error handling Google callback:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
}
