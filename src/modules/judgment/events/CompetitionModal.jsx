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
import { competenciesApi, eventApi } from "@api";

function CompetitionModal({ isOpen, onCancel, onOk, name, nominationID }) {
  const [groupCount, setGroupCount] = useState(3);
  const { eventID } = useParams();
  const navigate = useNavigate();

  const eventId = parseInt(eventID, 10);
  const onChange = (value) => {
    setGroupCount(value);
  };
  const startCompetition = async () => {
    const data = {
      nomination_event: {
        event_id: eventId,
        nomination_id: nominationID,
      },
      group_count: groupCount,
    };
    try {
      await competenciesApi.startGroupStage(data);
      message.success("Соревнование успешно начато");
      navigate(ROUTES.JUDGMENT_GROUP_STAGE.PATH(eventID, nominationID));
    } catch (error) {
      message.error("Произошла ошибка");
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
        <Typography.Text>Укажите количество групп</Typography.Text>
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
        >
          Начать соревнование
        </Button>
        <Button className="events__competitionModal__play-off__cancelButton">
          Отмена
        </Button>
      </Modal>
    </div>
  );
}

export default CompetitionModal;
