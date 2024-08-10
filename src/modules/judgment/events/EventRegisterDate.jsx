import { DatePicker, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Locale } from "@constants";
import "./sass/events.scss";

const configDate = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Пожалуйста, выберите дату и время регистрации",
    },
  ],
};
function EventRegisterDate({ name }) {
  return (
    <>
      <Typography.Text>Регистрация</Typography.Text>
      <FormItem name={name} hasFeedback validateFirst {...configDate}>
        <div className="events__event-date__datepickercontainer">
          <Typography.Text>С</Typography.Text>
          <DatePicker
            locale={Locale}
            id="event_date"
            format={Locale.dateTimeFormat}
            showTime={{ format: Locale.timeFormat }}
            placeholder="Выберите дату и время мероприятия"
            className="events__event-date__datepicker"
          />
        </div>
        <div className="events__event-date__datepickercontainer">
          <Typography.Text>По</Typography.Text>
          <DatePicker
            locale={Locale}
            id="event_date"
            format={Locale.dateTimeFormat}
            showTime={{ format: Locale.timeFormat }}
            placeholder="Выберите дату и время мероприятия"
            className="events__event-date__datepicker"
          />
        </div>
      </FormItem>
    </>
  );
}
export default EventRegisterDate;
