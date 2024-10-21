import { Typography, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";

import "./sass/events.scss";

const rules = [
  {
    required: true,
    message: "Пожалуйста, введите требования для участия в мероприятии",
  },
  {
    max: 1000,
    message: "Максимальное значение 1000",
  },
  {
    min: 5,
    message: "Минимальное значение 5",
  },
];

function EventRequirements({ name, value }) {
  return (
    <FormItem name={name} hasFeedback validateFirst rules={rules}>
      <Flex vertical>
        <Typography.Text>Что нужно для участия</Typography.Text>
        <TextArea
          value={value}
          rows={3}
          allowClear
          placeholder="Введите требования для участия в мероприятии"
          id="event_requirements_input"
          maxLength={1000}
          className="events__event-description__textarea"
        />
      </Flex>
    </FormItem>
  );
}
export default EventRequirements;
