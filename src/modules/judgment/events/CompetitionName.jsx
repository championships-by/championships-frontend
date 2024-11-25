import React from "react";
import { Form, FormItem } from "antd";
import { Flex, Input, Space, Typography } from "antd";
import { FlagOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import "./sass/events.scss";

function CompitationNameInput({ name, value, onInputChange }) {
  const { t } = useTranslation();
  const handleChange = (event) => {
    onInputChange(event.target.value);
  };

  return (
    <Form.Item
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          min: 5,
          message: t("RULES.MIN_5_SYMBOLS"),
        },
        {
          required: true,
          message: t("RULES.ENTER_NAME_NOMINATION"),
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text className="events__compitation-name__text">
          {t("EVENTS.NOMINATION_NAME")}
        </Typography.Text>
        <Input
          className="events__compitation-name__input"
          placeholder={t("RULES.ENTER_NAME_NOMINATION")}
          maxLength={30}
          prefix={<FlagOutlined />}
          value={value}
          onChange={handleChange}
        ></Input>
        <Typography.Text type="secondary">
          {t("EVENTS.NAME_NOMINATION_EXAMPLE")}
        </Typography.Text>
      </Flex>
    </Form.Item>
  );
}

export default CompitationNameInput;
