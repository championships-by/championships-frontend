import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, Form, Modal, message } from "antd";
import TeamNameInput from "@modules/team/TeamNameInput";
import TeamParticipantsInput from "@modules/team/TeamParticipantsInput";
import { changeDateFormat } from "@utils";
import { participantApi, teamApi } from "@api";
import { useTranslation } from "react-i18next";

function TeamCreateModal({ isOpen, onOk, onCancel, onAdd }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { eventID } = useParams();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const body = JSON.stringify({
        name: form.getFieldValue("teamName"),
        participants_ids: form.getFieldValue("teamParticipants"),
      });

      await teamApi.setTeams(body);

      message.success(t("MESSAGES.SUCCESS_NEW_TEAM_ADD"));
      form.resetFields();
      onAdd();
      form.resetFields();
      onOk();
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = () => {
    onSubmit();
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
    setIsLoading(false);
  };

  return (
    <Modal
      title={t("EVENTS.ADD_TEAM")}
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
        <TeamParticipantsInput name="teamParticipants" mode="multiple" />
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

export default TeamCreateModal;
