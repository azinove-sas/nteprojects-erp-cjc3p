/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next";
import { ref, set, get } from "firebase/database";
import { getDatabase } from "firebase/database";
import { FirebaseApp } from "azinove/libraries/Firebase";
import { uuidGenerate } from "azinove/libraries/uuid";

let TMP_num = "";

// @ts-ignore
const replaceAt = (string, index, replacement) => {
  return (
    string.toString().substring(0, index) +
    replacement +
    string.toString().substring(index + String(replacement).length)
  );
};

function incrementString(str: string) {
  let string = String(str);
  let res = Number(str);
  const resCount = (res += 1).toString();

  let j = resCount.length - 1;
  for (let i = string.length - 1; j != -1; 0) {
    string = replaceAt(string, i, resCount.at(j));
    j--;
    i--;
  }
  return string;
}

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
  // try {
  let { number, selectedCertificat, selectedUser }: any = req.body;
  const DB = getDatabase(FirebaseApp);
  let tmp;
  let BackUpData = [];

  if (selectedCertificat == 0) {
    tmp = (await get(ref(DB, "/CERTIFICAT_NUMBER/0"))).toJSON();
    if (tmp == null) {
      await set(ref(DB, "/CERTIFICAT_NUMBER/"), {
        0: "00000",
      });
      TMP_num = "00000";
    } else {
      TMP_num = String(tmp);
    }
  }

  let tmp_BackUpData: any = [];
  let tmp_i = 0;
  for (let i = 1; i <= number; i += 1) {
    const uuidNum = uuidGenerate();

    const certificateInfoTmp = await selectedCertificatInfo(
      selectedCertificat,
      undefined
    );

    const data = {
      certificateID: uuidNum,
      selectedCertificate: selectedCertificat,
      certificateInfo: certificateInfoTmp,
      sharedLink: "/shared/certification/" + uuidNum,
      selectedUser: selectedUser,
      generated: new Date(),
      lastModification: new Date(),
    };
    await set(ref(DB, "/CERTIFICAT/" + uuidNum), data);

    if (selectedCertificat == 0) {
      if (tmp_i >= 4) {
        BackUpData.push(tmp_BackUpData);
        tmp_BackUpData = [];
        console.log("-----");
        tmp_i = 0;
      }
      console.log(tmp_i);
      tmp_BackUpData.push(data);
      tmp_i += 1;
      // if (tmp > 3) {
      //   tmp_BackUpData.push(data);
      //   tmp_i += 1;
      // }
    }
  }

  if (selectedCertificat == 0) {
    // console.log(TMP_num);
    BackUpData.push(tmp_BackUpData);
    await set(ref(DB, "/CERTIFICAT_NUMBER/"), {
      0: TMP_num,
    });
  }

  // console.log(BackUpData);
  res.status(200).json({
    success: true,
    BackUpData: BackUpData,
  });
  // } catch (error) {
  //   res.status(400).json({ success: false });
  // }
};

export const selectedCertificatInfo = async (
  selectedCertificat: number,
  props: any
) => {
  if (selectedCertificat == 0) {
    if (!props) {
      console.log(TMP_num);
      TMP_num = incrementString(String(TMP_num));
    }
    return props
      ? {
          stickerNo: props.stickerNo,
          equipmentSN: props.equipmentSN,
          clientName: props.clientName,
          equipmentDetail: props.equipmentDetail,
          inspectionDate: props.inspectionDate,
          nextInspectionDate: props.nextInspectionDate,
          inspectedBy: props.inspectedBy,
        }
      : {
          stickerNo: TMP_num,
          equipmentSN: "none",
          clientName: "none",
          equipmentDetail: "none",
          inspectionDate: "none",
          nextInspectionDate: "none",
          inspectedBy: "none",
        };
  }
  return "to_change";
};
