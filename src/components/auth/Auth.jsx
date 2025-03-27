import "./sass/auth.scss";
import { Form, message, Button, Typography, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import logo from "@assets/img/logo.png";
import AuthEmailInput from "@modules/auth/AuthEmailInput";
import AuthPasswordInput from "@modules/auth/AuthPasswordInput";
import { useNavigate } from "react-router-dom";
import Loader from "@components/loader/Loader";
import { ROUTES } from "@constants";
import { userApi, authApi } from "@api";
import { getEncryptedPassword } from "@utils";
import { useTranslation } from "react-i18next";
import ForgotPasswordModal from "@components/auth/ForgotPasswordModal";
import RegistrationModal from "@components/auth/RegistrationModal";

function Auth() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile();
  }, [isLoading, navigate]);

  const getUserProfile = async () => {
    if (isLoading) {
      try {
        await userApi.getProfile();
        navigate(ROUTES.EVENTS.PATH);
      } catch {
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFormLoading(true);

    const encrypedPassword = getEncryptedPassword(password, PUBLIC_KEY);

    try {
      await authApi.setLogin({
        email,
        password: encrypedPassword,
      });
      navigate(ROUTES.EVENTS.PATH);
    } catch {}

    setIsFormLoading(false);
  };

  const onFinish = () => {
    setIsFormLoading(false);
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));

    setIsFormLoading(false);
  };

  const onClickRegistrationModal = () => {
    setIsRegistrationModalOpen(true);
  };

  const onCancelRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
  };

  const onClickForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true);
  };

  const onCancelForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(false);
  };

  return (
    <>
      <Loader show={isLoading} />
      <div className="auth">
        <div className="auth__container">
          <div className="auth__header">
            <div className="auth__logo">
              <a href="https://zubronok.by/" target="_blank" rel="noreferrer">
                <img src={logo} alt="" />
              </a>
            </div>
          </div>
          <div className="auth__body">
            <Form
              layout="vertical"
              requiredMark="Default"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <AuthEmailInput value={email} onChange={setEmail} />
              <AuthPasswordInput value={password} onChange={setPassword} />

              <FormItem className="auth__body__form-item">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isFormLoading}
                  onClick={(e) => handleSubmit(e)}
                  className="auth__button"
                >
                  {t("COMMON.LOGIN")}
                </Button>
                <Button
                  type="default"
                  onClick={() => navigate(ROUTES.EVENTS.PATH)}
                  className="auth__guest-button"
                >
                  {t("COMMON.LOGIN_AS_GUEST")}
                </Button>
              </FormItem>
              <FormItem className="auth__body__form-item">
                <Flex justify="space-around">
                  <Typography.Text
                    className="auth__body__register"
                    onClick={onClickRegistrationModal}
                  >
                    {t("COMMON.REGISTRATION")}
                  </Typography.Text>
                  <Typography.Text
                    className="auth__body__forgot-password"
                    onClick={onClickForgotPasswordModal}
                  >
                    {t("COMMON.FORGOT_PASSWORD")}
                  </Typography.Text>
                </Flex>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onOk={onCancelForgotPasswordModal}
        onCancel={onCancelForgotPasswordModal}
      />
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onCancel={onCancelRegistrationModal}
        onOk={onCancelRegistrationModal}
      />
    </>
  );
}

export default Auth;
