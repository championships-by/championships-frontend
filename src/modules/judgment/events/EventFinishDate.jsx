import { DatePicker, Typography } from "antd";
import { useState } from "react";
import FormItem from "antd/es/form/FormItem";
import { Locale } from "@constants";
import "./sass/events.scss";

function EventFinishDate({ name, form }) {
  const requiredRule = {
    type: "object",
    required: true,
    message: "Пожалуйста, введите дату и время мероприятия",
  };
  const configDate = {
    rules: [
      requiredRule,
      {
        validator(_, value) {
          const registerFinishDate = form.getFieldValue(
            "event_register_finish_date"
          );
          const eventStartDate = form.getFieldValue("event_start_date");
          if (registerFinishDate > eventStartDate) {
            return Promise.reject(
              new Error(
                "Дата конца регистрации не может быть позже даты начала мероприятия!"
              )
            );
          } else if (eventStartDate > value) {
            return Promise.reject(
              new Error(
                "Дата начала мероприятия не может быть позже даты конца мероприятия!"
              )
            );
          }
          return Promise.resolve();
        },
      },
    ],
  };

  return (
    <FormItem name={name} hasFeedback validateFirst {...configDate}>
      <div className="events__event-date__datepickercontainer">
        <Typography.Text>По</Typography.Text>
        <DatePicker
          locale={Locale}
          id="event_finish_date"
          format={Locale.dateTimeFormat}
          showTime={{ format: Locale.timeFormat }}
          placeholder="Выберите дату и время мероприятия"
          className="events__event-date__datepicker"
          onChange={(value) => form.setFieldsValue({ [name]: value })}
        />
      </div>
    </FormItem>
  );
}

export default EventFinishDate;
