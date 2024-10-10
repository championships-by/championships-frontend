import { participantApi } from "@api";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import Loader from "@components/loader/Loader";
import { ModalType } from "@constants";
import { Button, Flex, Typography, message, Row, Col, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getParticipant, getParticipantByName, getParticipantsSelector } from "@store/participants";
import { useEffect, useState } from "react";
import ParticipantModal from "./ParticipantModal";
import ParticipantsTable from "./ParticipantsTable";
import SearchInput from "@modules/search/SearchInput";

import "./sass/participants.scss";

function Participants() {
  const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] =
    useState(false);
  const dispatch = useDispatch();
  const participants = useSelector(getParticipantsSelector);
  const { isLoading } = participants;

  useEffect(() => {
    dispatch(getParticipant());
  }, [dispatch]);

  const findParticipant = (value) => {
    if (value) {
      const params = {
        name: value,
      };
      dispatch(getParticipantByName(params));
    } else {
      dispatch(getParticipant());
    }
  };

  const onOk = () => {
    setIsAddParticipantModalOpen(false);

    findParticipant();
  };

  const onCancel = () => {
    setIsAddParticipantModalOpen(false);
  };

  return (
    <>
      <Loader show={isLoading} />
      <Row align="bottom">
        <Col span={14}>
          <Typography.Title level={2}>Управление участниками</Typography.Title>
        </Col>
        <Col flex="auto">
          <Flex justify="flex-end">
            <SearchInput onChange={findParticipant} />
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
        ParticipantData={participants.data}
        getParticipant={findParticipant}
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
