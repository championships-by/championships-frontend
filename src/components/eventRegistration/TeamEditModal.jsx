import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, Form, Modal, message } from "antd";
import TeamNameInput from "@modules/team/TeamNameInput";
import TeamParticipantsInput from "@modules/team/TeamParticipantsInput";
import { teamApi } from "@api";
import { useTranslation } from "react-i18next";

function TeamEditModal({ isOpen, onOk, onCancel, teamID, teamName }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [dataTeamParticipants, setTeamParticipants] = useState([]);
  const { eventID } = useParams();

  const onFinish = async () => {
    if (form.getFieldValue("teamName") === teamName) {
      message.success(t("EVENTS.SUCCESS_EDIT_TEAM_NAME"));
      onOk();
    } else {
      setIsLoading(true);
      try {
        const body = {
          id: teamID,
          new_name: form.getFieldValue("teamName"),
        };

        await teamApi.updateTeam(body);

        message.success(t("EVENTS.SUCCESS_EDIT_TEAM_NAME"));

        form.resetFields();
        onOk();
      } catch {
      } finally {
        setIsLoading(false);
      }
    }
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
          disabled={true}
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
