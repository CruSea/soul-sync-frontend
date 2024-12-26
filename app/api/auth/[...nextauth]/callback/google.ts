import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { state, code } = req.query;

  if (!code || !state) {
    return res.status(400).json({ error: "Missing code or state parameter" });
  }
console.log("code",code)
}
