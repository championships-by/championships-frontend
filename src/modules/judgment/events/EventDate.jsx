import { DatePicker, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Locale } from "@constants";
import "./sass/events.scss";

function EventDate({ name }) {
  const configDate = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Пожалуйста, выберите дату и время мероприятия",
      },
    ],
  };
  return (
    <>
      <Typography.Text>Дата и время мероприятия</Typography.Text>
      <FormItem name={name} hasFeedback validateFirst {...configDate}>
        <DatePicker
          locale={Locale}
          id="event_date"
          format={Locale.dateTimeFormat}
          showTime={{ format: Locale.timeFormat }}
          placeholder="Выберите дату и время мероприятия"
          className="events__event-date__datepicker"
        />
      </FormItem>
    </>
  );
}
export default EventDate;
