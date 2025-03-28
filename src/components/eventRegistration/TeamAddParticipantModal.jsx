import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Modal, message, Flex } from "antd";
import TeamNominationSelect from "@modules/team/TeamNominationSelect";
import ExistingTeamParticipantsInput from "@modules/team/ExistingTeamParticipantsInput";
import ParticipantEquipmentInput from "@modules/participant/ParticipantEquipmentInput";
import ParticipantSoftwareInput from "@modules/participant/ParticipantSoftwareInput";
import ParticipantAdditionalOrganizationInput from "@modules/participant/ParticipantAdditionalOrganizationInput.jsx";
import ParticipantTeacherFirstnameInput from "@modules/participant/ParticipantTeacherFirstnameInput.jsx";
import ParticipantTeacherLastnameInput from "@modules/participant/ParticipantTeacherLastnameInput.jsx";
import ParticipantOrganizationInput from "@modules/participant/ParticopantOrganizationInput.jsx";
import ParticipantTeacherPatronymicInput from "@modules/participant/ParticipantTeacherPatronymicInput.jsx";
import {
  eventApi,
  competenciesApi,
  participantApi,
  notificationApi,
} from "@api";
import { useTranslation } from "react-i18next";

import "./sass/event-registration.scss";

function TeamAddParticipantModal({ isOpen, onOk, onCancel, teamID }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [nominationsOptions, setNominationOptions] = useState({});
  const [dataNominations, setNomination] = useState({});
  const [dataTeamParticipants, setTeamParticipants] = useState([]);
  const [nominationId, setNominationId] = useState();
  const [nominationType, setNominationType] = useState();
  const { eventID } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      form.resetFields();
      eventApi
        .getEvent(eventID)
        .then((data) => {
          setNominationOptions(
            data?.nominations.map((nomination) => ({
              value: nomination.id,
              label: nomination.name,
            }))
          );
          setNomination(
            data?.nominations.map((nomination) => ({
              id: nomination.id,
              kind: nomination.kind,
            }))
          );
        })
        .catch(() => message.error(t("MESSAGES.GET_DATA_ERROR")));
    }
  }, [isOpen, eventID, teamID]);

  const onNominationChange = (nominationID) => {
    setNominationId(nominationID);
    const related = false;
    const selectedNomination = dataNominations.find(
      (nom) => nom.id === nominationID
    );
    const nominationsOptions = [];
    const kind = selectedNomination ? selectedNomination.kind : null;
    setNominationType(kind);

    form.setFieldsValue({
      participant: undefined,
    });
    competenciesApi
      .getParticipantsNominationEvent(
        eventID,
        nominationID,
        teamID,
        related,
        kind
      )
      .then((response) => {
        const { data } = response;
        data.forEach(({ team }) => {
          if (team.participants && team.participants.length > 0) {
            team.participants.forEach((participant) => {
              const firstName = participant.participant_data.first_name;
              const secondName = participant.participant_data.second_name;
              const thirdName = participant.participant_data.third_name;

              nominationsOptions.push({
                value: participant.participant_data.id,
                label: `${secondName} ${firstName} ${thirdName}`,
              });
            });
          }
        });

        setTeamParticipants(nominationsOptions);
      })
      .catch(() => message.error(t("MESSAGES.GET_DATA_ERROR")));
  };

  const onFinish = async () => {
    setIsLoading(true);
    try {
      const body = {
        nomination_event: {
          event_id: eventID,
          nomination_id: nominationId,
          type: nominationType,
        },
        team_id: teamID,
        team_participants: [
          {
            participant_id: form.getFieldValue("participant_id"),
            softwares: [
              {
                name: form.getFieldValue("software") || "",
              },
            ],
            equipments: [
              {
                name: form.getFieldValue("equipment") || "",
              },
            ],
            educational_institution: form.getFieldValue(
              "educational_institution"
            ),
            additional_educational_institution:
              form.getFieldValue("additional_educational_institution") || null,
            supervisor_first_name: form.getFieldValue("supervisor_first_name"),
            supervisor_second_name: form.getFieldValue(
              "supervisor_second_name"
            ),
            supervisor_third_name:
              form.getFieldValue("supervisor_third_name") || "",
          },
        ],
      };
      await participantApi.addParticipantToNomination(body);
      const bodyNomination = {
        participant_id: form.getFieldValue("participant_id"),
        event_id: eventID,
        nomination_id: nominationId,
      };
      await notificationApi.sendRegistrationNomination(bodyNomination);
      message.success(t("MESSAGES.SUCCESS_PARTICIPANT_ADD"));
      form.resetFields();
      onOk();
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
    setIsLoading(false);
  };

  return (
    <Modal
      title={t("EVENTS.ADD_PARTICIPANT_IN_NOMINATION")}
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark="default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          participants: [{}],
        }}
      >
        <TeamNominationSelect
          name="nomination"
          options={nominationsOptions}
          onChange={onNominationChange}
        />
        <ExistingTeamParticipantsInput
          isVisile={isOpen}
          name="participant_id"
          mode="single"
          options={dataTeamParticipants}
          teamID={teamID}
        />
        <ParticipantTeacherLastnameInput name="supervisor_second_name" />
        <ParticipantTeacherFirstnameInput name="supervisor_first_name" />
        <ParticipantTeacherPatronymicInput name="supervisor_third_name" />
        <ParticipantOrganizationInput name="educational_institution" />
        <ParticipantAdditionalOrganizationInput name="additional_educational_institution" />
        <ParticipantSoftwareInput name="software" />
        <ParticipantEquipmentInput name="equipment" />
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

export default TeamAddParticipantModal;
