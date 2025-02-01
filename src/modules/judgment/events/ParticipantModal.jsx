import React, { useState, useEffect } from "react";
import { Modal, Table, Button, Flex, Tooltip, message } from "antd";
import { tableLocale } from "@constants";
import { getTranslation } from "@utils";
import { useTranslation } from "react-i18next";
import { DeleteOutlined } from "@ant-design/icons";
import TeamDeleteParticipantModal from "@components/eventRegistration/TeamDeleteParticipantModal";
import { participantApi } from "@api";

import "./sass/events.scss";

function ParticipantModal({ isOpen, onOk, onCancel, name, data }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { t } = useTranslation();

  const deleteParticipant = () => {
    participantApi
      .deleteTeamParticipant(
        selectedRecord.deletion_info.team_id,
        selectedRecord.deletion_info.participant_id,
        selectedRecord.deletion_info.event_id,
        selectedRecord.deletion_info.nomination_id,
        selectedRecord.deletion_info.nomination_type
      )
      .then(() => {
        message.success(t("MESSAGES.DELETE_SUCCESS"));
        setParticipantsInfo((prevInfo) =>
          prevInfo.filter(
            (participant) =>
              participant.participant_id !==
              selectedRecord.deletion_info.participant_id
          )
        );
      })
      .catch((error) => {
        message.error(t("MESSAGES.DELETE_ERROR"));
      });
    setSelectedRecord(null);
  };

  const openDeleteModal = (record) => {
    setIsDeleteModalOpen(true);
    setSelectedRecord(record);
  };

  const onDeleteModalYes = () => {
    deleteParticipant();
  };

  const columns = [
    {
      title: t("COMMON.TEAM"),
      dataIndex: "team_name",
      key: "team_name",
      sorter: (a, b) => a.team_name.localeCompare(b.team_name),
    },
    {
      title: t("COMMON.PARTICIPANT"),
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: t("COMMON.EDUCATIONAL_INSTITUTION"),
      dataIndex: "educational_institution",
      key: "educational_institution",
    },
    {
      title: t("COMMON.ADDITIONAL_EDUCATIONAL_INSTITUTION"),
      dataIndex: "additional_educational_institution",
      key: "additional_educational_institution",
    },
    {
      title: t("TOURNAMENTS.EQUIPMENT"),
      dataIndex: "equipments",
      key: "equipments",
    },
    {
      title: t("TOURNAMENTS.SOFTWARE"),
      dataIndex: "softwares",
      key: "softwares",
    },
    {
      title: t("COMMON.FULL_NAME_OF_TEACHER"),
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: t("COMMON.ACTIONS"),
      key: "action",
      width: "10%",
      render: (record) => (
        <Flex>
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

  const [participantsInfo, setParticipantsInfo] = useState([]);

  useEffect(() => {
    if (data && isOpen) {
      const participants = data
        .map((item) => {
          return (
            item.team.participants?.map((participantItem) => {
              return {
                participant_id: participantItem.participant_data.id,
                team_name: item.team.name,
                fullName:
                  participantItem.participant_data.second_name +
                  " " +
                  participantItem.participant_data.first_name +
                  " " +
                  participantItem.participant_data.third_name,
                educational_institution:
                  participantItem.participant_additional_data
                    .educational_institution.educational_institution,
                additional_educational_institution:
                  participantItem.participant_additional_data
                    .educational_institution.additional_educational_institution,
                equipments:
                  participantItem.participant_additional_data.equipments
                    .map((equipment) => equipment.equipment)
                    .join("\n"),
                softwares: participantItem.participant_additional_data.softwares
                  .map((software) => software.software)
                  .join("\n"),
                teacher:
                  participantItem.participant_additional_data.supervisor_data
                    .supervisor_second_name +
                  " " +
                  participantItem.participant_additional_data.supervisor_data
                    .supervisor_first_name +
                  " " +
                  participantItem.participant_additional_data.supervisor_data
                    .supervisor_third_name,
                deletion_info: {
                  team_id: item.team.id,
                  participant_id: participantItem.participant_data.id,
                  event_id: item.event_id,
                  nomination_id: item.nomination_id,
                  nomination_type: item.competition_type,
                },
              };
            }) || []
          );
        })
        .flat();

      setParticipantsInfo(participants);
    }
  }, [data]);

  return (
    <div>
      <Modal
        title={name}
        open={isOpen}
        onOk={onOk}
        onCancel={onCancel}
        footer={null}
        className="events__participantModal__modal"
        width={1200}
      >
        <Table
          columns={columns}
          dataSource={participantsInfo}
          pagination={false}
          locale={getTranslation(tableLocale, t)}
        />
      </Modal>
      <TeamDeleteParticipantModal
        isOpen={isDeleteModalOpen}
        onOk={onDeleteModalYes}
        onCancel={() => setIsDeleteModalOpen(false)}
      ></TeamDeleteParticipantModal>
    </div>
  );
}

export default ParticipantModal;
