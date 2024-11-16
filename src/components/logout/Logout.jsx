import { useNavigate } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { message, notification } from "antd";
import { ROUTES } from "@constants";
import { authApi } from "@api";
import { useTranslation } from "react-i18next";

function Logout() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  authApi
    .setLogout()
    .then(() => navigate(ROUTES.AUTHORIZATION.PATH))
    .catch(() => {
      navigate(ROUTES.USER_SETTINGS.PATH);
      message.error(t("MESSAGES.LOGOUT_ERROR"));
    });

  notification.info({
    message: t("COMMON.SESSION_CLOSED"),
    description: t("COMMON.GOOD_LUCK"),
    duration: 5,
    placement: "bottomRight",
  });

  return <Loader show />;
}

export default Logout;
