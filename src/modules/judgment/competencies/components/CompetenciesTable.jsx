import { LoadingOutlined } from "@ant-design/icons";
import { generateCriteriaColumns } from "@utils";
import { InputNumber, Spin, Table } from "antd";
import { useMemo } from "react";

export const CompetenciesTable = ({
  criteria,
  dataSource,
  isLoading,
  hasError,
  editable,
  onChange,
}) => {
  const columns = useMemo(
    () => [
      {
        title: "Участник",
        dataIndex: "participant",
        key: "participant",
        render: (text, { participant }) => {
          const { firstName, secondName, thirdName } = participant;
          return `${secondName} ${firstName} ${thirdName}`;
        },
      },
      ...generateCriteriaColumns(criteria, (text, record, index, columnId) => {
        const currentCriteria = record[`criteria${columnId}`];
        return (
          <InputNumber
            disabled={!editable}
            placeholder={currentCriteria.maxScore}
            defaultValue={currentCriteria.score}
            max={currentCriteria.maxScore}
            min={0}
            onChange={(value) =>
              onChange(value, index, columnId, currentCriteria)
            }
          />
        );
      }),
      {
        title: "Итоги",
        dataIndex: "totalScore",
        key: "totalScore",
      },
    ],
    [criteria, editable, onChange]
  );

  return isLoading ? (
    <Spin indicator={<LoadingOutlined className="icon" spin />} />
  ) : hasError ? (
    <h1>Произошла ошибка</h1>
  ) : (
    <Table
      locale={{ emptyText: "Нет данных" }}
      columns={columns}
      dataSource={dataSource}
    />
  );
};
