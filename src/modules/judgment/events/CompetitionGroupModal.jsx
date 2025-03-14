import React, { useState, useEffect } from "react";
import {
  Modal,
  Slider,
  InputNumber,
  Typography,
  Space,
  Button,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@constants";
import { competenciesApi } from "@api";
import { useTranslation } from "react-i18next";

function CompetitionGroupModal({ isOpen, onCancel, onOk, name, nominationID }) {
  const { t } = useTranslation();
  const [groupCount, setGroupCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const { eventID } = useParams();
  const navigate = useNavigate();

  const eventId = parseInt(eventID, 10);
  const onChange = (value) => {
    setGroupCount(value);
  };
  const startCompetition = async () => {
    setIsLoading(true);
    const data = {
      nomination_event: {
        event_id: eventId,
        nomination_id: nominationID,
        type: "group",
      },
      group_count: groupCount,
    };

    try {
      await competenciesApi.startGroupStage(data);
      message.success(t("MESSAGES.SUCCESS_TOURNAMENT_START"));
      navigate(ROUTES.JUDGMENT_GROUP_STAGE.PATH(eventID, nominationID));
    } catch (error) {
      console.error("Ошибка при старте соревнования:", error);
      message.error(t("MESSAGES.ERROR_TOURNAMENT_START"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={onCancel}
        onOk={onOk}
        title={name}
        footer={null}
        className="events__competitionModal__play-off__modal"
      >
        <Typography.Text>
          {t("TOURNAMENTS.SET_COUNT_OF_GROUPS")}
        </Typography.Text>
        <Space>
          <Slider
            max={10}
            min={1}
            value={typeof groupCount === "number" ? groupCount : 1}
            onChange={onChange}
            className="events__competitionModal__play-off__slider"
          />
          <InputNumber
            min={1}
            max={10}
            value={groupCount}
            onChange={onChange}
          />
        </Space>
        <Button
          type="primary"
          className="events__competitionModal__play-off__OkButton"
          onClick={() => {
            startCompetition(eventId, nominationID, groupCount);
          }}
          loading={isLoading}
        >
          {t("EVENTS.START_TOURNAMENT")}
        </Button>
        <Button
          onClick={onCancel}
          className="events__competitionModal__play-off__cancelButton"
        >
          {t("COMMON.CANCEL")}
        </Button>
      </Modal>
    </div>
  );
}

export default CompetitionGroupModal;
