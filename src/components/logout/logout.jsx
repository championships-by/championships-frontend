import { useNavigate } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { ROUTES, RESPONSE_STATUS } from "@constants";

function Logout() {
  const navigate = useNavigate();
  fetch(`${API_PATH}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    credentials: "include",
  }).then((response) => {
    if (response.status === RESPONSE_STATUS.STATUS_OK) {
      navigate(ROUTES.AUTHORIZATION.PATH);
    }
  });

  return <Loader show />;
}

export default Logout;
