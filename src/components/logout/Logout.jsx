import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { message, notification } from "antd";
import { ROUTES } from "@constants";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { logout } from "../../store/users/thunk";

function Logout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate(ROUTES.AUTHORIZATION.PATH);
        notification.info({
          message: t("COMMON.SESSION_CLOSED"),
          description: t("COMMON.GOOD_LUCK"),
          duration: 5,
          placement: "bottomRight",
        });
      })
      .catch(() => {
        navigate(ROUTES.USER_SETTINGS.PATH);
        message.error(t("MESSAGES.LOGOUT_ERROR"));
      });
  }, []);

  return <Loader show />;
}

export default Logout;
