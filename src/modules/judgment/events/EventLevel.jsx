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

const rules = [
  {
    required: true,
    message: "Пожалуйста, выберите уровень мероприятия",
  },
];

function EventLevel({ name, value, onChange: onChangeBase, form }) {
  const onChange = (value) => {
    onChangeBase({ [name]: value });
    form.setFieldsValue({ [name]: value });
  };

  return (
    <FormItem name={name} hasFeedback validateFirst rules={rules}>
      <Typography.Text>Уровень мероприятия</Typography.Text>
      <div className="events__event-level__div">
        <Select
          placeholder="Выберите уровень мероприятия"
          options={options}
          value={value}
          onChange={onChange}
        />
      </div>
    </FormItem>
  );
}

export default EventLevel;
