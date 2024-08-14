import ResultTableTimeMatches from "@ui/judgment/timeMatches/ResultTableTimeMatches";
import TableTimeMatches from "@ui/judgment/timeMatches/TableTimeMatches";
import { Tabs } from "antd";

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

export default function TimeMatches() {
  return <Tabs className="Tabs" defaultActiveKey="1" items={items} />;
}
