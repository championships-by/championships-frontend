import React from "react";
import { DatePicker, Flex, Input, Space, Typography } from "antd";
import dayjs from "dayjs";
import FormItem from "antd/es/form/FormItem";
import { Locale } from "@constants";
import { useTranslation } from "react-i18next";

import "./sass/participant.scss";

function ParticipantBirthdayInput({ name, value, onChange: onChangeBase }) {
  const { t } = useTranslation();

  const rules = [
    {
      type: "object",
      required: true,
      message: t("RULES.PLEASE_ENTER_BIRTHDAY"),
    },
  ];

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
      <Typography.Text>{t("COMMON.BIRTHDAY")}</Typography.Text>
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
              placeholder={t("COMMON.CHOOSE_BIRTHDAY")}
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
