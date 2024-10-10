import React, { useState, useEffect } from "react";
import { Modal, Table, Button } from "antd";
import { Locale } from "@constants";

import "./sass/events.scss";

const columns = [
  {
    title: "Команда",
    dataIndex: "team_name",
    key: "team_name",
    sorter: (a, b) => a.team_name.localeCompare(b.team_name),
  },
  {
    title: "Участник",
    dataIndex: "fullName",
    key: "fullName",
    sorter: (a, b) => a.fullName.localeCompare(b.fullName),
  },
  {
    title: "Учреждение образования",
    dataIndex: "educational_institution",
    key: "educational_institution",
  },
  {
    title: "Учреждение дополнительного образования",
    dataIndex: "additional_educational_institution",
    key: "additional_educational_institution",
  },
  {
    title: "Оборудование",
    dataIndex: "equipments",
    key: "equipments",
  },
  {
    title: "Программное обеспечение",
    dataIndex: "softwares",
    key: "softwares",
  },
  {
    title: "ФИО педагога",
    dataIndex: "teacher",
    key: "teacher",
  },
];

function ParticipantModal({ isOpen, onOk, onCancel, name, data }) {
  const [participantsInfo, setParticipantsInfo] = useState([]);

  useEffect(() => {
    if (data && isOpen) {
      const participants = data
        .map((item) => {
          return (
            item.team.participants?.map((participantItem) => {
              return {
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
          locale={Locale}
        />
      </Modal>
    </div>
  );
}

export default ParticipantModal;
