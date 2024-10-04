import { Locale } from "@constants";
import { Table } from "antd";
import React from "react";

function TeamWinsTable({ teamWinsData }) {
  const columns = [
    {
      title: "Мероприятие",
      key: "event",
      dataIndex: "event_name",
      width: "50%",
    },
    {
      title: "Компетенции",
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
