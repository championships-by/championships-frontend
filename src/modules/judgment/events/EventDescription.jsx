import { Typography, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next";

import "./sass/events.scss";

function EventDescription({ name, value }) {
  const { t } = useTranslation();
  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: t("RULES.PLEASE_ENTER_EVENT_DESCRIPTION"),
        },
        {
          max: 1000,
          message: t("RULES.MAX_1000_SYMBOLS"),
        },
        {
          min: 5,
          message: t("RULES.MIN_5_SYMBOLS"),
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>{t("EVENTS.EVENT_DESCRIPTION")}</Typography.Text>
        <TextArea
          value={value}
          rows={6}
          allowClear
          placeholder={t("EVENTS.ENTER_EVENT_DESCRIPTION")}
          id="event_description_input"
          maxLength={1000}
          className="events__event-description__textarea"
        />
      </Flex>
    </FormItem>
  );
}
export default EventDescription;
