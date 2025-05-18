import { Table, Flex, Button, Tooltip, message } from "antd";
import { useMemo, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TeamAddParticipantModal from "@/components/eventRegistration/TeamAddParticipantModal";
import TeamEditParticipantModal from "@/components/eventRegistration/TeamEditParticipantModal";
import TeamDeleteParticipantModal from "@/components/eventRegistration/TeamDeleteParticipantModal";
import { tableLocale } from "@/const";
import { getTranslation } from "@/utils";
import { useTranslation } from "react-i18next";
import { competenciesApi, participantApi } from "@/api";
import { useParams } from "react-router-dom";

const transformTeamsData = (teamsData) => {
  const transformedData = [];

  teamsData.forEach((teamData) => {
    teamData.team_participants.forEach((participant) => {
      const teamName = participant.team.name;
      const teamId = participant.team.id;

      participant.team.participants.forEach((teamParticipant) => {
        const additionalData = teamParticipant.participant_additional_data;
        const supervisorData = additionalData.supervisor_data;

        transformedData.push({
          nomination_name: teamData.nomination_name,
          team_name: teamName,
          participant_name: `${teamParticipant.participant_data.second_name} ${teamParticipant.participant_data.first_name} ${teamParticipant.participant_data.third_name}`,
          team_id: teamId,
          nomination_id: teamParticipant.participant_data.nomination_id,
          participant_id: teamParticipant.participant_data.id,

          supervisor_data: supervisorData,
          additional_data: additionalData,
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

function TeamsTable({ teamsData, onTeamsChange }) {
  const { t } = useTranslation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState();
  const [selectedTeamName, setSelectedTeamName] = useState();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState();
  const { eventID } = useParams();

  const [editData, setEditData] = useState();

  const deleteParticipant = (record) => {
    const params = {
      event_id: eventID,
      nomination_id: record.nomination_id,
    };

    competenciesApi.getNominationEventInfo(params).then((res) => {
      let nominationType = res.type;
      const body = {
        team_participant: {
          team_id: record.team_id,
          participant_id: record.participant_id,
        },
        nomination_event: {
          event_id: eventID,
          nomination_id: record.nomination_id,
          type: nominationType,
        },
      };
      participantApi
        .deleteTeamParticipantFromNominationEvent(body)
        .then(() => {
          message.success(t("MESSAGES.DELETE_SUCCESS"));
          onTeamsChange();
        })
        .catch((error) => {
          message.error(t("MESSAGES.DELETE_ERROR"));
        })
        .finally(() => {
          setSelectedRecord(null);
        });
    });
  };

  const openDeleteModal = (record) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const onDeleteModalNo = () => {
    setIsDeleteModalOpen(false);
  };

  const onDeleteModalYes = () => {
    deleteParticipant(selectedRecord);
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (record) => {
    setSelectedRecord(record);
    setSelectedTeamId(record.team_id);
    setIsEditModalOpen(true);
  };

  const onEditModalSuccess = () => {
    setIsEditModalOpen(false);
    setSelectedRecord(null);
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
      render: (record) => (
        <Flex>
          <Tooltip title={t("COMMON.EDIT")}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal(record)}
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
        dataSource={transformedData}
        columns={columns}
        bordered
        locale={getTranslation(tableLocale, t)}
        pagination={false}
        rowKey={(record) =>
          `${record.team_id}-${record.participant_id}-${record.nomination_id}`
        }
      />

      <TeamEditParticipantModal
        isOpen={isEditModalOpen}
        onOk={onEditModalSuccess}
        onCancel={() => setIsEditModalOpen(false)}
        record={selectedRecord}
        teamID={selectedTeamId}
      />

      <TeamAddParticipantModal
        isOpen={isParticipantModalOpen}
        onOk={() => changeParticipantData()}
        onCancel={() => setIsParticipantModalOpen(false)}
        teamID={selectedTeamId}
      />
      <TeamDeleteParticipantModal
        isOpen={isDeleteModalOpen}
        onOk={onDeleteModalYes}
        onCancel={onDeleteModalNo}
      />
    </>
  );
}

export default TeamsTable;
