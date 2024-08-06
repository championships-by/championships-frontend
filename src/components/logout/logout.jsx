import { useNavigate } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { ROUTES, RESPONSE_STATUS } from "@constants";
import { authApi } from "@api";

function Logout() {
  const navigate = useNavigate();

  authApi.setLogout().then((response) => {
    if (response.status === RESPONSE_STATUS.STATUS_OK) {
      navigate(ROUTES.AUTHORIZATION.PATH);
    }
  });

  return <Loader show />;
}

export default Logout;
