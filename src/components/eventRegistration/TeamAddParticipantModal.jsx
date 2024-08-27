import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, Form, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TeamNameInput from "@modules/team/TeamNameInput";
import TeamNominationSelect from "@modules/team/TeamNominationSelect";
import TeamParticipantsInput from "@modules/team/TeamParticipantsInput";
import ParticipantEquipmentInput from "@modules/participant/ParticipantEquipmentInput";
import ParticipantSoftwareInput from "@modules/participant/ParticipantSoftwareInput";
import { participantApi, teamApi } from "@api";

import "./sass/event-registration.scss";

function TeamAddParticipantModal({ isOpen, onOk, onCancel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [dataTeamParticipants, setTeamParticipants] = useState([]);
  const { eventID } = useParams();

  const onFinish = () => {
    message.success("Всё в порядке!");
    setIsLoading(false);
  };

  const onFinishFailed = () => {
    message.error("Проверьте поля для ввода!");
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      participantApi
        .getParticipant()
        .then((data) =>
          setTeamParticipants(
            data.map((participant) => ({
              value: participant.email,
              label: `${participant.first_name} ${participant.second_name} ${participant.third_name}`,
            }))
          )
        )
        .catch(() =>
          message.error(
            "Невозможно получить данные. Обратитесь к администратору"
          )
        )
        .finally(() => setTimeout(() => setIsLoading(false), 300));
    }
  }, [isOpen, eventID]);

  return (
    <Modal
      title="Добавление участников в компетенцию"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={[]}
    >
      <Form
        form={form}
        layout="vertical"
        variant="filled"
        requiredMark="Default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <TeamNominationSelect name="nomination" />
        <TeamParticipantsInput name="participant" mode="single" />
        <ParticipantEquipmentInput name="equipment" />
        <ParticipantSoftwareInput name="software" />
        <Button
          className="event-registration__add-participant__add-button"
          type="dashed"
          onClick={() => add()}
          block
          icon={<PlusOutlined />}
        >
          Добавить участника
        </Button>
        <Flex gap="middle">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            onClick={() => {
              setIsLoading(true);
              create_team_request();
              onOk;
            }}
          >
            Сохранить
          </Button>
          <Button onClick={onCancel}>Отмена</Button>
        </Flex>
      </Form>
    </Modal>
  );
}

export default TeamAddParticipantModal;
