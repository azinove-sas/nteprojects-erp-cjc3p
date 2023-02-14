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

    const DB = getDatabase(FirebaseApp);
    const info = await selectedCertificatInfo(selectedCertificat, props);
    await update(ref(DB, "/CERTIFICAT/" + uuid), {
      certificateInfo: info,
    });

    console.log(info);
    await res.revalidate("/shared/certification/" + uuid);
    await res.revalidate("/certification/info/" + uuid);
    res.status(200).json({
      revalidated: true,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
