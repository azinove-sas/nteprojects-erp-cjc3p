/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next";
import { getDatabase } from "firebase/database";
import { FirebaseApp } from "azinove/libraries/Firebase";
import { ref, update } from "firebase/database";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      await setApproval(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
const setApproval = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { uuid, status }: any = req.body;
    console.log(req.body);

    const DB = getDatabase(FirebaseApp);

    await update(ref(DB, "/CERTIFICAT/" + uuid), {
      certificateStatus: status,
    });

    await res.revalidate("/shared/certification/" + uuid);
    await res.revalidate("/certification/info/" + uuid);
    res.status(200).json({
      revalidated: true,
      success: true,
    });
  } catch (error) {
    console.log("[API]: ", error);
    res.status(400).json({ success: false });
  }
};
