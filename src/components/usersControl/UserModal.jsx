import { userApi } from "@api";
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
import { useState } from "react";

function UserModal({ isOpen, onOk, onCancel, type }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = () => {
    message.success("Пользователь успешно создан");
    setIsLoading(false);
  };

  const onFinishFailed = () => {
    message.error("Проверьте поля для ввода!");
    setIsLoading(false);
  };

  const create_user_request = async () => {
    const raw = JSON.stringify({
      email: form.getFieldValue("email"),
      first_name: form.getFieldValue("first_name"),
      second_name: form.getFieldValue("second_name"),
      third_name: form.getFieldValue("third_name"),
      phone: form.getFieldValue("phone"),
      role: form.getFieldValue("role"),
      educational_institution: form.getFieldValue("organization"),
      password: form.getFieldValue("password"),
    });

    await userApi.setUser(raw);
  };

  return (
    <Modal
      title={
        type === ModalType.ADD
          ? "Создание пользователя"
          : "Редактирование пользователя"
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
        <UserPasswordInput name="password" />

        <UserPhoneInput name="phone" />
        <UserOrganizationInput name="organization" />

        <Space>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              onClick={() => {
                setIsLoading(true);
                create_user_request();
              }}
            >
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
