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
import { eventApi, competenciesApi, participantApi } from "@api";
import { remakeSoftware, remakeEquipment } from "@utils";
import { useTranslation } from "react-i18next";

import "./sass/event-registration.scss";

function TeamEditParticipantModal({ isOpen, onOk, onCancel, teamID, record }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [nominationsOptions, setNominationOptions] = useState({});
  const [dataNominations, setNomination] = useState({});
  const [dataTeamParticipants, setTeamParticipants] = useState([]);
  const [nominationId, setNominationId] = useState();
  const [nominationType, setNominationType] = useState();
  const { eventID } = useParams();
  const [form] = Form.useForm();
  const [equipmentsOriginal, setEquipmentsOriginal] = useState();
  const [softwareOriginal, setSoftwareOriginal] = useState();

  useEffect(() => {
    if (isOpen) {
      form.resetFields();

      if (record) {
        setNominationId(record.nomination_id);

        const softwareValues = record.additional_data.softwares
          .map((item) => item.software)
          .join(", ");
        setSoftwareOriginal(softwareValues);

        const equipmentValues = record.additional_data.equipments
          .map((item) => item.equipment)
          .join(", ");
        setEquipmentsOriginal(equipmentValues);

        form.setFieldsValue({
          nomination: record.nomination_name,
          participant_id: record.participant_name,
          supervisor_first_name: record.supervisor_data.supervisor_first_name,
          supervisor_second_name: record.supervisor_data.supervisor_second_name,
          supervisor_third_name: record.supervisor_data.supervisor_third_name,
          software: softwareValues,
          equipment: equipmentValues,
          educational_institution:
            record.additional_data.educational_institution
              .educational_institution,
          additional_educational_institution:
            record.additional_data.educational_institution
              .additional_educational_institution,
        });
      }

      eventApi
        .getEvent(eventID)
        .then((data) => {
          setNominationOptions(
            data?.nominations.map((nomination) => ({
              value: nomination.id,
              label: nomination.name,
            }))
          );

          const params = {
            event_id: eventID,
            nomination_id: record.nomination_id,
          };

          competenciesApi.getNominationEventInfo(params).then((res) => {
            setNomination(
              data?.nominations.map((nomination) => ({
                id: nomination.id,
                kind: res.type,
              }))
            );
          });
        })
        .catch(() => message.error(t("MESSAGES.GET_DATA_ERROR")));
    }
  }, [isOpen, eventID, teamID]);

  const onFinish = async () => {
    setIsLoading(true);

    try {
      const newSoftware = form.getFieldValue("software");
      const newEquipment = form.getFieldValue("equipment");

      if (newSoftware != softwareOriginal) {
        const newSoftwareList = remakeSoftware(
          record.additional_data.softwares,
          newSoftware
        );

        for (const software of newSoftwareList) {
          competenciesApi.updateSoftware({
            name: software.software,
            id: software.id,
          });
        }
      }

      if (newEquipment != equipmentsOriginal) {
        const newEquipmentList = remakeEquipment(
          record.additional_data.equipments,
          newEquipment
        );

        for (const equipment of newEquipmentList) {
          competenciesApi.updateEquipment({
            name: equipment.equipment,
            id: equipment.id,
          });
        }
      }
    } catch {}

    try {
      const body = {
        event_id: parseInt(eventID),
        nomination_id: nominationId,
        team_id: teamID,
        participant_id: record.participant_id,
        supervisor_first_name: form.getFieldValue("supervisor_first_name"),
        supervisor_second_name: form.getFieldValue("supervisor_first_name"),
        supervisor_third_name:
          form.getFieldValue("supervisor_second_name") || "",

        educational_institution: form.getFieldValue("educational_institution"),
        additional_educational_institution:
          form.getFieldValue("additional_educational_institution") || "",
      };
      await participantApi.updateParticipantInNomination(body);
      message.success(t("MESSAGES.SUCCESS_PARTICIPANT_EDIT"));

      form.resetFields();
      onOk();
    } catch {}

    setIsLoading(false);
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
    setIsLoading(false);
  };

  return (
    <Modal
      title={t("EVENTS.EDIT_PARTICIPANT_IN_NOMINATION")}
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
        <Flex vertical gap="">
          <Form.Item name="nomination">
            <TeamNominationSelect
              name="nomination"
              options={nominationsOptions}
              disabled={true}
            />
          </Form.Item>
          <Form.Item name="participant_id">
            <ExistingTeamParticipantsInput
              name="participant_id"
              mode="single"
              options={dataTeamParticipants}
              disabled={true}
              teamID={teamID}
            />
          </Form.Item>
          <Form.Item name="supervisor_first_name">
            <ParticipantTeacherFirstnameInput name="supervisor_first_name" />
          </Form.Item>
          <Form.Item name="supervisor_second_name">
            <ParticipantTeacherLastnameInput name="supervisor_second_name" />
          </Form.Item>
          <Form.Item name="supervisor_third_name">
            <ParticipantTeacherPatronymicInput name="supervisor_third_name" />
          </Form.Item>
          <Form.Item name="educational_institution">
            <ParticipantOrganizationInput name="educational_institution" />
          </Form.Item>
          <Form.Item name="additional_educational_institution">
            <ParticipantAdditionalOrganizationInput name="additional_educational_institution" />
          </Form.Item>
          <Form.Item name="software">
            <ParticipantSoftwareInput name="software" />
          </Form.Item>
          <Form.Item name="equipment">
            <ParticipantEquipmentInput name="equipment" />
          </Form.Item>
        </Flex>

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

export default TeamEditParticipantModal;
