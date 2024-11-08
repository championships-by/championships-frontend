import React, { useCallback } from "react";
import { Flex, Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { handlePaste } from "@utils";
import { useTranslation } from "react-i18next";

import "./sass/user.scss";

function UserFirstnameInput({ name }) {
  const { t } = useTranslation();
  const handleKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <Flex vertical className="user__firstname-input__flex">
      <Typography.Text>{t("COMMON.NAME")}</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите имя",
          },
          {
            pattern: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
            message: "Имя может содержать только буквы",
          },
          {
            min: 2,
            message: "Минимум 2 символа",
          },
          {
            max: 255,
            message: "Максимальное значение 255",
          },
          {
            validator(_, value) {
              if (value && value.trim()) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Пожалуйста, введите корректное имя")
              );
            },
          },
        ]}
        className="user__firstname-input__formitem"
      >
        <Input
          allowClear
          prefix={<UserOutlined />}
          placeholder="Введите имя"
          maxLength={255}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
        />
      </FormItem>
      <Typography.Text type="secondary">
        {t("COMMON.NAME_EXAMPLE")}
      </Typography.Text>
    </Flex>
  );
}

export default UserFirstnameInput;
