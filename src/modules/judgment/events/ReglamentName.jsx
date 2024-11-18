import React, { useState } from "react";
import { Typography, Input, Form, Space } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function ReglamentName({ name, value, onInputChange }) {
  const { t } = useTranslation();

  const [hasHttp, setHasHttp] = useState(true);

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.startsWith("http://") || value.startsWith("https://")) {
      setHasHttp(true);
    } else {
      setHasHttp(false);
    }
    onInputChange(value);
  };

  return (
    <Form.Item
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          whitespace: true,
          message: t("RULES.ENTER_REGLAMENT_LINK"),
        },
        {
          validator: (_, value) => {
            if (!hasHttp) {
              return Promise.reject(
                new Error(t("RULES.LINK_SHOULD_START_WITH_HTTP"))
              );
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <Space
        direction="vertical"
        size={2}
        className="events__competition-reglament__container"
      >
        <Typography.Text className="events__competition-reglament__text">
          {t("COMMON.REGLAMENT")}
        </Typography.Text>
        <Input
          prefix={<LinkOutlined />}
          placeholder={t("RULES.ENTER_REGLAMENT_LINK")}
          value={value}
          onChange={handleChange}
          className="events__competition-reglament__input"
        />
        <Typography.Text type="secondary">
          {t("COMMON.LINK_EXAMPLE")}
        </Typography.Text>
        <Typography.Text type="danger">
          {t("COMMON.CHECK_FILE_ACCESS")}
        </Typography.Text>
      </Space>
    </Form.Item>
  );
}

export default ReglamentName;
