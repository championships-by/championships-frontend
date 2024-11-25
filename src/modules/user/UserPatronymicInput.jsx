import React, { useCallback, useEffect, useState } from "react";
import { Flex, Input, Typography, Form } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import "./sass/user.scss";
import { handlePaste } from "@utils";
import { useTranslation } from "react-i18next";

function UserPatronymicInput({ name, initialValue }) {
  const { t } = useTranslation();
  const [hasFeedback, setHasFeedback] = useState(false);

  const rules = [
    {
      pattern: /^[a-zA-Zа-яА-ЯёЁ-]+$/,
      message: t("RULES.THIRD_NAME_CAN_CONTAIN_ONLY_LETTERS"),
    },
    {
      min: 2,
      message: t("RULES.MIN_2_SYMBOLS"),
    },
    {
      max: 255,
      message: t("RULES.MAX_255_SYMBOLS"),
    },
  ];

  useEffect(() => {
    setHasFeedback(initialValue && initialValue.length > 0);
  }, [initialValue]);

  const handleKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  const handleChange = (e) => {
    setHasFeedback(e.target.value.length > 0);
  };

  return (
    <Flex vertical className="user__patronymic-input__flex">
      <Typography.Text>{t("COMMON.THIRD_NAME_IF_EXIST")}</Typography.Text>
      <FormItem
        name={name}
        hasFeedback={hasFeedback}
        validateFirst
        rules={rules}
        className="user__patronymic-input__formitem"
      >
        <Input
          prefix={<UserOutlined />}
          allowClear
          placeholder={t("COMMON.ENTER_THIRD_NAME")}
          maxLength={255}
          onKeyPress={handleKeyPress}
          onPaste={handlePaste}
          onChange={handleChange}
          defaultValue={initialValue}
        />
      </FormItem>
      <Typography.Text type="secondary">
        {t("COMMON.THIRD_NAME_EXAMPLE")}
      </Typography.Text>
    </Flex>
  );
}

export default UserPatronymicInput;
