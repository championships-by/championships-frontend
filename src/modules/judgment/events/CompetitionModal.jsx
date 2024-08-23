import React, { useState } from "react";
import { Modal, Slider, InputNumber, Typography, Space, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@constants";

function CompetitionModal({ isOpen, onCancel, onOk, name, nominationID }) {
  const [groupCount, setGroupCount] = useState(1);
  const { eventID } = useParams();
  const navigate = useNavigate();

  const onChange = (value) => {
    setGroupCount(value);
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
          onClick={() =>
            navigate(ROUTES.JUDGMENT_GROUP_STAGE.PATH(eventID, nominationID))
          }
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
