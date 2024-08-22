import { DatePicker, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Locale } from "@constants";
import dayjs from "dayjs";

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

function EventRegisterDate({ name, value, onChange: onChangeBase }) {
  const { registration_start_date, registration_finish_date } = value || {};

  const onChange = (val, type) => {
    const date = dayjs(val).toISOString();

    switch (type) {
      case "from":
        onChangeBase({
          [name]: {
            ...value,
            registration_start_date: date,
          },
        });

        break;
      case "to":
        onChangeBase({
          [name]: {
            ...value,
            registration_finish_date: date,
          },
        });

        break;
    }
  };

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
            value={
              registration_start_date
                ? dayjs(registration_start_date)
                : undefined
            }
            onChange={(value) => onChange(value, "from")}
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
            value={
              registration_finish_date
                ? dayjs(registration_finish_date)
                : undefined
            }
            onChange={(value) => onChange(value, "to")}
          />
        </div>
      </FormItem>
    </>
  );
}
export default EventRegisterDate;
