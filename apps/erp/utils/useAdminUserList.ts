import { useQuery } from "react-query";
import axios from "axios";

export default function useAdminUserList() {
  return useQuery(
    ["certification"],
    async () => {
      const res = await axios
        .get(`/api/admin/getAccounts`)
        .then((item) => item.data);
      return res.data;
    },
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );
}
