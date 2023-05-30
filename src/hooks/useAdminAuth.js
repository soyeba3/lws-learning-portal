import { useSelector } from "react-redux";

const useAdminAuth = () => {
  const auth = useSelector((state) => state.auth);

  if (auth?.accessToken && auth?.admin) {
    return true;
  } else {
    return false;
  }
};

export default useAdminAuth;
