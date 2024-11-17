import { Typography, Input, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { MailOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import "./sass/events.scss";

function EventEmail({ name, value }) {
  const { t } = useTranslation();

  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: t("RULES.PLEASE_ENTER_EMAIL_FOR_QUESTIONS"),
        },
        {
          type: "email",
          message: t("RULES.INVALID_EMAIL"),
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>{t("COMMON.EMAIL_FOR_QUESTIONS")}</Typography.Text>
        <Input
          value={value}
          prefix={<MailOutlined />}
          allowClear
          placeholder={t("COMMON.ENTER_EMAIL_FOR_QUESTIONS")}
          id="event_email_input"
          maxLength={255}
          className="events__event-email__input"
        />
      </Flex>
    </FormItem>
  );
}
export default EventEmail;
