import { Locale } from "@constants";
import { Table } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

function TeamWinsTable({ teamWinsData }) {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("EVENTS.EVENTS"),
      key: "event",
      dataIndex: "event_name",
      width: "50%",
    },
    {
      title: t("COMMON.NOMINATIONS"),
      key: "nomination",
      dataIndex: "nomination_name",
    },
  ];

  return (
    <div>
      <Table
        dataSource={teamWinsData}
        columns={columns}
        locale={Locale}
        pagination={false}
      />
    </div>
  );
}

export default TeamWinsTable;
