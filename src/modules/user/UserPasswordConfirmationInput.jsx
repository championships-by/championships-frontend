import React from "react";
import { Flex, Input, Typography } from "antd";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

import "./sass/user.scss";

function UserPasswordConfirmationInput({
  name,
  required,
  disabled,
  compareTo,
}) {
  const { t } = useTranslation();

  return (
    <Flex vertical className="user__password-input__flex">
      <Typography.Text>{t("COMMON.PASSWORD_CONFIRMATION")}</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        rules={[
          {
            required: required ?? false,
            message: t("RULES.PLEASE_CONFIRM_PASSWORD"),
          },
          {
            validator: (_, value) => {
              if (!value || value === compareTo) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t("RULES.PASSWORDS_DONT_MATCH")));
            },
          },
        ]}
        className="user__password-input__formitem"
      >
        <Input.Password
          disabled={disabled}
          prefix={<LockOutlined />}
          placeholder={t("COMMON.ENTER_PASSWORD")}
          iconRender={() => <EyeInvisibleOutlined />}
        />
      </FormItem>
    </Flex>
  );
}

export default UserPasswordConfirmationInput;
