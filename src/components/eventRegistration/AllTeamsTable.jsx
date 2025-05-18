import { Table, Flex, Button, Tooltip, List, Typography, message } from "antd";
import { useState } from "react";
import {
  EditOutlined,
  UsergroupAddOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import TeamDeleteModal from "@/components/eventRegistration/TeamDeleteModal";
import TeamEditModal from "@/components/eventRegistration/TeamEditModal";
import TeamAddParticipantModal from "@/components/eventRegistration/TeamAddParticipantModal";
import { tableLocale } from "@/const";
import { getTranslation } from "@/utils";
import { useTranslation } from "react-i18next";
import { teamApi } from "@/api";

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

function AllTeamsTable({ teamsData, onTeamsChange }) {
  const { t } = useTranslation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState();
  const [selectedTeamName, setSelectedTeamName] = useState();

  const openEditModal = (id, name) => {
    setSelectedTeamId(id);
    setSelectedTeamName(name);
    setIsEditModalOpen(true);
  };

  const changeTeamData = () => {
    setIsEditModalOpen(false);
    onTeamsChange();
  };

  const openParticipantModal = (record) => {
    setSelectedTeamId(record.id);
    setSelectedTeamName(record.name);
    setIsParticipantModalOpen(true);
  };

  const openDeleteModal = (record) => {
    setSelectedTeamId(record.id);
    setSelectedTeamName(record.name);
    setIsDeletionModalOpen(true);
  };

  const changeParticipantData = () => {
    setIsParticipantModalOpen(false);
    onTeamsChange();
  };

  const deleteTeam = async () => {
    try {
      const params = {
        team_id: selectedTeamId,
      };
      await teamApi.deleteTeam(params);
      message.success(t("MESSAGES.SUCCESS_DELETE_TEAM"));
    } catch {
    } finally {
      setIsDeletionModalOpen(false);
      onTeamsChange();
    }
  };

  const columns = [
    {
      title: t("COMMON.TEAM"),
      key: "team",
      width: "20%",
      dataIndex: "name",
      onCell: (record, rowIndex) => {
        const rowSpan = getRowSpan(teamsData, rowIndex, "name");
        return {
          rowSpan:
            rowIndex === 0 || teamsData[rowIndex - 1].name !== record.name
              ? rowSpan
              : 0,
        };
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t("COMMON.PARTICIPANT"),
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
                {participant.second_name} {participant.first_name}{" "}
                {participant.third_name}
              </Typography.Text>
            </List.Item>
          )}
        />
      ),
    },
    {
      title: t("COMMON.ACTIONS"),
      key: "action",
      width: "10%",
      onCell: (record, rowIndex) => {
        const rowSpan = getRowSpan(teamsData, rowIndex, "name");
        return {
          rowSpan:
            rowIndex === 0 || teamsData[rowIndex - 1].name !== record.name
              ? rowSpan
              : 0,
        };
      },
      render: (record) => (
        <Flex>
          <Tooltip title={t("COMMON.ADD")}>
            <Button
              type="text"
              icon={<UsergroupAddOutlined />}
              onClick={() => openParticipantModal(record)}
            />
          </Tooltip>
          <Tooltip title={t("COMMON.EDIT")}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal(record.id, record.name)}
            />
          </Tooltip>
          <Tooltip title={t("COMMON.DELETE")}>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => openDeleteModal(record)}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={teamsData}
        columns={columns}
        bordered
        locale={getTranslation(tableLocale, t)}
        pagination={false}
        rowKey={(record) => record.team}
      />

      <TeamEditModal
        isOpen={isEditModalOpen}
        onOk={changeTeamData}
        onCancel={() => setIsEditModalOpen(false)}
        teamID={selectedTeamId}
        teamName={selectedTeamName}
      />
      <TeamAddParticipantModal
        isOpen={isParticipantModalOpen}
        onOk={changeParticipantData}
        onCancel={() => setIsParticipantModalOpen(false)}
        teamID={selectedTeamId}
      />
      <TeamDeleteModal
        isOpen={isDeletionModalOpen}
        onOk={deleteTeam}
        onCancel={() => setIsDeletionModalOpen(false)}
        teamID={selectedTeamId}
      />
    </>
  );
}

export default AllTeamsTable;
