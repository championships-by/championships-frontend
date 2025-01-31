import { Table, Flex, Button, Tooltip, message } from "antd";
import { useMemo, useState } from "react";
import {
  DeleteColumnOutlined,
  DeleteOutlined,
  EditOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import TeamEditModal from "@components/eventRegistration/TeamEditModal";
import TeamAddParticipantModal from "./TeamAddParticipantModal";
import { tableLocale } from "@constants";
import { getTranslation } from "@utils";
import { useTranslation } from "react-i18next";
import TeamDeleteParticipantModal from "./TeamDeleteParticipantModal";
import { participantApi } from "../../api";
import { set } from "lodash";
import { useParams } from "react-router-dom";

const transformTeamsData = (teamsData) => {
  const transformedData = [];

  teamsData.forEach((teamData) => {
    teamData.team_participants.forEach((participant) => {
      const teamName = participant.team.name;
      const teamId = participant.team.id;

      participant.team.participants.forEach((teamParticipant) => {
        transformedData.push({
          nomination_name: teamData.nomination_name,
          team_name: teamName,
          participant_name: `${teamParticipant.participant_data.first_name} ${teamParticipant.participant_data.third_name} ${teamParticipant.participant_data.second_name}`,
          team_id: teamId,
          nomination_id: teamsData[0].nomination_id,
          participant_id: teamParticipant.participant_data.id,
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
  return transformedData;
};

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

function TeamsTable({ teamsData, onTeamsChange}) {
  const { t } = useTranslation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState();
  const [selectedTeamName, setSelectedTeamName] = useState();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState();
  const {eventID} = useParams()

  const deleteParticipant = (record) => {
    participantApi
      .deleteTeamParticipant(record.team_id, record.participant_id, eventID, record.nomination_id, "time")
      .then(() => {
        message.success(t("MESSAGES.DELETE_SUCCESS"));
        onTeamsChange();
      })
      .catch((error) => {
        message.error(t("MESSAGES.DELETE_ERROR"));
      })
      .finally(() => {
        setRecordToDelete(null)});
  };

  const openDeleteModal = (record) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const onDeleteModalNo = () => {
    setIsDeleteModalOpen(false);
  };

  const onDeleteModalYes = () => {
    deleteParticipant(recordToDelete);
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (id, name) => {
    setSelectedTeamId(id);
    setSelectedTeamName(name);
    setIsEditModalOpen(true);
  };

  const changeTeamData = () => {
    setIsEditModalOpen(false);
    onTeamsChange();
  };

  const changeParticipantData = () => {
    setIsParticipantModalOpen(false);
    onTeamsChange();
  };

  const transformedData = useMemo(
    () => transformTeamsData(teamsData),
    [teamsData]
  );

  const columns = [
    {
      title: t("COMMON.TEAM"),
      key: "team",
      dataIndex: "team_name",
      width: "20%",
      onCell: (record, rowIndex) => {
        const rowSpan = getRowSpan(transformedData, rowIndex, "team_name");
        return {
          rowSpan:
            rowIndex === 0 ||
            transformedData[rowIndex - 1].team_name !== record.team_name
              ? rowSpan
              : 0,
        };
      },
    },
    {
      title: t("COMMON.PARTICIPANT"),
      key: "participant_name",
      dataIndex: "participant_name",
      width: "20%",
    },
    {
      title: t("COMMON.NOMINATION"),
      key: "nomination",
      dataIndex: "nomination_name",
      width: "20%",
    },
    {
      title: t("COMMON.ACTIONS"),
      key: "action",
      width: "10%",
      onCell: (record, rowIndex) => {
        const rowSpan = getRowSpan(transformedData, rowIndex, "team_name");
        return {
          rowSpan:
            rowIndex === 0 ||
            transformedData[rowIndex - 1].team_name !== record.team_name
              ? rowSpan
              : 0,
        };
      },
      render: (record) => (
        <Flex>
          {/* <Tooltip title={t("COMMON.EDIT")}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal(record.team_id, record.team_name)}
            />
          </Tooltip> */}
          <Tooltip title={t("COMMON.DELETE")}>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() =>
                openDeleteModal(record)
              }
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
        locale={getTranslation(tableLocale, t)}
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
      <TeamDeleteParticipantModal
        isOpen={isDeleteModalOpen}
        onOk={() => onDeleteModalYes()}
        onCancel={() => onDeleteModalNo()}
      ></TeamDeleteParticipantModal>
    </>
  );
}

export default TeamsTable;
