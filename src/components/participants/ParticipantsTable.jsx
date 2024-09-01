import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Locale, ModalType } from "@constants";
import { getUniqueFilters } from "@utils";
import { Button, Flex, Modal, Table, Typography } from "antd";
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
