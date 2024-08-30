import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Modal, message, Flex } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import TeamNominationSelect from "@modules/team/TeamNominationSelect";
import TeamParticipantsInput from "@modules/team/TeamParticipantsInput";
import ParticipantEquipmentInput from "@modules/participant/ParticipantEquipmentInput";
import ParticipantSoftwareInput from "@modules/participant/ParticipantSoftwareInput";
import ParticipantAdditionalOrganizationInput from "@modules/participant/ParticipantAdditionalOrganizationInput.jsx";
import ParticipantTeacherFirstnameInput from "@modules/participant/ParticipantTeacherFirstnameInput.jsx";
import ParticipantTeacherLastnameInput from "@modules/participant/ParticipantTeacherLastnameInput.jsx";
import ParticipantOrganizationInput from "@modules/participant/ParticopantOrganizationInput.jsx";
import ParticipantTeacherPatronymicInput from "@modules/participant/ParticipantTeacherPatronymicInput.jsx";
import { eventApi, competenciesApi } from "@api";

import "./sass/event-registration.scss";

function TeamAddParticipantModal({ isOpen, onOk, onCancel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [nominationsOptions, setNominationOptions] = useState({});
  const [dataNominations, setNomination] = useState({});
  const [dataTeamParticipants, setTeamParticipants] = useState([]);
  const { eventID } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
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
        .catch(() =>
          message.error(
            "Невозможно получить данные. Обратитесь к администратору"
          )
        );
    }
  });

  const onNominationChange = (nominationID) => {
    const related = false;
    const selectedNomination = dataNominations.find(
      (nom) => nom.id === nominationID
    );
    const nominationsOptions = [];
    const kind = selectedNomination ? selectedNomination.kind : null;
    competenciesApi
      .getParticipantsNominationEvent(eventID, nominationID, related, kind)
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
                label: `${firstName} ${secondName} ${thirdName}`,
              });
            });
          }
        });

        setTeamParticipants(nominationsOptions);
      })
      .catch(() =>
        message.error("Невозможно получить данные. Обратитесь к администратору")
      );
  };

  const onFinish = () => {
    message.success("Всё в порядке!");
    setIsLoading(false);
  };

  const onFinishFailed = () => {
    message.error("Проверьте поля для ввода!");
    setIsLoading(false);
  };

  return (
    <Modal
      title="Добавление участников в компетенцию"
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
        <Form.List name="participants">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div key={key}>
                  <TeamNominationSelect
                    name="nomination"
                    options={nominationsOptions}
                    onChange={onNominationChange}
                  />
                  <TeamParticipantsInput
                    name="participant"
                    mode="single"
                    options={dataTeamParticipants}
                  />
                  <ParticipantTeacherLastnameInput name="supervisor_second_name" />
                  <ParticipantTeacherFirstnameInput name="supervisor_first_name" />
                  <ParticipantTeacherPatronymicInput name="supervisor_third_name" />
                  <ParticipantOrganizationInput name="educational_institution" />
                  <ParticipantAdditionalOrganizationInput name="additional_educational_institution" />
                  <ParticipantSoftwareInput name="software" />
                  <ParticipantEquipmentInput name="equipment" />
                  {fields.length > 1 && (
                    <Button
                      type="dashed"
                      block
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                      className="event-registration__add-participant__remove-button"
                      danger
                    >
                      Удалить участника
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="dashed"
                className="event-registration__add-participant__add-button"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Добавить участника
              </Button>
            </>
          )}
        </Form.List>
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

export default TeamAddParticipantModal;
