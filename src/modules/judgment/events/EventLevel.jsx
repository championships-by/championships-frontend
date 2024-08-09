import { Typography, Select, Flex } from "antd";
import FormItem from "antd/es/form/FormItem";
import "./sass/events.scss";

function EventLevel({ name }) {
  return (
    <FormItem name={name} hasFeedback validateFirst>
      <Flex vertical>
        <Typography.Text>Уровень мероприятия</Typography.Text>
        <Select
          placeholder="Выберите уровень мероприятия"
          options={[
            { value: "republic", label: <span>Республиканский</span> },
            { value: "region", label: <span>Областной</span> },
            { value: "district", label: <span>Районный</span> },
            { value: "town", label: <span>Городской</span> },
            { value: "other", label: <span>Другое</span> },
          ]}
        />
      </Flex>
    </FormItem>
  );
}
export default EventLevel;
