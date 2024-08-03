import { Button, Typography, message, Form, Col, Row } from "antd";
import { useState } from "react";
import FormItem from "antd/es/form/FormItem";
import UserLastnameInput from "@modules/user/UserLastnameInput";
import UserFirstnameInput from "@modules/user/UserFirstnameInput";
import UserPatronymicInput from "@modules/user/UserPatronymicInput";
import UserRoleInput from "@modules/user/UserRoleInput";
import UserEmailInput from "@modules/user/UserEmailInput";
import UserPasswordInput from "@modules/user/UserPasswordInput";
import UserPhoneInput from "@modules/user/UserPhoneInput";
import UserOrganizationInput from "@modules/user/UserOrganizationInput";
import Loader from "@components/loader/Loader";
import UserPasswordModal from "./UserPasswordChange";

import "./sass/user-settings.scss";

function UsersSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const [form] = Form.useForm();

  if (isLoading) {
    try {
      fetch(`${API_PATH}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((user) => {
          form.setFieldsValue({
            firstname: user.first_name,
            lastname: user.second_name,
            patronymic: user.third_name,
            role: user.role,
            email: user.email,
            phone: user.phone,
            organization: user.educational_institution,
          });

          setTimeout(() => setIsLoading(false), 300);
        });
    } catch (error) {
      message.error(
        "Ошибка: Невозможно получить данные. Обратитесь к администратору..."
      );
    }
  }

  const UpdateUser = () => {
    setIsFormLoading(true);

    const data = {
      first_name: form.getFieldValue("firstname"),
      second_name: form.getFieldValue("lastname"),
      third_name: form.getFieldValue("patronymic"),
      email: form.getFieldValue("email"),
      phone: form.getFieldValue("phone"),
      educational_institution: form.getFieldValue("organization"),
    };
    if (form.getFieldValue("password")) {
      data.password = form.getFieldValue("password");
    }

    const requestOptions = {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
      credentials: "include",
    };

    fetch(`${API_PATH}/user/profile`, requestOptions)
      .then((response) => {
        if (response.ok) {
          message.success("Данные успешно сохранены");
        } else {
          message.error(
            "Ошибка: Невозможно обновить данные пользователя. Обратитесь к администратору..."
          );
        }
      })
      .finally(() => setIsFormLoading(false));
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        UpdateUser();
      })
      .catch(() => {
        message.error("Проверьте поля для ввода!");
        setIsFormLoading(false);
      });
  };

  const [isUserPasswordModalOpen, setIsUserPasswordModalOpen] = useState(false);

  return (
    <>
      <Loader show={isLoading} />
      <Typography.Title level={2}>Настройки пользователя</Typography.Title>

      <Form
        form={form}
        layout="vertical"
        variant="filled"
        requiredMark="Default"
      >
        <Row gutter={[32, 0]}>
          <Col span={8}>
            <UserLastnameInput name="lastname" />
            <UserFirstnameInput name="firstname" />
            <UserPatronymicInput name="patronymic" />

            <UserRoleInput disabled name="role" />
          </Col>
          <Col span={8}>
            <UserEmailInput name="email" />
            <UserPasswordInput name="password" />
            <Button
              type="primary"
              onClick={() => setIsUserPasswordModalOpen(true)}
            >
              Сменить пароль
            </Button>
          </Col>
          <Col span={8}>
            <UserPhoneInput name="phone" />
            <UserOrganizationInput name="organization" />
          </Col>
        </Row>

        <Row>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={isFormLoading}
              onClick={handleSubmit}
            >
              Сохранить настройки
            </Button>
          </FormItem>
        </Row>
      </Form>
      <UserPasswordModal
        isOpen={isUserPasswordModalOpen}
        onOk={() => setIsUserPasswordModalOpen(false)}
        onCancel={() => setIsUserPasswordModalOpen(false)}
      />
    </>
  );
}

export default UsersSettings;
