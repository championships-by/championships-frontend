import { Typography, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next";

import "./sass/events.scss";

function EventRequirements({ name, value }) {
  const { t } = useTranslation();

  const rules = [
    {
      required: true,
      message: t("RULES.PLEASE_ENTER_REQUIREMENTS"),
    },
    {
      max: 1000,
      message: t("RULES.MAX_1000_SYMBOLS"),
    },
    {
      min: 5,
      message: t("RULES.MIN_5_SYMBOLS"),
    },
  ];

  return (
    <FormItem name={name} hasFeedback validateFirst rules={rules}>
      <Flex vertical>
        <Typography.Text>
          {t("COMMON.WHAT_NEED_TO_PARTICIPATE")}
        </Typography.Text>
        <TextArea
          value={value}
          rows={3}
          allowClear
          placeholder={t("COMMON.ENTER_REQUIREMENTS")}
          id="event_requirements_input"
          maxLength={1000}
          className="events__event-description__textarea"
        />
      </Flex>
    </FormItem>
  );
}
export default EventRequirements;
