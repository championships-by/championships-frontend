import { DatePicker, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Locale, calendarLocale } from "@constants";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { getTranslation } from "@utils";

import "./sass/events.scss";

function EventRegisterDate({
  name,
  value,
  onChange: onChangeBase,
  form,
  isEdit,
}) {
  const { t } = useTranslation();

  const { registration_start_date, registration_finish_date } = value || {};

  const rulesFrom = [
    {
      required: true,
      message: t("RULES.CHOOSE_DATE_OF_START_REGISTER_EVENT"),
    },
  ];

  const rulesTo = {
    required: true,
    message: t("RULES.CHOOSE_DATE_OF_END_REGISTER_EVENT"),
  };

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
          <Typography.Text>{t("COMMON.REGISTRATION")}</Typography.Text>
          <FormItem
            name={`${name}_registration_start_date`}
            hasFeedback
            validateFirst
            rules={rulesFrom}
          >
            <div className="events__event-date__datepickercontainer">
              <Typography.Text>{t("COMMON.FROM_UPPERCASE")}</Typography.Text>
              <DatePicker
                locale={getTranslation(calendarLocale, t)}
                id={`${name}_registration_start_date`}
                format={Locale.dateTimeFormat}
                showTime={{ format: Locale.timeFormat }}
                placeholder={t("EVENTS.CHOOSE_DATE_OF_START_REGISTRATION")}
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
                        t("RULES.DATE_OF_FINISH_CANT_BE_EARLIER_THAN_FINISH")
                      )
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <div className="events__event-date__datepickercontainer">
              <Typography.Text>{t("COMMON.TO_UPPERCASE")}</Typography.Text>
              <DatePicker
                locale={getTranslation(calendarLocale, t)}
                id={`${name}_registration_finish_date`}
                format={Locale.dateTimeFormat}
                showTime={{ format: Locale.timeFormat }}
                placeholder={t("EVENTS.CHOOSE_DATE_OF_FINISH_REGISTRATION")}
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
