import { Tabs } from "antd";
import ResultTableTimeMatches from "./resultTableTimeMatches";
import "./sass/timeMatches.scss";
import TableTimeMatches from "./tableTimeMatches";

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
