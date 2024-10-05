import { participantApi } from "@api";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import Loader from "@components/loader/Loader";
import { ModalType } from "@constants";
import { Button, Flex, Typography, message, Row, Col, Divider } from "antd";
import { useEffect, useState } from "react";
import ParticipantModal from "./ParticipantModal";
import ParticipantsTable from "./ParticipantsTable";
import SearchInput from "@modules/search/SearchInput";

import "./sass/participants.scss";

function Participants() {
  const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataParticipants, setParticipants] = useState([]);

  const getParticipant = (value) => {
    if (value) {
    } else {
      try {
        participantApi.getParticipant().then((data) => setParticipants(data));
      } catch {}
    }
    setIsLoading(false);
  };

  const onOk = () => {
    setIsAddParticipantModalOpen(false);

    getParticipant();
  };

  const onCancel = () => {
    setIsAddParticipantModalOpen(false);
  };

  useEffect(() => {
    if (isLoading) {
      getParticipant();
    }
  }, [isLoading]);

  return (
    <>
      <Loader show={isLoading} />
      <Row align="bottom">
        <Col span={14}>
          <Typography.Title level={2}>Управление участниками</Typography.Title>
        </Col>
        <Col flex="auto">
          <Flex justify="flex-end">
            <SearchInput onChange={getParticipant} />
            <AdminPanelControls>
              <Flex gap="small">
                {/*<Tooltip title="Сохранить список участников">
            <Button type="primary" icon={<DownloadOutlined />} />
          </Tooltip>*/}
                <Button
                  type="primary"
                  onClick={() => setIsAddParticipantModalOpen(true)}
                >
                  Добавить участника
                </Button>
              </Flex>
            </AdminPanelControls>
          </Flex>
        </Col>
      </Row>
      <Divider />
      <ParticipantsTable
        ParticipantData={dataParticipants}
        getParticipant={getParticipant}
      />

      <ParticipantModal
        type={ModalType.ADD}
        isOpen={isAddParticipantModalOpen}
        onOk={onOk}
        onCancel={onCancel}
      />
    </>
  );
}
export default Participants;
