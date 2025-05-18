import React from "react";
import { tableLocale } from "@/const";
import { Table } from "antd";
import { getTranslation } from "@/utils";
import { useTranslation } from "react-i18next";

import "@/modules/judgment/common/sass/results-table.scss";

function ResultsTable({ columns, dataSource }) {
  const { t } = useTranslation();

  return (
    <Table
      className="results-table"
      locale={getTranslation(tableLocale, t)}
      pagination={false}
      columns={columns}
      dataSource={dataSource}
    />
  );
}

export default ResultsTable;
