import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Locale, ModalType, ROUTES } from "@constants";
import { getUniqueFilters } from "@utils";
import { Button, Flex, Table, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import ParticipantModal from "./ParticipantModal";
import { useNavigate } from "react-router-dom";

function ParticipantsTable({ ParticipantData, getParticipant }) {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Фамилия имя отчество",
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
    },
    {
      title: "Действия",
      key: "action",
      render: (data) => {
        return (
          <Flex>
            <Tooltip title="Редактирование">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => openEditModal(data)}
              />
            </Tooltip>
            <Tooltip title="Карточка участника">
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
          locale: Locale.pagination,
        }}
        locale={Locale}
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
