export const CompetenciesTabsEnum = {
  TABLE: "table",
  RESULTS: "results",
};

export const competenciesTabs = {
  [CompetenciesTabsEnum.TABLE]: {
    key: "1",
    label: "Таблица",
  },
  [CompetenciesTabsEnum.RESULTS]: {
    key: "2",
    label: "Итоги",
    disabled: true,
  },
};
