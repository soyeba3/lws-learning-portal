import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminLoggedIn, userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
            admin: undefined,
          })
        );
      } else if (auth?.accessToken && auth?.admin) {
        dispatch(
          adminLoggedIn({
            accessToken: auth.accessToken,
            admin: auth.admin,
            user: undefined,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
}
