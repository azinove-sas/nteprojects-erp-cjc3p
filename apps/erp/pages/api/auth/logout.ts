/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next";

async function handleLogout(req: NextApiRequest, res: NextApiResponse) {
  res.redirect(
    `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.CLIENT_ID}&returnTo=${process.env.NEXT_PUBLIC_URL}`
  );
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await handleLogout(req, res);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
