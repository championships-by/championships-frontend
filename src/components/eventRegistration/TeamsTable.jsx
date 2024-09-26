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

  const openParticipantModal = (teamId) => {
    setSelectedTeamId(teamId);
    setIsParticipantModalOpen(true);
  };

  const changeParticipantData = () => {
    setIsParticipantModalOpen(false);
  };

  const transformedData = [];

  TeamsData.forEach((teamData) => {
    teamData.team_participants.forEach((participant) => {
      const teamName = participant.team.name.name;
      const teamId = participant.team.name.id;

      participant.team.participants.forEach((teamParticipant) => {
        transformedData.push({
          nomination_name: teamData.nomination_name,
          team_name: teamName,
          participant_name: `${teamParticipant.participant_data.first_name} ${teamParticipant.participant_data.third_name} ${teamParticipant.participant_data.second_name}`,
          team_id: teamId,
        });
      });
    });
  });

  transformedData.sort((a, b) => {
    if (a.team_name < b.team_name) return -1;
    if (a.team_name > b.team_name) return 1;
    if (a.nomination_name < b.nomination_name) return -1;
    if (a.nomination_name > b.nomination_name) return 1;
    return 0;
  });

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

  const columns = [
    {
      title: "Команда",
      key: "team",
      dataIndex: "team_name",
      width: "20%",
      onCell: (record, rowIndex) => {
        const rowSpan = getRowSpan(transformedData, rowIndex, "team_name");
        return rowIndex === 0 ||
          transformedData[rowIndex - 1].team_name !== record.team_name
          ? { rowSpan }
          : { rowSpan: 0 };
      },
    },
    {
      title: "Компетенция",
      key: "nomination",
      dataIndex: "nomination_name",
      width: "20%",
    },
    {
      title: "Участник",
      key: "participant_name",
      dataIndex: "participant_name",
      width: "20%",
    },
    {
      title: "Действия",
      key: "action",
      width: "10%",
      onCell: (record, rowIndex) => {
        const rowSpan = getRowSpan(transformedData, rowIndex, "team_name");
        return rowIndex === 0 ||
          transformedData[rowIndex - 1].team_name !== record.team_name
          ? { rowSpan }
          : { rowSpan: 0 };
      },
      render: (record) => (
        <Flex>
          <Tooltip title="Редактировать">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal(record.team_id, record.team_name)}
            />
          </Tooltip>
          <Tooltip title="Добавить">
            <Button
              type="text"
              icon={<UsergroupAddOutlined />}
              onClick={() => openParticipantModal(record.team_id)}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={transformedData}
        columns={columns}
        bordered
        locale={Locale}
        pagination={false}
        rowKey={(record) => record.participant_name}
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

export default TeamsTable;
