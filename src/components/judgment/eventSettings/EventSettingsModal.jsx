import React, { useState } from "react";
import { Button, Flex, Form, Modal, message } from "antd";
import ReglamentName from "@modules/judgment/events/ReglamentName";
import CompetitionJudge from "@modules/judgment/events/CompetitionJudgeName";
import CompetitionName from "@modules/judgment/events/CompetitionName";
import CompetitionType from "@modules/judgment/events/CompetitionType";
import { competenciesApi } from "@api";
import { useParams } from "react-router-dom";

function EventSettingsCompitations({
  isOpen,
  onOk,
  onCancel,
  name,
  mode = "create",
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputReglament, setInputReglament] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [groupCount, setGroupCount] = useState();
  const [criteria, setCriteria] = useState([]);
  const [selectedJudges, setSelectedJudges] = useState([]);
  const { eventID } = useParams();

  const eventId = parseInt(eventID, 10);
  const handleInputNameChange = (value) => {
    setInputName(value);
  };

  const handleGroupCount = (value) => {
    setGroupCount(value);
  };

  const handleCriteriaChange = (newCriteria) => {
    setCriteria(newCriteria);
  };
  const handleInputReglamentChange = (value) => {
    setInputReglament(value);
  };

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleChangeJudges = (value) => {
    setSelectedJudges(value);
  };

  const onFinishFailed = () => {
    message.error("Проверьте поля для ввода!");
    setIsLoading(false);
  };

  const onFinish = async () => {
    setIsLoading(true);
    const data = {
      append_nomination_event_data: {
        event_id: eventId,
        nomination_name: inputName,
        reglament: inputReglament,
        judges_ids: selectedJudges,
      },
    };
    switch (selectedValue) {
      case "time":
        Object.assign(data, { race_round_amount: groupCount });
        await competenciesApi.addTimeCompetenciesForEvent(data).then(() => {
          message.success("Компетенция успешно добавлена");
          setIsLoading(false);
          onCancel();
        });
        break;

      case "playoffs":
        await competenciesApi.addOlympicCompetenciesForEvent(data).then(() => {
          message.success("Компетенция успешно добавлена");
          setIsLoading(false);
          onCancel();
        });
        break;

      case "criteria":
        Object.assign(data, { criterias: criteria });
        await competenciesApi.addCriteriaCompetenciesForEvent(data).then(() => {
          message.success("Компетенция успешно добавлена");
          setIsLoading(false);
          onCancel();
        });
        break;
      default:
        break;
    }
  };

  return (
    <Modal
      title={name}
      className="event-settings__modal"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <Form
        layout="vertical"
        requiredMark="default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <CompetitionName
          onInputChange={handleInputNameChange}
          value={inputName}
        />
        <ReglamentName
          onInputChange={handleInputReglamentChange}
          value={inputReglament}
        />
        <CompetitionJudge onJudgeChange={handleChangeJudges} />
        <CompetitionType
          onChange={(value) => {
            if (mode == "edit") {
              return;
            }
            handleChange(value);
          }}
          onInputChange={handleGroupCount}
          onCriteriaChange={handleCriteriaChange}
          disabled={mode === "edit"}
          mode={mode}
        />
        <Flex gap="middle">
          <Button
            className="event-settings__saveButton"
            type="primary"
            loading={isLoading}
            htmlType="submit"
          >
            Сохранить
          </Button>
          <Button className="event-settings__cancelButton" onClick={onCancel}>
            Отмена
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
}

export default EventSettingsCompitations;
