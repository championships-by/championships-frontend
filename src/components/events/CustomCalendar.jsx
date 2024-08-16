import { Locale } from "@constants";
import { Calendar } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import dayLocaleData from "dayjs/plugin/localeData";
import { CustomHeader } from "./CustomHeader";
dayjs.extend(dayLocaleData);

export const CustomCalendar = () => {
  return (
    <Calendar headerRender={CustomHeader} fullscreen={false} locale={Locale} />
  );
};
