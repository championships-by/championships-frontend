import { Flex, Tooltip, Table, Button, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { competenciesApi } from "@api";

import "./sass/competencies-criteria.scss";

function limitStringLength(str) {
  const maxLength = 50;
  if (str.length > maxLength) {
    return `${str.slice(0, maxLength - 3)}...`;
  }
  return str;
}
const columns = [
  {
    title: <Tooltip title="Компетенции" />,
    dataIndex: "competencies",
    key: "competencies",
    render: (text) => limitStringLength(text),
  },
  {
    title: <div className="rotate">Иванов Иван</div>,
    dataIndex: "first_participant",
    key: "first_participant",
  },
  {
    title: <div className="rotate">Петров Петр</div>,
    dataIndex: "second_participant",
    key: "second_participant",
  },
  {
    title: <div className="rotate">Сидоров Сидр</div>,
    dataIndex: "third_participant",
    key: "third_participant",
  },
];

const data = [
  {
    competencies: "Компетенция №1",
    first_participant: <InputNumber max={10} min={0} />,
    second_participant: <InputNumber max={10} min={0} />,
    third_participant: <InputNumber max={10} min={0} />,
  },
  {
    competencies: "Компетенция №2",
    first_participant: <InputNumber max={10} min={0} />,
    second_participant: <InputNumber max={10} min={0} />,
    third_participant: <InputNumber max={10} min={0} />,
  },
  {
    competencies: "Компетенция №3",
    first_participant: <InputNumber max={10} min={0} />,
    second_participant: <InputNumber max={10} min={0} />,
    third_participant: <InputNumber max={10} min={0} />,
  },
  {
    competencies: "Компетенция №4",
    first_participant: <InputNumber max={10} min={0} />,
    second_participant: <InputNumber max={10} min={0} />,
    third_participant: <InputNumber max={10} min={0} />,
  },
];
function CompetenciesTable() {
  const [competencies, setCompetencies] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await competenciesApi.getCompetencies();
      setCompetencies(response);
    })();
  }, []);
  return (
    <Flex vertical gap="large">
      <Table
        className="table"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </Flex>
  );
}

export default CompetenciesTable;
