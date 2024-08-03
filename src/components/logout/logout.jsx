import { useNavigate } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { ROUTES, RESPONSE_STATUS } from "@constants";
import { userApi } from "@api";

function Logout() {
  const navigate = useNavigate();

  userApi.setLogout().then((response) => {
    if (response.status === RESPONSE_STATUS.STATUS_OK) {
      navigate(ROUTES.AUTHORIZATION.PATH);
    }
  });

  return <Loader show />;
}

export default Logout;
