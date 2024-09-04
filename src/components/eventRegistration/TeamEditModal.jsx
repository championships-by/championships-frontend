import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, Form, Modal, message } from "antd";
import TeamNameInput from "@modules/team/TeamNameInput";
import TeamParticipantsInput from "@modules/team/TeamParticipantsInput";
import { participantApi } from "@api";
import { teamApi } from "../../api";

function TeamEditModal({ isOpen, onOk, onCancel, teamID, teamName }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [dataTeamParticipants, setTeamParticipants] = useState([]);
  const { eventID } = useParams();

  const onFinish = () => {
    if (form.getFieldValue("teamName") == teamName) {
      message.success("Данные сохранены успешно!");
      onOk();
    } else {
      onSubmit();
    }
  };

  const onFinishFailed = () => {
    message.error("Проверьте поля для ввода!");
    setIsLoading(false);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const body = {
        id: teamID,
        new_name: form.getFieldValue("teamName"),
      };

      await teamApi.updateTeam(body);

      message.success("Данные сохранены успешно!");
      form.resetFields();
      onOk();
    } catch (error) {
      message.error("Произошла ошибка! Попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({ ["teamName"]: teamName });
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

  const create_team_request = async () => {
    const body = JSON.stringify({
      name: form.getFieldValue("teamName"),
    });

    teamApi.setTeams(body);
  };

  return (
    <Modal
      title="Редактирование команды"
      className="event-registration__team-edit-modal"
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
          disabled={true}
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

export default TeamEditModal;
