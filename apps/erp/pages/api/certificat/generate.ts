/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next";
import { ref, set } from "firebase/database";
import { getDatabase } from "firebase/database";
import { FirebaseApp } from "azinove/libraries/Firebase";
import { uuidGenerate } from "azinove/libraries/uuid";
import { CERTIFICAT } from "@constant/certificateList";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      await generate(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
const generate = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { number, selectedCertificat, selectedUser }: any = req.body;

    const DB = getDatabase(FirebaseApp);

    for (let i = 1; i <= number; i += 1) {
      const uuidNum = uuidGenerate();
      await set(ref(DB, "/CERTIFICAT/" + uuidNum), {
        certificateID: uuidNum,
        selectedCertificate: selectedCertificat,
        certificateInfo: selectedCertificatInfo(selectedCertificat),
        sharedLink: "/shared/certification/" + uuidNum,
        selectedUser: selectedUser,
        generated: new Date(),
        lastModification: new Date(),
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

const selectedCertificatInfo = (selectedCertificat: number) => {
  if (selectedCertificat == 0) {
    return {
      stickerNo: "none",
      equipmentType: "none",
      equipmentNo: "none",
      equipmentSNo: "none",
      inspectionDate: "none",
      nextInspectionDate: "none",
      inspectedBy: "none",
    };
  }
  return "to_change";
};
