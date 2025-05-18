import { Button, Modal, Flex, message, Form } from "antd";
import { useState } from "react";
import OldPassword from "@/modules/user/passwordChange/OldPassword";
import NewPassword from "@/modules/user/passwordChange/NewPassword";
import SecondNewPassword from "@/modules/user/passwordChange/SecondNewPassword";
import { userApi } from "@/api";
import { getEncryptedPassword } from "@/utils";
import { useTranslation } from "react-i18next";
import { REACT_APP_PUBLIC_KEY } from "@/const";

function UserPasswordModal({ isOpen, onOk, onCancel }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setIsLoading(true);
    const { OldPassword, NewPassword, SecondNewPassword } = values;

    const encrypedCurrentPassword = getEncryptedPassword(
      OldPassword,
      REACT_APP_PUBLIC_KEY
    );
    const encrypedNewPassword = getEncryptedPassword(
      NewPassword,
      REACT_APP_PUBLIC_KEY
    );
    const encrypedNewRetypedPassword = getEncryptedPassword(
      SecondNewPassword,
      REACT_APP_PUBLIC_KEY
    );

    const data = {
      current_password: encrypedCurrentPassword,
      new_password: encrypedNewPassword,
      new_password_retyped: encrypedNewRetypedPassword,
    };

    userApi
      .changeProfile(data)
      .then(() => {
        message.success(t("MESSAGES.SUCCESS_CHANGE_PASSWORD"));
        form.resetFields();
        onOk();
      })
      .catch(() => {
        message.error(t("MESSAGES.PASSWORD_CHANGE_ERROR"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
    setIsLoading(false);
  };

  return (
    <Modal
      title={t("COMMON.PASSWORD_CHANGE")}
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
            {t("COMMON.SAVE")}
          </Button>
          <Button onClick={onCancel}>{t("COMMON.CANCEL")}</Button>
        </Flex>
      </Form>
    </Modal>
  );
}

export default UserPasswordModal;
