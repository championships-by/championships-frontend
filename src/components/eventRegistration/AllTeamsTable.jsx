import { Table, Flex, Button, Tooltip, List, Typography } from "antd";
import { useState } from "react";
import { EditOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import TeamEditModal from "@components/eventRegistration/TeamEditModal";
import TeamAddParticipantModal from "./TeamAddParticipantModal";
import { Locale } from "@constants";

const getRowSpan = (data, index, key) => {
  let count = 1;
  for (let i = index + 1; i < data.length; i++) {
    if (data[i][key] === data[index][key]) {
      count++;
    } else {
      break;
    }
  }
  return count;
};

function AllTeamsTable({ teamsData }) {
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

  const openParticipantModal = (teamId) => {
    setSelectedTeamId(teamId);
    setIsParticipantModalOpen(true);
  };

  const changeParticipantData = () => {
    setIsParticipantModalOpen(false);
  };

  const columns = 
  [
    {
      title: "Команда",
      key: "team",
      width: "20%",
      dataIndex: "name",
      onCell: (record, rowIndex) => {
        const rowSpan = getRowSpan(teamsData, rowIndex, "name");
          return {
            rowSpan:
              rowIndex === 0 ||
              teamsData[rowIndex - 1].name !== record.name
                ? rowSpan
                : 0,
          };
      },
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: "Участник",
      key: "participant_name",
      dataIndex: "participants",
      width: "20%",
      render: (participants) => (
        <List
          itemLayout="horizontal"
          dataSource={participants}
          renderItem={(participant) => (
            <List.Item>
              <Typography.Text>
                {participant.first_name} {participant.second_name} {participant.third_name}
              </Typography.Text>
            </List.Item>
          )}
        />
      ),
    },
    {
      title: "Действия",
      key: "action",
      width: "10%",
      onCell: (record, rowIndex) => {
        const rowSpan = getRowSpan(teamsData, rowIndex, "name");
          return {
            rowSpan:
              rowIndex === 0 ||
              teamsData[rowIndex - 1].name !== record.name
                ? rowSpan
                : 0,
          };
      },
      render: (record) => (
        <Flex>
          <Tooltip title="Редактировать">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal(record.id, record.name)}
            />
          </Tooltip>
          <Tooltip title="Добавить">
            <Button
              type="text"
              icon={<UsergroupAddOutlined />}
              onClick={() => openParticipantModal(record.id)}
            />
          </Tooltip>
        </Flex>
      ),
    }
  ];

  return (
    <>
      <Table
        dataSource={teamsData}
        columns={columns}
        bordered
        locale={Locale}
        pagination={false}
        rowKey={(record) => record.team}
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
        teamID={selectedTeamId}
      />
    </>
  );
}

export default AllTeamsTable;
