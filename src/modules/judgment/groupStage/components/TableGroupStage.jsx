import { useMatches } from "@hooks";
import { Checkbox, Table } from "antd";
import "./TableGroupStage.scss";

export const TableGroupStage = () => {
  const { finalParticipants } = useMatches();

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

  return !finalParticipants || finalParticipants.length === 0 ? (
    <div className="no-data">
      <h2>Пока что нет данных о матчах</h2>
    </div>
  ) : (
    <Table columns={columns} dataSource={finalParticipants} />
  );
};
