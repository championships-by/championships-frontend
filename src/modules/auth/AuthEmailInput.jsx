import React from "react";
import { Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

import "./sass/auth.scss";

function AuthEmailInput({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <FormItem
      name="Email"
      className="auth-email-input"
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: t("RULES.ENTER_EMAIL"),
        },
        {
          type: "email",
          message: t("RULES.INVALID_EMAIL"),
        },
      ]}
    >
      <Input
        type="email"
        // pattern="+@gmail.com"
        id="user_email_input"
        placeholder="Email..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </FormItem>
  );
}

export default AuthEmailInput;
