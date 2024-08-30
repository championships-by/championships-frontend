import React, { useState, useEffect } from "react";
import { Modal, Table, Button } from "antd";
import { Locale } from "@constants";

import "./sass/events.scss";

const columns = [
  {
    title: "ФИО",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Учреждение образования",
    dataIndex: "educational_institution",
    key: "educational_institution",
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
];

function ParticipantModal({ isOpen, onOk, onCancel, name, data }) {
  const [participantsInfo, setParticipantsInfo] = useState([]);

  useEffect(() => {
    if (data) {
      const participants = data.reduce((acc, item) => {
        const participantsArray =
          item.team.participants?.map((participantItem) => {
            return {
              fullName:
                participantItem.participant_data.first_name +
                " " +
                participantItem.participant_data.second_name +
                " " +
                participantItem.participant_data.third_name,
              educational_institution:
                participantItem.participant_additional_data
                  .educational_institution.educational_institution,
              equipments:
                participantItem.participant_additional_data.equipments,
              softwares: participantItem.participant_additional_data.softwares,
            };
          }) || [];

        return [...acc, ...participantsArray];
      }, []);

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
      >
        <Table
          columns={columns}
          dataSource={participantsInfo}
          pagination={false}
          locale={Locale}
        />
        <Button
          type="primary"
          className="events__participantModal__printButton"
        >
          Отправить на печать
        </Button>
        <Button className="events__participantModal__downloadButton">
          Скачать
        </Button>
      </Modal>
    </div>
  );
}

export default ParticipantModal;
