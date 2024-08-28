import { DatePicker, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Locale } from "@constants";
import { useEffect } from "react";
import dayjs from "dayjs";

import "./sass/events.scss";

const rulesFrom = [
  {
    required: true,
    message: "Пожалуйста, выберите дату и время начала регистрации",
  },
];

const rulesTo = {
  required: true,
  message: "Пожалуйста, выберите дату и время окончания регистрации",
};

function EventRegisterDate({
  name,
  value,
  onChange: onChangeBase,
  form,
  isEdit,
}) {
  const { registration_start_date, registration_finish_date } = value || {};

  useEffect(() => {
    form.setFieldsValue({
      [`${name}_registration_start_date`]: registration_start_date,
      [`${name}_registration_finish_date`]: registration_finish_date,
    });
  });

  const onChange = (val, type) => {
    const date = dayjs(val).toISOString();

    switch (type) {
      case "from": {
        form.setFieldsValue({
          [`${name}_registration_start_date`]: date,
        });
        onChangeBase({
          [name]: {
            ...value,
            registration_start_date: date,
          },
        });

        break;
      }
      case "to": {
        form.setFieldsValue({
          [`${name}_registration_finish_date`]: date,
        });
        onChangeBase({
          [name]: {
            ...value,
            registration_finish_date: date,
          },
        });

        break;
      }
    }
  };

  return (
    <div>
      {isEdit && !value ? null : (
        <>
          <Typography.Text>Регистрация</Typography.Text>
          <FormItem
            name={`${name}_registration_start_date`}
            hasFeedback
            validateFirst
            rules={rulesFrom}
          >
            <div className="events__event-date__datepickercontainer">
              <Typography.Text>С</Typography.Text>
              <DatePicker
                locale={Locale}
                id={`${name}_registration_start_date`}
                format={Locale.dateTimeFormat}
                showTime={{ format: Locale.timeFormat }}
                placeholder="Выберите дату и время начала регистрации"
                className="events__event-date__datepicker"
                allowClear={false}
                defaultValue={
                  registration_start_date
                    ? dayjs(registration_start_date)
                    : undefined
                }
                onChange={(value) => {
                  onChange(value, "from");
                }}
              />
            </div>
          </FormItem>
          <FormItem
            name={`${name}_registration_finish_date`}
            hasFeedback
            validateFirst
            rules={[
              rulesTo,
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const startDate = getFieldValue(
                    `${name}_registration_start_date`
                  );
                  if (
                    value &&
                    startDate &&
                    dayjs(value).isBefore(dayjs(startDate))
                  ) {
                    return Promise.reject(
                      new Error(
                        "Дата окончания не может быть раньше даты начала!"
                      )
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <div className="events__event-date__datepickercontainer">
              <Typography.Text>По</Typography.Text>
              <DatePicker
                locale={Locale}
                id={`${name}_registration_finish_date`}
                format={Locale.dateTimeFormat}
                showTime={{ format: Locale.timeFormat }}
                placeholder="Выберите дату и время окончания регистрации"
                className="events__event-date__datepicker"
                allowClear={false}
                defaultValue={
                  registration_finish_date
                    ? dayjs(registration_finish_date)
                    : undefined
                }
                onChange={(value) => {
                  onChange(value, "to");
                }}
              />
            </div>
          </FormItem>
        </>
      )}
    </div>
  );
}

export default EventRegisterDate;
