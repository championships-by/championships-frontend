import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Typography, Row, Col, Divider } from "antd";
import { useTranslation } from "react-i18next";

import {
  getParticipant,
  getParticipantByName,
  getParticipantsSelector,
} from "@store/participants";
import ParticipantsTable from "./ParticipantsTable";
import SearchInput from "@modules/search/SearchInput";
import Loader from "@components/loader/Loader";
import ParticipantModal from "./ParticipantModal";
import ParticipantExcelModal from "@modules/participant/ParticipantExcelModal";
import ParticipantsGlobalSearchModal from "./ParticipantsGlobalSearchModal";
import ParticipantAddOptionsModal from "./ParticipantAddOptionsModal"; // Модальное окно выбора способа добавления

import "./sass/participants.scss";

function Participants() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const participants = useSelector(getParticipantsSelector);
  const { isLoading } = participants;

  const [isGlobalSearchModalOpen, setIsGlobalSearchModalOpen] = useState(false);
  const [isParticipantOptionsOpen, setIsParticipantOptionsOpen] =
    useState(false);
  const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] =
    useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getParticipant());
  }, [dispatch]);

  const findParticipant = (value) => {
    dispatch(value ? getParticipantByName({ name: value }) : getParticipant());
  };

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
            <Button
              type="primary"
              onClick={() => setIsParticipantOptionsOpen(true)}
            >
              {t("PARTICIPANTS.CREATE_PARTICIPANT")}
            </Button>
            <Button
              type="primary"
              onClick={() => setIsGlobalSearchModalOpen(true)}
            >
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

      <ParticipantAddOptionsModal
        isOpen={isParticipantOptionsOpen}
        onClose={() => setIsParticipantOptionsOpen(false)}
        onOpenSingle={() => {
          setIsAddParticipantModalOpen(true);
          setIsParticipantOptionsOpen(false);
        }}
        onOpenExcel={() => {
          setIsExcelModalOpen(true);
          setIsParticipantOptionsOpen(false);
        }}
      />

      <ParticipantModal
        isOpen={isAddParticipantModalOpen}
        onOk={() => setIsAddParticipantModalOpen(false)}
        onCancel={() => setIsAddParticipantModalOpen(false)}
      />

      <ParticipantExcelModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
      />

      <ParticipantsGlobalSearchModal
        isOpen={isGlobalSearchModalOpen}
        onClose={() => setIsGlobalSearchModalOpen(false)}
      />
    </>
  );
}

export default Participants;
