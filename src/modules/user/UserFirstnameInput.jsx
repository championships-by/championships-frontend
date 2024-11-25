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
            message: t("RULES.PLEASE_ENTER_NAME"),
          },
          {
            pattern: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
            message: t("RULES.NAME_CAN_CONTAIN_ONLY_LETTERS"),
          },
          {
            min: 2,
            message: t("RULES.MIN_2_SYMBOLS"),
          },
          {
            max: 255,
            message: t("RULES.MAX_255_SYMBOLS"),
          },
          {
            validator(_, value) {
              if (value && value.trim()) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(t("RULES.PLEASE_ENTER_CORRECT_NAME"))
              );
            },
          },
        ]}
        className="user__firstname-input__formitem"
      >
        <Input
          allowClear
          prefix={<UserOutlined />}
          placeholder={t("COMMON.ENTER_NAME")}
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
