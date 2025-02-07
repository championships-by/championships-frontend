import { LoadingOutlined } from "@ant-design/icons";
import { generateCriteriaColumns, getContentSectionWidth } from "@utils";
import { InputNumber, Spin, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { tableLocale } from "@constants";
import { getTranslation } from "@utils";
import { useTranslation } from "react-i18next";
import { ANTD_INPUT_FIELD_STATUSES } from "@constants";

import "./CompetenciesTable.scss";

export const CompetenciesTable = ({
  criteria,
  dataSource,
  isLoading,
  hasError,
  editable,
  onChange,
}) => {
  const { t } = useTranslation();
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
        title: t("COMMON.TEAM"),
        dataIndex: "team",
        key: "team",
        fixed: "left",
        render: (text, { team }) => {
          const { name } = team;
          return name;
        },
      },
      ...generateCriteriaColumns(criteria, (text, record, index, columnId) => {
        const currentCriteria = record[`criteria${columnId}`];
        const status = currentCriteria.score === null ? ANTD_INPUT_FIELD_STATUSES.ERROR : null;

        return (
          <div className="criteria-table__column">
            <InputNumber
              status={status}
              className="criteria-table__column__input"
              disabled={!editable}
              placeholder="–"
              defaultValue={currentCriteria.score}
              controls={false}
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
        title: t("COMMON.TOTAL"),
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
    <h1>{t("MESSAGES.ERROR")}</h1>
  ) : (
    <Table
      className="criteria-table"
      style={{ width: tableWidth }}
      locale={getTranslation(tableLocale, t)}
      columns={columns}
      dataSource={dataSource}
      expandable={{
        expandedRowRender: (record) => <p>{record.participants}</p>,
      }}
      pagination={false}
      scroll={{
        x: true,
      }}
    />
  );
};
