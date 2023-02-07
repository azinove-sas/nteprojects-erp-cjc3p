/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next";
import { getDatabase } from "firebase/database";
import { FirebaseApp } from "azinove/libraries/Firebase";
import { ref, update } from "firebase/database";
import { selectedCertificatInfo } from "./generate";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      await setCertificat(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
const setCertificat = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { uuid, selectedCertificat, props }: any = req.body;

    console.log(uuid);
    const DB = getDatabase(FirebaseApp);
    await update(ref(DB, "/CERTIFICAT/" + uuid), {
      certificateInfo: selectedCertificatInfo(selectedCertificat, props),
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};
