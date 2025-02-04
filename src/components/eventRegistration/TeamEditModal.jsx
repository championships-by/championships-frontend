import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, Form, Modal, message } from "antd";
import TeamNameInput from "@modules/team/TeamNameInput";
import TeamParticipantsInput from "@modules/team/TeamParticipantsInput";
import { participantApi, teamApi } from "@api";
import { useTranslation } from "react-i18next";

function TeamEditModal({ isOpen, onOk, onCancel, teamID, teamName }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [dataTeamParticipants, setTeamParticipants] = useState([]);
  const { eventID } = useParams();
  const [initialParticipants, setInitialParticipants] = useState([]);

  const onFinish = async () => {
    setIsLoading(true);

    const participantsNames = form.getFieldValue("teamParticipants");
    const newTeamName = form.getFieldValue("teamName");

    const idsToDelete = initialParticipants
      .filter((participant) => !participantsNames.includes(participant.label))
      .map((participant) => participant.value);

    if (newTeamName !== teamName) {
      const body = {
        id: teamID,
        new_name: newTeamName,
      };
      teamApi
        .updateTeam(body)
        .then(() => {
          message.success(t("EVENTS.SUCCESS_EDIT_TEAM_NAME"));
        })
        .catch(() => {
          message.error(t("ERRORS.ERROR_EDIT_TEAM_NAME"));
        });
    }

    if (idsToDelete.length > 0) {
      const body = {
        team_id: teamID,
        participants_ids: idsToDelete,
      };
      participantApi
        .deleteTeamParticipant(body)
        .then(() => {
          message.success(t("MESSAGES.SUCCESS_EDIT_TEAM_PARTICIPANTS"));
        })
        .catch(() => {
          message.error(t("ERRORS.ERROR_EDIT_TEAM_PARTICIPANTS"));
        });
    }
    setIsLoading(false);
    onOk();
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      const params = new URLSearchParams();
      params.append("team_id", teamID);
      teamApi
        .getTeamById(params.toString())
        .then((data) => {
          data.map((team) => {
            const initialParticipants = team.participants.map(
              (participant) => ({
                value: participant.id,
                label: `${participant.second_name} ${participant.first_name} ${participant.third_name}`,
              })
            );
            setInitialParticipants(initialParticipants);

            const participants = team.participants.map(
              (participant) =>
                `${participant.second_name} ${participant.first_name} ${participant.third_name}`
            );
            form.setFieldsValue({
              ["teamName"]: team.name,
              ["teamParticipants"]: participants,
            });
          });
        })
        .finally(() => setTimeout(() => setIsLoading(false), 300));
    }
  }, [isOpen, eventID]);

  return (
    <Modal
      title={t("EVENTS.EDIT_TEAM")}
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
        />
        <Flex gap="middle">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {t("COMMON.SAVE")}
          </Button>
          <Button onClick={onCancel}>{t("COMMON.CANCEL")}</Button>
        </Flex>
      </Form>
    </Modal>
  );
}

export default TeamEditModal;
