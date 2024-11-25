import { Typography, Input, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { FlagOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import "./sass/events.scss";

function EventName({ name, value }) {
  const { t } = useTranslation();

  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          validator(_, value) {
            if (value && (value.startsWith(" ") || value.endsWith(" "))) {
              return Promise.reject(
                new Error(t("RULES.ENTER_CORRECT_EVENT_NAME"))
              );
            }
            return Promise.resolve();
          },
        },
        {
          required: true,
          message: t("RULES.PLEASE_ENTER_EVENT_NAME"),
        },
        {
          max: 255,
          message: t("RULES.MAX_255_SYMBOLS"),
        },
        {
          min: 5,
          message: t("RULES.MIN_5_SYMBOLS"),
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>{t("EVENTS.NAME_OF_EVENT")}</Typography.Text>
        <Input
          value={value}
          prefix={<FlagOutlined />}
          allowClear
          placeholder={t("EVENTS.ENTER_NAME_OF_EVENT")}
          id="event_name_input"
          maxLength={255}
          className="events__event-name__input"
        />
      </Flex>
    </FormItem>
  );
}
export default EventName;
