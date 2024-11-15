import React from "react";
import { Flex, Input, Typography } from "antd";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import "./sass/auth.scss";
import { mailZubronok } from "@constants";
import { useTranslation } from "react-i18next";

function AuthPasswordInput({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <FormItem
      name="Password"
      className="auth-password-input"
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: t("RULES.PLEASE_ENTER_PASSWORD"),
        },
      ]}
    >
      <Flex vertical>
        <Input.Password
          placeholder={`${t("COMMON.PASSWORD")}...`}
          iconRender={() => <EyeInvisibleOutlined />}
          id="user_password_input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <Typography.Text type="secondary">
          {t("COMMON.CONTANT_WITH_ADMINISTRATOR")}
        </Typography.Text>
        <a href={`mailto:${mailZubronok}`}>{mailZubronok}</a>
      </Flex>
    </FormItem>
  );
}

export default AuthPasswordInput;
