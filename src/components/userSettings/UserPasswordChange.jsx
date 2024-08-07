import { Button, Modal, Flex, message, Form } from "antd";
import { useState } from "react";
import OldPassword from "@modules/user/passwordChange/OldPassword";
import NewPassword from "@modules/user/passwordChange/NewPassword";
import SecondNewPassword from "@modules/user/passwordChange/SecondNewPassword";
import { userApi } from "@api"; // Import the userApi

function UserPasswordModal({ isOpen, onOk, onCancel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setIsLoading(true);
    const { OldPassword, NewPassword, SecondNewPassword } = values;

    const data = {
      current_password: OldPassword,
      new_password: NewPassword,
      new_password_retyped: SecondNewPassword,
    };

    userApi
      .changeProfile(data)
      .then((response) => {
        if (response.ok) {
          message.success("Пароль успешно изменен");
          form.resetFields();
          onOk();
        } else {
          message.error(
            "Ошибка: Невозможно изменить пароль. Проверьте введенные данные."
          );
        }
      })
      .catch(() => {
        message.error(
          "Ошибка: Невозможно изменить пароль. Обратитесь к администратору."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onFinishFailed = () => {
    message.error("Проверьте поля для ввода!");
    setIsLoading(false);
  };

  return (
    <Modal
      title="Изменение пароля"
      className="user-settings__password-change-modal"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={[]}
    >
      <Form
        layout="vertical"
        variant="filled"
        requiredMark="Default"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <OldPassword name="OldPassword" />
        <NewPassword name="NewPassword" />
        <SecondNewPassword name="SecondNewPassword" form={form} />

        <Flex gap="middle">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Сохранить данные
          </Button>
          <Button onClick={onCancel}>Отмена</Button>
        </Flex>
      </Form>
    </Modal>
  );
}

export default UserPasswordModal;
