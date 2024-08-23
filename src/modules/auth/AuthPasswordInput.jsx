import React from "react";
import { Flex, Input, Typography } from "antd";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import "./sass/auth.scss";
import { mailZubronok } from "@constants";

function AuthPasswordInput({ value, onChange }) {
  return (
    <FormItem
      name="Password"
      className="auth-password-input"
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: "Пожалуйста, введите пароль",
        },
      ]}
    >
      <Flex vertical>
        <Input.Password
          placeholder="Пароль..."
          iconRender={() => <EyeInvisibleOutlined />}
          id="user_password_input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <Typography.Text type="secondary">
          Обратитесь к администратору портала.
        </Typography.Text>
        <a href={`mailto:${mailZubronok}`}>{mailZubronok}</a>
      </Flex>
    </FormItem>
  );
}

export default AuthPasswordInput;
