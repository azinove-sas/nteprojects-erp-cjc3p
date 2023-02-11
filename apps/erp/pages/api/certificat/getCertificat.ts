/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next";
import { getDatabase } from "firebase/database";
import { FirebaseApp } from "azinove/libraries/Firebase";
import { ref, get } from "firebase/database";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      await getCertificat(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
const getCertificat = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { perPage, page, email, role }: any = req.query;
    const DB = getDatabase(FirebaseApp);
    let data: any = [];
    let dataUser: any = [];

    if (role >= 1) {
      data = (await get(ref(DB, "/CERTIFICAT/"))).toJSON();
    } else {
      dataUser = (await get(ref(DB, "/CERTIFICAT/"))).toJSON();

      // if no data
      if (!dataUser) {
        res.status(200).json({
          data: [],
          totalPages: 0,
          success: true,
        });
      }
      Object.entries(dataUser).map((item: any) => {
        if (item[1].selectedUser === email) {
          data.push(item[1]);
        }
      });
    }

    // if no data
    if (!data) {
      res.status(200).json({
        data: [],
        totalPages: 0,
        success: true,
      });
    }
    // ------ Pagination ------
    let count = Object.entries(data).length;
    const end = perPage * page;
    const start = end - perPage;
    let totalPages = Math.ceil(count / perPage);

    let resData: any = [];
    for (let i = start; i <= end - 1; i += 1) {
      if (!Object.entries(data).at(i)?.[1]) {
        break;
      }
      if (i < count) {
        const objectRes: any = Object.entries(data).at(i)?.[1];
        resData.push(objectRes);
      }
    }
    // ------ END ------

    res.status(200).json({
      data: resData,
      totalPages: totalPages,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};
