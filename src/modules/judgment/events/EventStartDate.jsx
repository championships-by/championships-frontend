import { DatePicker, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Locale } from "@constants";
import "./sass/events.scss";

const configDate = {
  rules: [
    {
      type: "object",
      required: true,
      message: "",
    },
  ],
};

function EventStartDate({ name, form }) {
  return (
    <>
      <Typography.Text>Проведение</Typography.Text>
      <FormItem name={name} hasFeedback validateFirst {...configDate}>
        <div>
          <Typography.Text>С</Typography.Text>
          <DatePicker
            locale={Locale}
            id="event_start_date"
            format={Locale.dateTimeFormat}
            showTime={{ format: Locale.timeFormat }}
            placeholder="Выберите дату и время мероприятия"
            className="events__event-date__datepicker"
            onChange={(value) => form.setFieldsValue({ [name]: value })}
          />
        </div>
      </FormItem>
    </>
  );
}
export default EventStartDate;
