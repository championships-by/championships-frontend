import {
  EditOutlined,
  InfoCircleOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import {
  Locale,
  paginationLocale,
  tableLocale,
  ModalType,
  ROUTES,
} from "@constants";
import { getUniqueFilters } from "@utils";
import { Button, Flex, Table, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import ParticipantModal from "./ParticipantModal";
import { useNavigate } from "react-router-dom";
import { getTranslation } from "@utils";
import { useTranslation } from "react-i18next";

function ParticipantsTable({ ParticipantData, getParticipant }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = [
    {
      title: t("COMMON.SURNAME_NAME_THIRD_NAME"),
      key: "participant_fullname",
      render: (_, { first_name, second_name, third_name, is_verified }) => (
        <>
          <Typography.Text>{`${second_name} ${first_name} ${third_name} `}</Typography.Text>
          {is_verified ? (
            <Tooltip
              title={t("PARTICIPANTS.VERIFICATION_DONE")}
              placement="right"
            >
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            </Tooltip>
          ) : (
            ""
          )}
        </>
      ),
      sorter: (a, b) => {
        const firstFullName = `${a.second_name} ${a.first_name} ${a.third_name}`;
        const secondFullName = `${b.second_name} ${b.first_name} ${b.third_name}`;
        return firstFullName.localeCompare(secondFullName);
      },
    },
    {
      title: t("COMMON.REGION"),
      key: "participant_region",
      dataIndex: "region",
      filters: getUniqueFilters(ParticipantData, "region"),
      onFilter: (value, record) => record.region === value,
      sorter: (a, b) => a.region.localeCompare(b.region),
    },
    {
      title: t("COMMON.BIRTHDAY"),
      dataIndex: "birth_date",
      render: (birth_date) => dayjs(birth_date).format(Locale.dateFormat),
      key: "participant_organization",
    },
    {
      title: t("COMMON.ACTIONS"),
      key: "action",
      render: (data) => {
        return (
          <Flex>
            <Tooltip title={t("COMMON.EDIT")}>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => {
                  openEditModal(data);
                }}
              />
            </Tooltip>
            <Tooltip title={t("PARTICIPANTS.CARD_OF_PARTICIPANT")}>
              <Button
                type="text"
                icon={<InfoCircleOutlined />}
                onClick={() =>
                  navigate(ROUTES.PARTICIPANT_INFORMATION.PATH(data.id))
                }
              />
            </Tooltip>
          </Flex>
        );
      },
    },
  ];

  const [editModalData, setEditModalData] = useState(null);

  const onOk = () => {
    setEditModalData(null);

    getParticipant();
  };

  const onCancel = () => {
    setEditModalData(null);
  };

  const openEditModal = (data) => {
    setEditModalData(data);
  };

  return (
    <div>
      <Table
        dataSource={ParticipantData}
        columns={columns}
        pagination={{
          position: ["bottomCenter"],
          showSizeChanger: false,
          locale: getTranslation(paginationLocale, t),
        }}
        locale={getTranslation(tableLocale, t)}
      />

      <ParticipantModal
        type={ModalType.EDIT}
        isOpen={Boolean(editModalData)}
        data={editModalData}
        onOk={onOk}
        onCancel={onCancel}
        isEdit
      />
    </div>
  );
}

export default ParticipantsTable;
