import { Typography, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";

function FeedbackDescription({ name }) {
  const rules = [
    {
      required: true,
      message: "Пожалуйста, введите сообщение",
    },
    {
      max: 1000,
      message: "Максимум 1000 символов",
    },
    {
      min: 5,
      message: "Минимум 5 символов",
    },
  ];

  return (
    <FormItem name={name} hasFeedback validateFirst rules={rules}>
      <Flex vertical>
        <Typography.Text>Сообщение*</Typography.Text>
        <TextArea
          rows={6}
          allowClear
          placeholder="Введите сообщение"
          id="event_description_input"
          maxLength={1000}
        />
      </Flex>
    </FormItem>
  );
}
export default FeedbackDescription;
