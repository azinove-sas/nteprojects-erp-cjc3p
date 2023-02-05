/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse, NextApiRequest } from "next";
import { getDatabase } from "firebase/database";
import { FirebaseApp } from "azinove/libraries/Firebase";
import { ref, get } from "firebase/database";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      await generate(req, res);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
const generate = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { perPage, page, email, role }: any = req.query;
    const DB = getDatabase(FirebaseApp);
    let data: any = [];

    if (role >= 1) {
      data = (await get(ref(DB, "/CERTIFICAT/"))).toJSON();
    } else {
      Object.entries(Object((await get(ref(DB, "/CERTIFICAT/"))).toJSON())).map(
        (item: any) => {
          if (item[1].selectedUser === email) {
            data.push(item[1]);
          }
        }
      );
    }

    // ------ Pagination ------
    let count = Object.entries(data).length;
    const end = perPage * page;
    const start = end - perPage;
    let totalPages = Math.ceil(count / perPage);
    console.log(totalPages);

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
