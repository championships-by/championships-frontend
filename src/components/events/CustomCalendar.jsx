import { Locale } from "@constants";
import { Calendar } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import dayLocaleData from "dayjs/plugin/localeData";
import { CustomHeader } from "./CustomHeader";
import { setEventDate } from "@store/events/slice";
import { useDispatch } from "react-redux";

dayjs.extend(dayLocaleData);

export const CustomCalendar = () => {
  const dispatch = useDispatch();
  const onChange = (value) => {
    dispatch(setEventDate(value.$d.toISOString()));
  };

  return (
    <Calendar
      headerRender={CustomHeader}
      fullscreen={false}
      locale={Locale}
      onChange={onChange}
    />
  );
};
