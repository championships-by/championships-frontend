import { CompetenciesResults, CompetenciesTable } from "../components";

export const CompetenciesTabs = {
  TABLE: "table",
  RESULTS: "results",
};

export const competenciesTabs = {
  [CompetenciesTabs.TABLE]: {
    key: "1",
    label: "Таблица",
    children: <CompetenciesTable />,
  },
  [CompetenciesTabs.RESULTS]: {
    key: "2",
    label: "Итоги",
    children: <CompetenciesResults />,
    disabled: true,
  },
};
