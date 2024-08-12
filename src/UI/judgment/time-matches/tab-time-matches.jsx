import { Tabs } from "antd";
import ResultTableTimeMatches from "./result-table-time-matches";
import "./sass/time-matches.scss";
import TableTimeMatches from "./table-time-matches";

const items = [
  {
    key: "1",
    label: "Таблица",
    children: <TableTimeMatches />,
  },
  {
    key: "2",
    label: "Итоги",
    children: <ResultTableTimeMatches />,
  },
];

function TabMatches() {
  return <Tabs className="Tabs" defaultActiveKey="1" items={items} />;
}

export default TabMatches;
