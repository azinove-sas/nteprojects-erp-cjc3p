import { useQuery } from "react-query";
import axios from "axios";

export default function useAccount(id: any) {
  return useQuery(
    ["account", id],
    async () => {
      const res = await axios
        .get(`/api/account/getAccount?id=${id}`)
        .then((item) => item.data);
      return res.data;
    },
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );
}
