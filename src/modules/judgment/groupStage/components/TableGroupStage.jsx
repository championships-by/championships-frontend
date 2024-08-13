import { useMatches } from "@hooks";
import { Checkbox, Table } from "antd";

export const TableGroupStage = () => {
  const { finalParticipants } = useMatches();

  console.log(finalParticipants);

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
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>Пока что нет данных о матчах</h2>
    </div>
  ) : (
    <Table columns={columns} dataSource={finalParticipants} />
  );
};
