/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next";
import { ref, get } from "firebase/database";
import { getDatabase } from "firebase/database";
import { FirebaseApp } from "azinove/libraries/Firebase";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      await getAccounts(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
const getAccounts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const DB = getDatabase(FirebaseApp);
    const account: any = (await get(ref(DB, "/USERS/"))).toJSON();

    res.status(200).json({
      success: true,
      data: account,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
