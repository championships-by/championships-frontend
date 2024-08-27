import { DatePicker, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Locale } from "@constants";
import dayjs from "dayjs";

import "./sass/events.scss";

const rulesFrom = {
  required: true,
  message: "Пожалуйста, выберите дату и время начала проведения мероприятия",
};

const rulesTo = {
  required: true,
  message: "Пожалуйста, выберите дату и время окончания проведения мероприятия",
};

function EventDate({ name, value, onChange: onChangeBase, form }) {
  const { holding_start_date, holding_finish_date } = value || {};

  const onChange = (val, type) => {
    const date = dayjs(val).toISOString();
    switch (type) {
      case "from": {
        form.setFieldsValue({
          [`${name}_holding_start_date`]: date,
        });
        onChangeBase({
          ...value,
          holding_start_date: date,
        });

        break;
      }
      case "to": {
        form.setFieldsValue({
          [`${name}_holding_finish_date`]: date,
        });
        onChangeBase({
          ...value,
          holding_finish_date: date,
        });

        break;
      }
    }
  };

  return (
    <>
      <Typography.Text>Проведение</Typography.Text>
      <FormItem
        name={`${name}_holding_start_date`}
        hasFeedback
        validateFirst
        rules={[rulesFrom]}
      >
        <div className="events__event-date__datepickercontainer">
          <Typography.Text>С</Typography.Text>
          <DatePicker
            locale={Locale}
            id={`${name}_holding_start_date`}
            format={Locale.dateTimeFormat}
            showTime={{ format: Locale.timeFormat }}
            placeholder="Выберите дату и время начала мероприятия"
            className="events__event-date__datepicker"
            defaultValue={
              holding_start_date ? dayjs(holding_start_date) : undefined
            }
            onChange={(value) => {
              onChange(value, "from");
            }}
          />
        </div>
      </FormItem>
      <FormItem
        name={`${name}_holding_finish_date`}
        hasFeedback
        validateFirst
        rules={[rulesTo]}
      >
        <div className="events__event-date__datepickercontainer">
          <Typography.Text>По</Typography.Text>
          <DatePicker
            locale={Locale}
            id={`${name}_holding_finish_date`}
            format={Locale.dateTimeFormat}
            showTime={{ format: Locale.timeFormat }}
            placeholder="Выберите дату и время окончания мероприятия"
            className="events__event-date__datepicker"
            defaultValue={
              holding_finish_date ? dayjs(holding_finish_date) : undefined
            }
            onChange={(value) => {
              onChange(value, "to");
            }}
          />
        </div>
      </FormItem>
    </>
  );
}

export default EventDate;
