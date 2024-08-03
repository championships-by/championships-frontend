import React, { useState } from "react";
import { Button, Flex, Modal, Table, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ParticipantModal from "./ParticipantModal";
import { participantApi } from "../../api";

function ParticipantsTable({ ParticipantData }) {
  const columns = [
    {
      title: "ФИО",
      key: "participant_fullname",
      render: (_, { first_name, second_name, third_name }) => (
        <Typography.Text>{`${second_name} ${first_name} ${third_name}`}</Typography.Text>
      ),
    },
    {
      title: "Регион",
      key: "participant_region",
      dataIndex: "region",
    },
    {
      title: "Учреждение образования",
      dataIndex: "educational_institution",
      key: "participant_organization",
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
