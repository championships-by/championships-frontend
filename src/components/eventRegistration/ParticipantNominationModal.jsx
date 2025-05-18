import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Flex, Form, Modal, message } from "antd";
import TeamParticipantsInput from "@/modules/team/TeamParticipantsInput";
import TeamNominationInput from "@/modules/team/TeamNominationSelect";
import { eventApi, participantApi, userApi } from "@/api";
import { useTranslation } from "react-i18next";

function ParticipantNominationModal({ isOpen, onOk, onCancel }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [dataTeamParticipants, setTeamParticipants] = useState([]);
  const [dataNominations, setNomination] = useState({});
  const { eventID } = useParams();

  const onFinish = () => {
    message.success(t("MESSAGES.SUCCESS_PARTICIPANT_ADD"));
    setIsLoading(false);
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      eventApi
        .getEvent(eventID)
        .then((data) =>
          setNomination(
            data?.event_data?.nominations.map((nomination) => ({
              value: nomination.name,
              label: nomination.name,
            }))
          )
        )
        .catch(() => message.error(t("MESSAGES.GET_DATA_ERROR")));

      participantApi
        .getParticipant()
        .then((data) =>
          setTeamParticipants(
            data.map((participant) => ({
              value: participant.email,
              label: `${participant.second_name} ${participant.first_name} ${participant.third_name}`,
            }))
          )
        )
        .catch(() => message.error(t("MESSAGES.GET_DATA_ERROR")))
        .finally(() => setTimeout(() => setIsLoading(false), 300));
    }
  }, [isOpen, eventID]);

  const create_team_request = async () => {
    const body = JSON.stringify({
      name: form.getFieldValue("teamName"),
    });

    await userApi.setTeams(body);
  };

  return (
    <Modal
      title={t("EVENTS.EDIT_TEAM")}
      className="event-registration__participant-nomination-modal"
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
        <TeamParticipantsInput
          name="teamParticipants"
          options={dataTeamParticipants}
        />
        <TeamNominationInput
          name="nomination_select"
          options={dataNominations}
        />
        <Flex gap="middle">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            onClick={() => {
              setIsLoading(true);
              create_team_request();
            }}
          >
            {t("COMMON.SAVE")}
          </Button>
          <Button onClick={onCancel}>{t("COMMON.CANCEL")}</Button>
        </Flex>
      </Form>
    </Modal>
  );
}

export default ParticipantNominationModal;
