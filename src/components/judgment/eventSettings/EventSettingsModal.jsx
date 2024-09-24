import { competenciesApi } from "@api";
import CompetitionJudge from "@modules/judgment/events/CompetitionJudgeName";
import CompetitionName from "@modules/judgment/events/CompetitionName";
import CompetitionType from "@modules/judgment/events/CompetitionType";
import ReglamentName from "@modules/judgment/events/ReglamentName";
import { Button, Flex, Form, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EventSettingsCompitations({
  isOpen,
  onOk,
  onCancel,
  name,
  mode,
  onAdd,
  nominationId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputReglament, setInputReglament] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [groupCount, setGroupCount] = useState();
  const [criteria, setCriteria] = useState([]);
  const [selectedJudges, setSelectedJudges] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const { eventID } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      competenciesApi
        .getNominationEventInfo(eventID, nominationId)
        .then((response) => {
          const data = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [eventID, nominationId, form]);

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
    try {
      switch (selectedValue) {
        case "time":
          Object.assign(data, { race_round_amount: groupCount });
          await competenciesApi
            .addTimeCompetenciesForEvent(data)
            .then(() => {});
          break;

        case "playoffs":
          await competenciesApi
            .addOlympicCompetenciesForEvent(data)
            .then(() => {});
          break;

        case "criteria":
          Object.assign(data, { criterias: criteria });
          await competenciesApi
            .addCriteriaCompetenciesForEvent(data)
            .then(() => {});
          break;
        default:
          break;
      }
      message.success("Компетенция успешно добавлена");
      onOk();
      onAdd();
      setInputName("");
      setInputReglament("");
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      message.error("Произошла ошибка.");
    }
    setIsLoading(false);
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
        key={refreshKey}
        form={form}
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
