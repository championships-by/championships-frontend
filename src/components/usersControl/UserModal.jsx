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

function UserModal({ isOpen, onOk, onCancel, type, userId }) {
  const users = useSelector(getUsersSelector);
  const [oldEmail, setOldEmail] = useState();
  const { isLoading } = users;
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
      const result = await dispatch(setUser(raw));

      if (setUser.rejected.match(result)) {
        throw new Error(result.error.message);
      }
      dispatch(getUsers());
      message.success("Пользователь успешно создан");
      onOk();
      form.resetFields();
      await userApi.sendUserRegistrationNotice(params.toString()).then(() => {
        message.info("Уведомление пользователю отправлено успешно");
      });
      // TODO
      //  .catch((error) => {
      //   message.error(`Ошибка отправки уведомления: ${errorMessage}`);
      // });
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
        message.success("Пользователь успешно изменён");
        dispatch(getUsers());
        onOk();
      } catch {}
    }
  };

  const onFinishFailed = () => {
    message.error("Проверьте поля для ввода!");
  };

  return (
    <Modal
      title={
        type === ModalType.ADD
          ? "Добавить пользователя"
          : "Редактировать пользователя"
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
              Сохранить
            </Button>
          </FormItem>
          <FormItem>
            <Button onClick={onCancel}>Отмена</Button>
          </FormItem>
        </Space>
      </Form>
    </Modal>
  );
}

export default UserModal;
