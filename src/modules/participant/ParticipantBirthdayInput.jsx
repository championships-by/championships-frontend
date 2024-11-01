import React from "react";
import { DatePicker, Flex, Input, Space, Typography } from "antd";
import dayjs from "dayjs";
import FormItem from "antd/es/form/FormItem";
import { Locale } from "@constants";

import "./sass/participant.scss";

const rules = [
  {
    type: "object",
    required: true,
    message: "Пожалуйста, выберите дату рождения",
  },
];

function ParticipantBirthdayInput({ name, value, onChange: onChangeBase }) {
  const onChange = (val) => {
    const date = dayjs(val).toISOString();

    onChangeBase({
      [name]: date,
    });
  };

  const disabledDate = (current) => {
    return current && current > dayjs().subtract(6, "years").endOf("day");
  };

  return (
    <>
      <Typography.Text>Дата рождения</Typography.Text>
      <Flex>
        <Space.Compact className="participant__birthday-input__space">
          <FormItem
            name={name}
            hasFeedback
            validateFirst
            rules={rules}
            className="participant__birthday-input__formitem"
          >
            <DatePicker
              format={Locale.dateFormat}
              className="participant__birthday-input__datepicker"
              placeholder="Выберите дату рождения"
              locale={Locale}
              value={dayjs(value)}
              onChange={(value) => onChange(value)}
              disabledDate={disabledDate}
            />
          </FormItem>
        </Space.Compact>
      </Flex>
    </>
  );
}

export default ParticipantBirthdayInput;
