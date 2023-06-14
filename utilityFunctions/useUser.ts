import { useSelector } from "react-redux";
import { userstate } from "@/interfaces/userstate";

const useUser = () => {
  const user = useSelector((state: userstate) => state.user.value);
  return user;
};
export default useUser;
