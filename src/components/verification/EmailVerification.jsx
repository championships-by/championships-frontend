import { Button, Result, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { ROUTES } from "@const";
import { participantApi } from "@api";
import { useTranslation } from "react-i18next";

import "./email-verification.scss";

function EmailVerification() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("verification_token");

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      navigate(ROUTES.EVENTS.PATH);
    }
  }, [token]);

  const verifyEmail = async () => {
    const params = {
      verification_token: token,
    };

    try {
      await participantApi.emailVerification(params);

      setIsSuccess(true);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loader show={isLoading} />
      <div className="container">
        <Result
          status={isSuccess ? "success" : "error"}
          title={
            isSuccess
              ? t("PARTICIPANTS.ACCOUNT_VERIFICATED")
              : t("ERRORS.VERIFICATION_ERROR")
          }
          extra={[
            <Button
              type="primary"
              onClick={() => {
                navigate(ROUTES.EVENTS.PATH);
              }}
            >
              {t("COMMON.TO_MAIN")}
            </Button>,
          ]}
        />
      </div>
    </>
  );
}

export default EmailVerification;
