import { Typography, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import "./sass/events.scss";

function EventDescription({ name, value }) {
  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: "Пожалуйста, введите описание мероприятия",
        },
        {
          max: 1000,
          message: "Максимум 1000 символов",
        },
        {
          min: 5,
          message: "Минимум 5 символов",
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>Описание мероприятия</Typography.Text>
        <TextArea
          value={value}
          rows={6}
          allowClear
          placeholder="Введите описание мероприятия"
          id="event_description_input"
          maxLength={1000}
          className="events__event-description__textarea"
        />
      </Flex>
    </FormItem>
  );
}
export default EventDescription;
