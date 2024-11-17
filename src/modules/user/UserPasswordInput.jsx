import React from "react";
import { Flex, Input, Typography } from "antd";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

import "./sass/user.scss";

function UserPasswordInput({ name, required, disabled }) {
  const { t } = useTranslation();

  return (
    <Flex vertical className="user__password-input__flex">
      <Typography.Text>{t("COMMON.PASSWORD")}</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        rules={[
          {
            required: required ?? false,
            message: t("RULES.PLEASE_ENTER_PASSWORD"),
          },
          {
            min: 8,
            message: t("RULES.MIN_PASSWORD_8"),
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

export default UserPasswordInput;
