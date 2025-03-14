import React, { useState, useEffect } from "react";
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
  const [initialParticipants, setInitialParticipants] = useState([]);

  const updateName = async () => {
    const newTeamName = form.getFieldValue("teamName");
    if (newTeamName !== teamName) {
      await teamApi.updateTeam({ id: teamID, new_name: newTeamName });
    }
  };

  const updateParticipants = async (params) => {
    if (params.participants_ids.length > 0) {
      await participantApi.addTeamParticipant(params);
    }

    const selectedIds = form.getFieldValue("teamParticipants");
    const initialIds = initialParticipants.map((p) => p.value);
    const idsToDelete = initialIds.filter((id) => !selectedIds.includes(id));

    if (idsToDelete.length > 0) {
      await participantApi.deleteTeamParticipant({
        team_id: teamID,
        participants_ids: idsToDelete,
      });
    }
  };

  const getParams = () => {
    const selectedIds = form.getFieldValue("teamParticipants");
    const initialIds = initialParticipants.map((p) => p.value);
    const idsToAdd = selectedIds.filter((id) => !initialIds.includes(id));
    return {
      team_id: teamID,
      participants_ids: idsToAdd,
    };
  };

  const onFinish = async () => {
    setIsLoading(true);
    const params = getParams();
    await updateParticipants(params);
    await updateName();
    message.success(t("EVENTS.SUCCESS_EDIT_TEAM"));
    onOk();
    setIsLoading(false);
  };

  const onFinishFailed = () => {
    message.error(t("ERROR.EDIT_TEAM_PARTICIPANTS"));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const params = new URLSearchParams({ team_id: teamID });

      Promise.all([
        teamApi.getTeamById(params.toString()),
        participantApi.getParticipant(),
      ])
        .then(([teamData, participants]) => {
          const team = teamData[0];
          const initialParticipants = team.participants.map((participant) => ({
            value: participant.id,
            label: `${participant.second_name} ${participant.first_name} ${participant.third_name}`,
          }));
          setInitialParticipants(initialParticipants);

          const options = participants.map((p) => ({
            value: p.id,
            label: `${p.second_name} ${p.first_name} ${p.third_name}`,
          }));
          setTeamParticipants(options);

          form.setFieldsValue({
            teamName: team.name,
            teamParticipants: initialParticipants.map((p) => p.value),
          });
        })
        .finally(() => setTimeout(() => setIsLoading(false), 300));
    }
  }, [isOpen, teamID, form]);

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
          mode="multiple"
          options={dataTeamParticipants}
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
