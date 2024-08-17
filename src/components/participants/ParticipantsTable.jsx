import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getUniqueFilters } from "@utils";
import { Button, Flex, Modal, Table, Typography } from "antd";
import React, { useState } from "react";
import ParticipantModal from "./ParticipantModal";

function ParticipantsTable({ ParticipantData }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const deleteParticipantConfirm = (email) => {
    const hide_participant_request = async () => {
      const body = JSON.stringify({
        participant_email: email,
      });

      await participantApi.setHideParticipant(body);
    };
    Modal.confirm({
      title: "Вы уверены?",
      content: "Вы уверены что хотите удалить этого участника?",
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <OkBtn />
          <CancelBtn />
        </>
      ),
      okText: "Да",
      onOk: () => {
        hide_participant_request();
      },
      cancelText: "Отмена",
    });
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const changeParticipantData = () => {
    setIsEditModalOpen(false);
  };

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
      title: "Учреждение образования",
      dataIndex: "educational_institution",
      key: "participant_organization",
      filters: getUniqueFilters(ParticipantData, "educational_institution"),
      onFilter: (value, record) => record.educational_institution === value,
      sorter: (a, b) =>
        a.educational_institution.localeCompare(b.educational_institution),
    },
    {
      title: "Действия",
      key: "action",
      render: ({ email }) => (
        <Flex>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => openEditModal()}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => deleteParticipantConfirm(email)}
          />
        </Flex>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={ParticipantData} columns={columns} />

      <ParticipantModal
        isOpen={isEditModalOpen}
        onOk={() => changeParticipantData()}
        onCancel={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}

export default ParticipantsTable;
