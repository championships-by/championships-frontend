import { Typography, Select, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { StarOutlined } from "@ant-design/icons";
import "./sass/events.scss";

const options = [
  { value: "republic", label: <span>Республиканский</span> },
  { value: "region", label: <span>Областной</span> },
  { value: "district", label: <span>Районный</span> },
  { value: "town", label: <span>Городской</span> },
  { value: "other", label: <span>Другое</span> },
];

function EventLevel({ name, value, onChange: onChangeBase }) {
  const onChange = (value) => {
    onChangeBase({ [name]: value });
  };

  return (
    <FormItem name={name} hasFeedback validateFirst>
      <Typography.Text>Уровень мероприятия</Typography.Text>
      <div className="events__event-level__div">
        <Input
          disabled
          prefix={<StarOutlined />}
          className="events__event-level__icon"
        />
        <Select
          placeholder="Выберите уровень мероприятия"
          options={options}
          value={value}
          defaultValue="republic"
          onChange={onChange}
        />
      </div>
    </FormItem>
  );
}

export default EventLevel;
