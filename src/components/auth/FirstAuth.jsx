import { Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { ROUTES } from "@const";
import { authApi } from "@api";
import { useTranslation } from "react-i18next";

import "./sass/first-auth.scss";

function FirstAuth() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isNoticeSend, setIsNoticeSend] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      checkToken();
    } else {
      navigate(ROUTES.EVENTS.PATH);
    }
  }, [token]);

  const checkToken = async () => {
    const params = {
      token: token,
    };

    try {
      await authApi.firstLogin(params);
    } catch {
      sendNewToken(params);
      return;
    }

    navigate(ROUTES.EVENTS.PATH);
  };

  const sendNewToken = async (params) => {
    try {
      await authApi.sendNewToken(params);

      setIsNoticeSend(true);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loader show={isLoading} />
      <div className="first-auth__container">
        <Typography.Title level={2} className="first-auth__text">
          {isNoticeSend
            ? t("COMMON.TOKEN_EXPIRED_NEW_NOTICE_SEND")
            : t("ERRORS.TOKEN_SIGNATURE_ERROR")}
        </Typography.Title>
      </div>
    </>
  );
}

export default FirstAuth;
