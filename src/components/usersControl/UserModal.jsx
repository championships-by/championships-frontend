import { Modal, Form, Button, message, Space } from "antd";
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
import { userApi } from "@api";

function UserModal({ isOpen, onOk, onCancel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = () => {
    message.success("Всё в порядке!");
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
      title="Настройка пользователя"
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
