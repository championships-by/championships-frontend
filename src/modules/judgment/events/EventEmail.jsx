import { Typography, Input, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { MailOutlined } from "@ant-design/icons";
import "./sass/events.scss";

function EventEmail({ name }) {
  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: "Пожалуйста, введите email для вопросов участников",
        },
        {
          type: "email",
          message: "Некоректный Email",
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>Email для вопросов участников</Typography.Text>
        <Input
          prefix={<MailOutlined/>}
          allowClear
          placeholder="Введите email для вопросов участников"
          id="event_email_input"
          maxLength={255}
          className="events__event-email__input"
        />
      </Flex>
    </FormItem>
  );
}
export default EventEmail;
