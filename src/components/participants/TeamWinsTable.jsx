import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Locale, ModalType } from "@constants";
import { getUniqueFilters } from "@utils";
import { Button, Flex, Table, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import ParticipantModal from "./ParticipantModal";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@constants";

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
