import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, Form, Modal, message } from "antd";
import TeamNameInput from "@modules/team/TeamNameInput";
import TeamParticipantsInput from "@modules/team/TeamParticipantsInput";
import { participantApi, teamApi } from "@api";

function TeamCreateModal({ isOpen, onOk, onCancel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [dataTeamParticipants, setTeamParticipants] = useState([]);
  const { eventID } = useParams();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const body = JSON.stringify({
        name: form.getFieldValue("teamName"),
        participants_ids: form.getFieldValue("teamParticipants"),
      });

      await teamApi.setTeams(body);

      message.success("Данные сохранены успешно!");
      form.resetFields();
      onOk();
    } catch (error) {
      message.error("Произошла ошибка! Попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = () => {
    onSubmit();
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
              value: participant.id,
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
      title="Создание команды"
      className="event-registration__team-create-modal"
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
        <TeamNameInput name="teamName" />
        <TeamParticipantsInput
          name="teamParticipants"
          options={dataTeamParticipants}
          mode="multiple"
        />
        <Flex gap="middle">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Сохранить
          </Button>
          <Button onClick={onCancel}>Отмена</Button>
        </Flex>
      </Form>
    </Modal>
  );
}

export default TeamCreateModal;
