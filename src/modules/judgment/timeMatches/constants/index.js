import { RESPONSE_STATUS } from "@constants";

export const TimeMatchesTabsEnum = {
  TABLE: "table",
  RESULTS: "results",
};

export const timeMatchesTabs = {
  [TimeMatchesTabsEnum.TABLE]: {
    key: "1",
    label: "Таблица",
  },
  [TimeMatchesTabsEnum.RESULTS]: {
    key: "2",
    label: "Итоги",
    disabled: true,
  },
};

export const timeMatchesErrorMessages = {
  [RESPONSE_STATUS.STATUS_CONFLICT]:
    "Вы не можете завершить стадию, так как не являетесь судьей",
  default: "Произошла неизвестная ошибка. Обратитесь к администратору сайта",
};
