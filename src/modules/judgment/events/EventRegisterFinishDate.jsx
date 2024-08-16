import { DatePicker, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Locale } from "@constants";
import "./sass/events.scss";

const requiredRule = {
  type: "object",
  required: true,
  message: "Пожалуйста, выберите дату и время регистрации",
};

function EventRegisterFinishDate({ name, form }) {
  const configDate = {
    rules: [
      requiredRule,
      {
        validator(_, value) {
          const registerStartDate = form.getFieldValue(
            "event_register_start_date"
          );
          console.log(registerStartDate);
          console.log(value);
          if (registerStartDate <= value) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error(
              "Дата начала регистрации не может быть позже даты конца регистрации!"
            )
          );
        },
      },
    ],
  };
  return (
    <>
      <FormItem name={name} hasFeedback validateFirst {...configDate}>
        <div className="events__event-date__datepickercontainer">
          <Typography.Text>По</Typography.Text>
          <DatePicker
            locale={Locale}
            id="event_register_finish_date"
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
export default EventRegisterFinishDate;
