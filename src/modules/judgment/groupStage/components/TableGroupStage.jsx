import { useMatches } from "@hooks";
import { Checkbox, Table } from "antd";
import "./TableGroupStage.scss";

const columns = [
  {
    title: "№",
    key: "index",
    dataIndex: "index",
    render: (text, record, index) => <p>{index + 1}</p>,
  },
  {
    title: "Участники",
    key: "participant",
    dataIndex: "participant",
  },
  {
    title: "Очки",
    key: "points",
    dataIndex: "points",
  },
  {
    title: "Счет",
    key: "score",
    dataIndex: "score",
  },
  {
    title: "Участники",
    key: "isPassed",
    dataIndex: "isPassed",
    render: (text, record) => (
      <Checkbox defaultChecked={record.isPassed} disabled />
    ),
  },
];

export const TableGroupStage = () => {
  const { finalParticipants } = useMatches();

  return !finalParticipants || finalParticipants.length === 0 ? (
    <div className="no-data">
      <h2>Пока что нет данных о матчах</h2>
    </div>
  ) : (
    <Table
      columns={columns}
      pagination={{
        position: ["bottomCenter"],
      }}
      dataSource={finalParticipants}
    />
  );
};
