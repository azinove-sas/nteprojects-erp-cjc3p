import { useQuery } from "react-query";
import axios from "axios";

export default function useCertificat(
  page: any,
  perPage: any,
  email: string,
  role: string
) {
  return useQuery(
    ["certificat", page, perPage, email, role],
    async () => {
      const res = await axios.get(
        `/api/certificat/getCetrificat?perPage=${perPage}&page=${page}&email=${email}&role=${role}`
      );
      return res.data;
    },
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );
}
