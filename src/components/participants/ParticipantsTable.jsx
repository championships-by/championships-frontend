import React, { useState } from "react";
import { Button, Flex, Modal, Table, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ParticipantModal from "./ParticipantModal";
import { participantApi } from "../../api";

function ParticipantsTable({ ParticipantData, getParticipant }) {
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
      render: (data) => {
        const { email } = data;

        return (
          <Flex>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal(data)}
            />
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => deleteParticipantConfirm(email)}
            />
          </Flex>
        );
      },
    },
  ];

  const [editModalData, setEditModalData] = useState(null);

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
      <Table dataSource={ParticipantData} columns={columns} />

      <ParticipantModal
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
