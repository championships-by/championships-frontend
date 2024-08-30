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
