import { MatchesGroupStage, TableGroupStage } from "../components";

export const GroupStageTabs = {
  STATISTICS_TABLE: "statisticsTable",
  MATCHES: "matches",
  FINAL_STAGE: "finalStage",
  RESULTS: "results",
};

export const groupStageTabs = {
  [GroupStageTabs.STATISTICS_TABLE]: {
    key: "1",
    label: "Таблица",
    children: <TableGroupStage />,
    disabled: false,
  },
  [GroupStageTabs.MATCHES]: {
    key: "2",
    label: "Матчи",
    children: <MatchesGroupStage />,
    disabled: false,
  },
  [GroupStageTabs.FINAL_STAGE]: {
    key: "3",
    label: "Финальный этап",
    children: "Content Tab3",
    disabled: true,
  },
  [GroupStageTabs.RESULTS]: {
    key: "4",
    label: "Итоги",
    children: "Content Tab4",
    disabled: true,
  },
};
