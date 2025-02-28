import { Typography, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { useTranslation } from "react-i18next";

function FeedbackDescription({ name }) {
  const { t } = useTranslation();

  const rules = [
    {
      required: true,
      message: t("RULES.PLEASE_ENTER_MESSAGE"),
    },
    {
      max: 3000,
      message: t("RULES.MAX_3000_SYMBOLS"),
    },
    {
      min: 5,
      message: t("RULES.MIN_5_SYMBOLS"),
    },
  ];

  return (
    <FormItem name={name} hasFeedback validateFirst rules={rules}>
      <Flex vertical>
        <Typography.Text>{t("COMMON.MESSAGE")}*</Typography.Text>
        <TextArea
          rows={6}
          allowClear
          placeholder={t("COMMON.ENTER_MESSAGE")}
          id="event_description_input"
          maxLength={3000}
        />
      </Flex>
    </FormItem>
  );
}

export default FeedbackDescription;
