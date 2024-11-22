import { calendarLocale } from "@constants";
import { Radio, Select } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useTranslation } from "react-i18next";
import { getTranslation } from "@utils";

import "./sass/custom-calendar.scss";

dayjs.locale("ru");

export const CustomHeader = ({ value, type, onChange, onTypeChange }) => {
  const { t } = useTranslation();
  const year = value.year();
  const month = value.month();

  const years = Array.from({ length: 10 }, (_, i) => value.year() + i - 5);

  return (
    <div className="customCalendar__header">
      <Select
        size="small"
        value={month}
        onChange={(newMonth) => {
          const now = value.clone().month(newMonth);
          onChange(now);
        }}
      >
        {getTranslation(calendarLocale.lang.shortMonths, t).map(
          (month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          )
        )}
      </Select>
      <Select
        size="small"
        value={year}
        onChange={(newYear) => {
          const now = value.clone().year(newYear);
          onChange(now);
        }}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
      <Radio.Group
        size="small"
        onChange={(e) => onTypeChange(e.target.value)}
        value={type}
      >
        <Radio.Button value="month">{t("COMMON.MONTH")}</Radio.Button>
        <Radio.Button value="year">{t("COMMON.YEAR")}</Radio.Button>
      </Radio.Group>
    </div>
  );
};
