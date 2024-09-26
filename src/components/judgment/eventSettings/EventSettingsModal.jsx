import { competenciesApi } from "@api";
import CompetitionJudge from "@modules/judgment/events/CompetitionJudgeName";
import CompetitionName from "@modules/judgment/events/CompetitionName";
import CompetitionType from "@modules/judgment/events/CompetitionType";
import ReglamentName from "@modules/judgment/events/ReglamentName";
import { Button, Flex, Form, Modal, message } from "antd";
import Typography from "antd/es/typography/Typography";
import { ModalType } from "@constants";
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
    if (mode === ModalType.EDIT) {
      const params = new URLSearchParams();
      params.append("event_id", eventID);
      params.append("nomination_id", nominationId);
      if (isOpen) {
        competenciesApi
          .getNominationEventInfo(params.toString())
          .then((response) => {
            const data = response.data;
            const judgeIds = data.judges.map((judge) => judge.id);
            form.setFieldsValue({
              nomination_name: data.nomination_name,
              reglament: data.reglament,
            });
            setInputName(data.nomination_name);
            setInputReglament(data.reglament);
            setSelectedJudges(judgeIds);
          });
      }
    }
  }, [eventID, nominationId, form, isOpen]);

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
    if (mode === ModalType.ADD) {
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
        form.resetFields();
        setRefreshKey((prevKey) => prevKey + 1);
      } catch {}
    } else if (mode === ModalType.EDIT) {
      try {
        const data = {
          nomination_name: inputName,
          reglament: inputReglament,
          judges_ids: selectedJudges,
        };
        const params = new URLSearchParams();
        params.append("event_id", eventID);
        params.append("nomination_id", nominationId);
        competenciesApi.updateNominationEvent(params.toString(), data);
        message.success("Компетенция успешно изменена");
        onOk();
        setInputName("");
        setInputReglament("");
        form.resetFields();
        setRefreshKey((prevKey) => prevKey + 1);
      } catch {}
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
          name="nomination_name"
        />
        <ReglamentName
          onInputChange={handleInputReglamentChange}
          value={inputReglament}
          name="reglament"
        />
        <CompetitionJudge
          onJudgeChange={handleChangeJudges}
          judges={selectedJudges}
        />
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
