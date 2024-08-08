import dayjs from "dayjs";

const defaultTime = "00:00.000";
const defaultFormat = "mm:ss.SSS";

const formatTime = (time = defaultTime, format = defaultFormat) =>
  dayjs(time, format);

export { defaultFormat, defaultTime, formatTime };
