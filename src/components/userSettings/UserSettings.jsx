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
import React, { useEffect, useState } from "react";
import UserPasswordModal from "./UserPasswordChange";
import { useTranslation } from "react-i18next";

import "./sass/user-settings.scss";

function UsersSettings() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const { isLoading } = user;
  const [isUserPasswordModalOpen, setIsUserPasswordModalOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      firstname: user.data.first_name,
      lastname: user.data.second_name,
      patronymic: user.data.third_name,
      role: user.data.role,
      email: user.data.email,
      phone: user.data.phone,
      organization: user.data.educational_institution,
    });
  }, [form, user]);

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
            message.success(t("MESSAGES.SUCCESS_MESSAGE"));
          })
          .catch(() => {
            setIsFormLoading(false);
            message.error(t("MESSAGES.USER_UPDATE_ERROR"));
          });
      })
      .catch(() => {
        message.error(t("MESSAGES.CHECK_FIELDS"));
        setIsFormLoading(false);
      });
  };

  return (
    <>
      <Loader show={isLoading} />
      <Typography.Title level={2}>
        {t("USER_SETTINGS.USER_SETTINGS")}
      </Typography.Title>
      <Divider />

      <Form
        form={form}
        layout="vertical"
        variant="filled"
        requiredMark="Default"
      >
        <Row gutter={[32, 0]}>
          <Col xs={24} sm={24} md={8}>
            <UserLastnameInput name="lastname" />
            <UserFirstnameInput name="firstname" />
            <UserPatronymicInput
              name="patronymic"
              initialValue={form.getFieldValue("patronymic")}
            />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <UserEmailInput name="email" disabled="true" />
            <UserPhoneInput name="phone" number={user.phone} />
            <UserOrganizationInput name="organization" />
          </Col>
          <Col xs={24} sm={24} md={8}>
            <UserRoleInput disabled name="role" />
            <Button
              type="primary"
              onClick={() => setIsUserPasswordModalOpen(true)}
              className="change-password-button"
            >
              {t("USER_SETTINGS.CHANGE_PASSWORD")}
            </Button>
          </Col>
        </Row>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="save-button"
            loading={isFormLoading}
            onClick={handleSubmit}
          >
            {t("USER_SETTINGS.SAVE_SETTINGS")}
          </Button>
        </FormItem>
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
