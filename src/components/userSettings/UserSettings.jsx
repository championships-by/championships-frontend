import Loader from "@components/loader/Loader";
import UserEmailInput from "@modules/user/UserEmailInput";
import UserFirstnameInput from "@modules/user/UserFirstnameInput";
import UserLastnameInput from "@modules/user/UserLastnameInput";
import UserOrganizationInput from "@modules/user/UserOrganizationInput";
import UserPatronymicInput from "@modules/user/UserPatronymicInput";
import UserPhoneInput from "@modules/user/UserPhoneInput";
import UserRoleInput from "@modules/user/UserRoleInput";
import { Button, Col, Form, Row, Typography, message, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeUserProfile, getUserSelector } from "@store/users";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";
import UserPasswordModal from "./UserPasswordChange";

import "./sass/user-settings.scss";

function UsersSettings() {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const { isLoading } = user;
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [form] = Form.useForm();

  form.setFieldsValue({
    firstname: user.data.first_name,
    lastname: user.data.second_name,
    patronymic: user.data.third_name,
    role: user.data.role,
    email: user.data.email,
    phone: user.data.phone,
    organization: user.data.educational_institution,
  });

  const handleSubmit = () => {
    setIsFormLoading(true);
    form
      .validateFields()
      .then(() => {
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

        dispatch(changeUserProfile(data))
          .then(() => {
            setIsFormLoading(false);
            message.success("Данные успешно сохранены");
          })
          .catch(() => {
            setIsFormLoading(false);
            message.error(
              "Ошибка: Невозможно обновить данные пользователя. Обратитесь к администратору."
            );
          });
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
      <Divider />

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
            <UserPatronymicInput
              name="patronymic"
              initialValue={form.getFieldValue("patronymic")}
            />
          </Col>
          <Col span={8}>
            <UserEmailInput name="email" disabled="true" />
            <UserPhoneInput name="phone" number={user.phone} />
            <Button
              type="primary"
              onClick={() => setIsUserPasswordModalOpen(true)}
              className="change-password-button"
            >
              Сменить пароль
            </Button>
          </Col>
          <Col span={8}>
            <UserOrganizationInput name="organization" />
            <UserRoleInput disabled name="role" />
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
