import { useNavigate } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { message } from "antd";
import { ROUTES } from "@constants";
import { authApi } from "@api";

function Logout() {
  const navigate = useNavigate();

  authApi.setLogout().then(() => 
      navigate(ROUTES.AUTHORIZATION.PATH))
    .catch(() => {
      navigate(ROUTES.USER_SETTINGS.PATH)
      message.error(
        "Ошибка: Невозможно выйти с аккаунта из-за проблем с сервером"
      );
    });

  return <Loader show />;
}

export default Logout;
