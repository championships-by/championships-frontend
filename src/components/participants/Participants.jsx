import { Button, Flex, Typography, Tooltip } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import Loader from "@components/loader/Loader";
import { participantApi } from "@api";
import ParticipantModal from "./ParticipantModal";
import ParticipantsTable from "./ParticipantsTable";

import "./sass/participants.scss";

function Participants() {
  const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataParticipants, setParticipants] = useState([]);
  if (isLoading) {
    participantApi
      .getParticipant()
      .then((data) => setParticipants(data))
      .catch(() =>
        message.error("Невозможно получить данные. Обратитесь к администратору")
      )
      .finally(() => setTimeout(() => setIsLoading(false), 300));
  }

  return (
    <>
      <Loader show={isLoading} />
      <Typography.Title level={2}>Управление участниками</Typography.Title>

      <AdminPanelControls>
        <Flex gap="small">
          <Tooltip title="Сохранить список участников">
            <Button type="primary" icon={<DownloadOutlined />} />
          </Tooltip>
          <Button
            type="primary"
            onClick={() => setIsAddParticipantModalOpen(true)}
          >
            Добавить участника
          </Button>
        </Flex>
      </AdminPanelControls>

      <ParticipantsTable ParticipantData={dataParticipants} />

      <ParticipantModal
        isOpen={isAddParticipantModalOpen}
        onOk={() => setIsAddParticipantModalOpen(false)}
        onCancel={() => setIsAddParticipantModalOpen(false)}
      />
    </>
  );
}
export default Participants;
