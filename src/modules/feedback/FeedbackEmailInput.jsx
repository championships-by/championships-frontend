import React from "react";
import { Flex, Input, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useTranslation } from "react-i18next";

import "./sass/feedback.scss";

function FeedbackEmailInput({ name }) {
  const { t } = useTranslation();

  const rules = [
    {
      required: true,
      message: t("RULES.ENTER_EMAIL"),
    },
    {
      type: "email",
      whitespace: true,
      message: t("RULES.INVALID_EMAIL"),
    },
  ];

  return (
    <Flex vertical className="user__email-input__flex">
      <Typography.Text>{t("COMMON.EMAIL")}*</Typography.Text>
      <FormItem
        name={name}
        hasFeedback
        validateFirst
        shouldUpdate
        rules={rules}
        className="user__email-input__formitem"
      >
        <Input
          prefix={<MailOutlined />}
          type="email"
          placeholder={t("COMMON.ENTER_EMAIL")}
        />
      </FormItem>
      <Typography.Text type="secondary">
        {t("COMMON.EMAIL_EXAMPLE")}
      </Typography.Text>
    </Flex>
  );
}

export default FeedbackEmailInput;
