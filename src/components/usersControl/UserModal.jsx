import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersSelector, setUser, getUsers } from "@store/users";
import { ModalType } from "@constants";
import UserEmailInput from "@modules/user/UserEmailInput";
import UserFirstnameInput from "@modules/user/UserFirstnameInput";
import UserLastnameInput from "@modules/user/UserLastnameInput";
import UserOrganizationInput from "@modules/user/UserOrganizationInput";
import UserPasswordInput from "@modules/user/UserPasswordInput";
import UserPatronymicInput from "@modules/user/UserPatronymicInput";
import UserPhoneInput from "@modules/user/UserPhoneInput";
import UserRoleInput from "@modules/user/UserRoleInput";
import { Button, Form, message, Modal, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import { userApi } from "@api";
import { useTranslation } from "react-i18next";

function UserModal({ isOpen, onOk, onCancel, type, userId }) {
  const { t } = useTranslation();
  const users = useSelector(getUsersSelector);
  const [oldEmail, setOldEmail] = useState();
  const [isLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && type == ModalType.EDIT) {
      const params = new URLSearchParams();
      params.append("user_id", userId);
      userApi.getUserById(params.toString()).then((response) => {
        const { data } = response;
        form.setFieldsValue({
          first_name: data.first_name,
          second_name: data.second_name,
          third_name: data.third_name,
          email: data.email,
          phone: data.phone,
          organization: data.educational_institution,
          role: data.role,
        });
        setOldEmail(data.email);
      });
    }
  }, [userId, form]);

  const onFinish = async () => {
    if (type == ModalType.ADD) {
      const raw = {
        email: form.getFieldValue("email"),
        first_name: form.getFieldValue("first_name"),
        second_name: form.getFieldValue("second_name"),
        third_name: form.getFieldValue("third_name"),
        phone: form.getFieldValue("phone"),
        role: form.getFieldValue("role"),
        educational_institution: form.getFieldValue("organization"),
        password: form.getFieldValue("password"),
      };
      const params = new URLSearchParams();
      params.append("password", raw.password);
      params.append("user_email", raw.email);
      setLoading(true);
      const result = await dispatch(setUser(raw));

      if (setUser.rejected.match(result)) {
        throw new Error(result.error.message);
      }
      dispatch(getUsers());
      message.success(t("MESSAGES.SUCCESS_USER_CREATE"));
      await userApi
        .sendUserRegistrationNotice(params.toString())
        .then(() => {
          message.info(t("MESSAGES.SUCCESS_SEND_USER_NOTICE"));
        })
        .catch(() => {
          message.error(t("MESSAGES.NOT_SEND_USER_NOTICE"));
        });
      setLoading(false);
      onOk();
      form.resetFields();
    } else if (type == ModalType.EDIT) {
      const body = {
        first_name: form.getFieldValue("first_name"),
        second_name: form.getFieldValue("second_name"),
        third_name: form.getFieldValue("third_name"),
        phone: form.getFieldValue("phone"),
        role: form.getFieldValue("role"),
        educational_institution: form.getFieldValue("organization"),
      };

      const newEmail = form.getFieldValue("email");

      if (newEmail !== oldEmail) {
        body.email = newEmail;
      }

      try {
        const params = new URLSearchParams();
        params.append("user_id", userId);
        await userApi.changeUserById(params.toString(), body);
        message.success(t("MESSAGES.SUCCESS_EDIT_USER"));
        dispatch(getUsers());
        onOk();
      } catch {}
    }
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
  };

  return (
    <Modal
      title={
        type === ModalType.ADD ? t("COMMON.CREATE_USER") : t("COMMON.EDIT_USER")
      }
      className="user-control__modal"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={[]}
    >
      <Form
        form={form}
        layout="vertical"
        variant="filled"
        requiredMark="Default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <UserLastnameInput name="second_name" />
        <UserFirstnameInput name="first_name" />
        <UserPatronymicInput name="third_name" />

        <UserRoleInput name="role" />

        <UserEmailInput name="email" />
        <UserPasswordInput name="password" disabled={type == ModalType.EDIT} />

        <UserPhoneInput name="phone" />
        <UserOrganizationInput name="organization" />
        <Space>
          <FormItem>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {t("COMMON.SAVE")}
            </Button>
          </FormItem>
          <FormItem>
            <Button onClick={onCancel}>{t("COMMON.CANCEL")}</Button>
          </FormItem>
        </Space>
      </Form>
    </Modal>
  );
}

export default UserModal;
