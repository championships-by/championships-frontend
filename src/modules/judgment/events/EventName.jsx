import { Typography, Input, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import { FlagOutlined } from "@ant-design/icons";
import "./sass/events.scss";

function EventName({ name, value }) {
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
                new Error("Введите корректное название мероприятия")
              );
            }
            return Promise.resolve();
          },
        },
        {
          required: true,
          message: "Пожалуйста введите название мероприятия",
        },
        {
          max: 255,
          message: "Максимум 255 символов",
        },
        {
          min: 5,
          message: "Минимум 5 символов",
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>Название мероприятия</Typography.Text>
        <Input
          value={value}
          prefix={<FlagOutlined />}
          allowClear
          placeholder="Введите название мероприятия"
          id="event_name_input"
          maxLength={255}
          className="events__event-name__input"
        />
      </Flex>
    </FormItem>
  );
}
export default EventName;
