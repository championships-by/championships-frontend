import { Table, Flex, List, Button, Typography, Tooltip } from "antd";
import { useState } from "react";
import { EditOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import TeamEditModal from "@components/eventRegistration/TeamEditModal";
import TeamAddParticipantModal from "./TeamAddParticipantModal";
import { Locale } from "@constants";

function TeamsTable({ TeamsData }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState();
  const [selectedTeamName, setSelectedTeamName] = useState();

  const openEditModal = (id, name) => {
    setSelectedTeamId(id);
    setSelectedTeamName(name);
    setIsEditModalOpen(true);
  };

  const changeTeamData = () => {
    setIsEditModalOpen(false);
  };

  const openParticipantModal = () => {
    setIsParticipantModalOpen(true);
  };

  const changeParticipantData = () => {
    setIsParticipantModalOpen(false);
  };

  const columns = [
    {
      title: "Команда",
      key: "nameTeam",
      width: "15%",
      dataIndex: "name",
    },
    {
      title: "Компетенция - участники ",
      key: "nomination_particioant",
      width: "75%",
      children: [
        {
          title: "Компетенции",
          key: "nomination",
          width: "25%",
          dataIndex: "nomination",
        },
        {
          title: "Cтатус участника",
          children: [
            {
              title: "Участники",
              key: "participants",
              width: "40%",
              render: (_, { participants }) => (
                <List
                  locale={{
                    emptyText: "Участники пока отсутствуют",
                  }}
                  split={false}
                  dataSource={participants}
                  renderItem={(item) => (
                    <List.Item>
                      <Typography.Text>{`${item.second_name} ${item.first_name} ${item.third_name}`}</Typography.Text>
                    </List.Item>
                  )}
                />
              ),
            },
            {
              title: "Статус",
              key: "Status",
              width: "10%",
              dataIndex: "Status",
            },
          ],
        },
      ],
    },
    {
      title: "Действия",
      width: "10%",
      key: "action",
      fixed: "right",
      render: (_, team) => (
        <Flex>
          <Tooltip title="Редактировать">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal(team.id, team.name)}
            />
          </Tooltip>
          <Tooltip title="Добавить">
            <Button
              type="text"
              icon={<UsergroupAddOutlined />}
              onClick={() => openParticipantModal()}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={TeamsData}
        columns={columns}
        bordered
        locale={Locale}
        pagination={{
          position: ["bottomCenter"],
        }}
      />

      <TeamEditModal
        isOpen={isEditModalOpen}
        onOk={() => changeTeamData()}
        onCancel={() => setIsEditModalOpen(false)}
        teamID={selectedTeamId}
        teamName={selectedTeamName}
      />
      <TeamAddParticipantModal
        isOpen={isParticipantModalOpen}
        onOk={() => changeParticipantData()}
        onCancel={() => setIsParticipantModalOpen(false)}
      />
    </>
  );
}

export default TeamsTable;
