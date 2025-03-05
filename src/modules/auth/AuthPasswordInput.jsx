import React from "react";
import { Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

import "./sass/auth.scss";

function AuthPasswordInput({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <FormItem
      name="password"
      className="auth-password-input"
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: t("RULES.PLEASE_ENTER_PASSWORD"),
        },
        // {
        //   min: 6,
        //   message: t("RULES.PASSWORD_LENGTH"),
        // },
      ]}
    >
      <Input.Password
        id="user_password_input"
        placeholder={t("COMMON.PASSWORD")}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </FormItem>
  );
}

export default AuthPasswordInput;
