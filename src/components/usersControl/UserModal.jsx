import React, { useState } from 'react';
import { Modal, Form, Button, message, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useDispatch } from 'react-redux';
import { setUser, upadateUser } from '@store/users';
import UserLastnameInput from "@modules/user/UserLastnameInput";
import UserFirstnameInput from "@modules/user/UserFirstnameInput";
import UserPatronymicInput from "@modules/user/UserPatronymicInput";
import UserRoleInput from "@modules/user/UserRoleInput";
import UserEmailInput from "@modules/user/UserEmailInput";
import UserPasswordInput from "@modules/user/UserPasswordInput";
import UserPhoneInput from "@modules/user/UserPhoneInput";
import UserOrganizationInput from "@modules/user/UserOrganizationInput";

function UserModal({ isOpen, onOk, onCancel, user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = () => {
    message.success("Всё в порядке!");
    setIsLoading(false);
  };

  const onFinishFailed = () => {
    message.error("Проверьте поля для ввода!");
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    const formData = {
      email: form.getFieldValue("email"),
      first_name: form.getFieldValue("first_name"),
      second_name: form.getFieldValue("second_name"),
      third_name: form.getFieldValue("third_name"),
      phone: form.getFieldValue("phone"),
      role: form.getFieldValue("role"),
      educational_institution: form.getFieldValue("organization"),
      password: form.getFieldValue("password"),
    };
  
    if (user.id) {
      dispatch(upadateUser([formData]));
    } else {
      dispatch(setUser([formData]));
    }
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
        initialValues={user}
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
                handleSubmit();
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