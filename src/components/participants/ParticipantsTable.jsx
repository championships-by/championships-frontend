import { EditOutlined } from "@ant-design/icons";
import { Locale, ModalType } from "@constants";
import { getUniqueFilters } from "@utils";
import { Button, Flex, Table, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import ParticipantModal from "./ParticipantModal";

function ParticipantsTable({ ParticipantData, getParticipant }) {
  const columns = [
    {
      title: "ФИО",
      key: "participant_fullname",
      render: (_, { first_name, second_name, third_name }) => (
        <Typography.Text>{`${second_name} ${first_name} ${third_name}`}</Typography.Text>
      ),
      sorter: (a, b) => {
        const firstFullName = `${a.second_name} ${a.first_name} ${a.third_name}`;
        const secondFullName = `${b.second_name} ${b.first_name} ${b.third_name}`;
        return firstFullName.localeCompare(secondFullName);
      },
    },
    {
      title: "Регион",
      key: "participant_region",
      dataIndex: "region",
      filters: getUniqueFilters(ParticipantData, "region"),
      onFilter: (value, record) => record.region === value,
      sorter: (a, b) => a.region.localeCompare(b.region),
    },
    {
      title: "Дата рождения",
      dataIndex: "birth_date",
      render: (birth_date) => dayjs(birth_date).format(Locale.dateFormat),
      key: "participant_organization",
      filters: getUniqueFilters(ParticipantData, "birth_date"),
      onFilter: (value, record) => record.birth_date === value,
      sorter: (a, b) => a.birth_date.localeCompare(b.birth_date),
    },
    {
      title: "Действия",
      key: "action",
      render: (data) => {
        const { email } = data;

        return (
          <Flex>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal(data)}
            />
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
      <Table dataSource={ParticipantData} columns={columns} locale={Locale} />

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
