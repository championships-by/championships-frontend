import React from "react";
import { DatePicker, Flex, Input, Space, Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
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

  return (
    <>
      <Typography.Text>Дата рождения</Typography.Text>
      <Flex>
        <Space.Compact className="participant__birthday-input__space">
          <Input
            prefix={<CalendarOutlined />}
            disabled
            className="participant__birthday-input__input"
          />
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
            />
          </FormItem>
        </Space.Compact>
      </Flex>
    </>
  );
}

export default ParticipantBirthdayInput;
