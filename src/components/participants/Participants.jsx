import { participantApi } from "@api";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import ParticipantExcelModal from "@modules/participant/ParticipantExcelModal";
import Loader from "@components/loader/Loader";
import { ModalType } from "@constants";
import { Button, Flex, Typography, Row, Col, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getParticipant,
  getParticipantByName,
  getParticipantsSelector,
} from "@store/participants";
import { useEffect, useState } from "react";
import ParticipantModal from "./ParticipantModal";
import ParticipantsTable from "./ParticipantsTable";
import SearchInput from "@modules/search/SearchInput";
import { useTranslation } from "react-i18next";
import ParticipantsGlobalSearchModal from "./ParticipantsGlobalSearchModal";

import "./sass/participants.scss";

function Participants() {
  const { t } = useTranslation();
  const [isGlobalSearchModalOpen, setIsGlobalSearchModalOpen] = useState(false);
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

  const onClickGlobalSearchModal = () => {
    setIsGlobalSearchModalOpen(true);
  };

  const onCloseGlobalSearchModal = () => {
    setIsGlobalSearchModalOpen(false);
  };

  const onOk = () => {
    setIsAddParticipantModalOpen(false);
    findParticipant();
  };

  const onCancel = () => {
    setIsAddParticipantModalOpen(false);
  };
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);

  return (
    <>
      <Loader show={isLoading} />
      <Row align="middle" justify="space-between">
        <Col>
          <Typography.Title level={2}>
            {t("COMMON.PARTICIPANT_MANAGEMENT")}
          </Typography.Title>
        </Col>
        <Col>
          <Flex gap="middle" align="center">
            <SearchInput onChange={findParticipant} />
            <Button type="primary" onClick={() => setIsExcelModalOpen(true)}>
              {t("COMMON.PARTICIPANT_EXCEL")}
            </Button>
            <Button
              type="primary"
              onClick={() => setIsAddParticipantModalOpen(true)}
            >
              {t("PARTICIPANTS.CREATE_PARTICIPANT")}
            </Button>

            <Button type="primary" onClick={onClickGlobalSearchModal}>
              {t("COMMON.SYSTEM_WIDE_SEARCH")}
            </Button>
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
      <ParticipantsGlobalSearchModal
        isOpen={isGlobalSearchModalOpen}
        onClose={onCloseGlobalSearchModal}
      />
      <ParticipantExcelModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
      />
    </>
  );
}

export default Participants;
