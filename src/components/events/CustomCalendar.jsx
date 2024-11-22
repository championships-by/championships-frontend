import { calendarLocale } from "@constants";
import { Calendar } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import dayLocaleData from "dayjs/plugin/localeData";
import { CustomHeader } from "./CustomHeader";
import { setEventDate } from "@store/events/slice";
import { useDispatch } from "react-redux";
import { getTranslation } from "@utils";
import { useTranslation } from "react-i18next";

dayjs.extend(dayLocaleData);

export const CustomCalendar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const onChange = (value) => {
    dispatch(setEventDate(value.$d.toISOString()));
  };

  return (
    <Calendar
      headerRender={CustomHeader}
      fullscreen={false}
      locale={getTranslation(calendarLocale, t)}
      onChange={onChange}
    />
  );
};
