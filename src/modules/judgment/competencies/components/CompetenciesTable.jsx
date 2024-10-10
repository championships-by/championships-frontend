import { LoadingOutlined } from "@ant-design/icons";
import { generateCriteriaColumns, getContentSectionWidth } from "@utils";
import { InputNumber, Spin, Table } from "antd";
import { useEffect, useMemo, useState } from "react";

import "./CompetenciesTable.scss";

export const CompetenciesTable = ({
  criteria,
  dataSource,
  isLoading,
  hasError,
  editable,
  onChange,
}) => {
  const [tableWidth, setTableWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setTableWidth(getContentSectionWidth());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const columns = useMemo(
    () => [
      {
        title: "Участник",
        dataIndex: "participant",
        key: "participant",
        fixed: "left",
        render: (text, { participant }) => {
          const { firstName, secondName, thirdName } = participant;
          return `${secondName} ${firstName} ${thirdName}`;
        },
      },
      ...generateCriteriaColumns(criteria, (text, record, index, columnId) => {
        const currentCriteria = record[`criteria${columnId}`];
        return (
          <div className="criteria-table__column">
            <InputNumber
              className="criteria-table__column__input"
              disabled={!editable}
              placeholder={currentCriteria.maxScore}
              defaultValue={currentCriteria.score}
              max={currentCriteria.maxScore}
              min={0}
              onChange={(value) =>
                onChange(value, index, columnId, currentCriteria)
              }
            />
            <span>/</span>
            <span>{currentCriteria.maxScore}</span>
          </div>
        );
      }),
      {
        title: "Итоги",
        dataIndex: "totalScore",
        key: "totalScore",
        fixed: "right",
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
      className="criteria-table"
      style={{ width: tableWidth }}
      locale={{ emptyText: "Нет данных" }}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      scroll={{
        x: true,
      }}
    />
  );
};
