import "./sass/auth.scss";
import { Form, message, Button } from "antd";
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

function Auth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) {
      userApi
        .getProfile()
        .then(() => navigate(ROUTES.USER_SETTINGS.PATH))
        .catch((error) => {
          if (error.response.status === 401) {
            setIsLoading(false);
            message.info("Вы не авторизовались");
          } else {
            message.error(
              "Ошибка: Невозможно получить данные. Обратитесь к администратору..."
            );
          }
        });
    }
  }, [isLoading, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFormLoading(true);

    const encrypedPassword = getEncryptedPassword(password, PUBLIC_KEY);

    try {
      await authApi.setLogin({
        email,
        password: encrypedPassword,
      });
      navigate(ROUTES.USER_SETTINGS.PATH);
    } catch (error) {
      if (error.response.status === 404) {
        setIsLoading(false);
        message.error("Ошибка: Неверный email или пароль.");
      } else {
        message.error(
          "Ошибка: Невозможно авторизовать пользователя. Попробуйте еще раз..."
        );
      }
    }

    setIsFormLoading(false);
  };

  const onFinish = () => {
    setIsFormLoading(false);
  };

  const onFinishFailed = () => {
    message.error("Проверьте поля для ввода!");

    setIsFormLoading(false);
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

              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isFormLoading}
                  onClick={(e) => handleSubmit(e)}
                  className="auth__button"
                >
                  Войти
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
