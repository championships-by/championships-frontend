import React from "react";
import { Flex, Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

import "./sass/feedback.scss";

function FeedbackFirstnameInput({ name }) {
  const { t } = useTranslation();

  const rules = [
    {
      required: true,
      whitespace: true,
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
  ];

  return (
    <Flex vertical className="user__firstname-input__flex">
      <Typography.Text>{t("COMMON.NAME")}*</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        rules={rules}
        className="user__firstname-input__formitem"
      >
        <Input
          allowClear
          prefix={<UserOutlined />}
          placeholder={t("COMMON.ENTER_NAME")}
          maxLength={255}
        />
      </FormItem>
      <Typography.Text type="secondary">
        {t("COMMON.NAME_EXAMPLE")}
      </Typography.Text>
    </Flex>
  );
}

export default FeedbackFirstnameInput;
