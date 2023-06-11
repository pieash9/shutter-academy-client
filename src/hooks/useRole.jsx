import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const { data: role = [], isLoading: roleLoading } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const res = await axios.get(
        `https://shutter-academy-server.vercel.app/getUserRole/${user?.email}`
      );
      return res?.data?.role || "";
    },
  });
  return { role, roleLoading };
};
export default useRole;
