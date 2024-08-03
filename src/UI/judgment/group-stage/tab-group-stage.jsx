import { Tabs } from "antd";
import TableGroupStage from "./table-group-stage";
import MatchGroupStage from "./matches-group-stage";
import "./sass/groupStage.scss";

const items = [
  {
    key: "1",
    label: "Таблица",
    children: <TableGroupStage />,
  },

  {
    key: "2",
    label: "Матчи",
    children: <MatchGroupStage />,
  },
  {
    key: "3",
    label: "Плей-офф",
    children: "Content Tab3",
    disabled: true,
  },
];
function GroupTab() {
  return (
    <>
      <div
        style={{
          marginTop: 10,
        }}
      ></div>
      <Tabs className="Tabs" defaultActiveKey="1" items={items} />
    </>
  );
}

export default GroupTab;
