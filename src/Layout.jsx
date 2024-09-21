import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserProfile } from "@store/users";

function Layout({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return children;
}
export default Layout;
