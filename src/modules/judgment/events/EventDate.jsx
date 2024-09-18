import { DatePicker, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Locale } from "@constants";
import { useEffect } from "react";
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

function EventDate({ name, value, onChange: onChangeBase, form, isEdit }) {
  const { holding_start_date, holding_finish_date } = value || {};

  useEffect(() => {
    form.setFieldsValue({
      [`${name}_holding_start_date`]: holding_start_date,
      [`${name}_holding_finish_date`]: holding_finish_date,
    });
  });

  const onChange = (val, type) => {
    const date = dayjs(val).toISOString();
    switch (type) {
      case "from": {
        form.setFieldsValue({
          [`${name}_holding_start_date`]: date,
        });
        onChangeBase({
          [name]: {
            ...value,
            holding_start_date: date,
          },
        });

        break;
      }
      case "to": {
        form.setFieldsValue({
          [`${name}_holding_finish_date`]: date,
        });
        onChangeBase({
          [name]: {
            ...value,
            holding_finish_date: date,
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
          <Typography.Text>Проведение</Typography.Text>
          <FormItem
            name={`${name}_holding_start_date`}
            hasFeedback
            validateFirst
            rules={[
              rulesFrom,
              {
                validator(_, value) {
                  const registrationFinishDate = form.getFieldValue(
                    `registration_registration_finish_date`
                  );
                  if (
                    value &&
                    registrationFinishDate &&
                    dayjs(value).isBefore(dayjs(registrationFinishDate))
                  ) {
                    return Promise.reject(
                      new Error(
                        "Дата начала проведения не может быть раньше даты конца регистрации!"
                      )
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
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
                allowClear={false}
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
            rules={[
              rulesTo,
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const startDate = getFieldValue(`${name}_holding_start_date`);
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
                id={`${name}_holding_finish_date`}
                format={Locale.dateTimeFormat}
                showTime={{ format: Locale.timeFormat }}
                placeholder="Выберите дату и время окончания мероприятия"
                className="events__event-date__datepicker"
                allowClear={false}
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
      )}
    </div>
  );
}

export default EventDate;
