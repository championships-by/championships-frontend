import { Button, Form, Typography, message } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authApi } from "@api";
import NewPassword from "@modules/user/passwordChange/NewPassword";
import SecondNewPassword from "@modules/user/passwordChange/SecondNewPassword";
import resursLogo from "@assets/img/resursLogo.svg";
import { ROUTES } from "@constants";
import { getEncryptedPassword } from "@utils";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import "./sass/reset-password.scss";

function PasswordReset() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const resetToken = searchParams.get("reset_token");

  useEffect(() => {
    if (!resetToken) {
      navigate(ROUTES.EVENTS.PATH);
    }
  }, [resetToken]);

  const onFinish = async () => {
    try {
      setIsLoading(true);

      const params = {
        reset_token: resetToken,
        new_password: getEncryptedPassword(
          form.getFieldValue("NewPassword"),
          PUBLIC_KEY
        ),
        new_password_retyped: getEncryptedPassword(
          form.getFieldValue("NewPasswordRetyped"),
          PUBLIC_KEY
        ),
      };

      await authApi.resetPassword(params);

      message.success(t("MESSAGES.SUCCESS_CHANGE_PASSWORD"));

      navigate(ROUTES.AUTHORIZATION.PATH);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
  };

  return (
    <div className="reset-password__body">
      <div className="reset-password__window">
        <div className="reset-password__window__header">
          <img
            src={resursLogo}
            className="reset-password__window__header__logo"
          />
        </div>
        <Typography.Title level={3}>
          {t("COMMON.PASSWORD_RECOVERY")}
        </Typography.Title>
        <Form
          form={form}
          layout="vertical"
          variant="filled"
          requiredMark="Default"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <NewPassword name="NewPassword" />
          <SecondNewPassword name="NewPasswordRetyped" form={form} />
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="reset-password__window__button"
          >
            {t("COMMON.SAVE")}
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default PasswordReset;
