import React, { useState } from "react";
import { Button, Flex, Form, Modal, message } from "antd";
import ReglamentName from "@modules/judgment/events/ReglamentName";
import CompetitionJudge from "@modules/judgment/events/CompetitionJudgeName";
import CompetitionName from "@modules/judgment/events/CompetitionName";
import CompetitionType from "@modules/judgment/events/CompetitionType";
import { competenciesApi } from "@api";
import { useParams } from "react-router-dom";

function EventSettingsCompitations({ isOpen, onOk, onCancel, name }) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputReglament, setInputReglament] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const { event_id } = useParams();

  const handleInputNameChange = (value) => {
    setInputName(value);
  };

  const handleInputReglamentChange = (value) => {
    setInputReglament(value);
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  const onFinishFailed = () => {
    message.error("Проверьте поля для ввода!");
    setIsLoading(false);
  };

  const sendRequest = async () => {
    setIsLoading(true);

    let url = "";

    switch (selectedValue) {
      case "time":
        const response =
          await competenciesApi.addOlympicCompetenciesForEvent(event_id);
        break;

      case "olympic":
        break;

      case "criteria":
        break;
    }
    try {
      const response = await competenciesApi.addOlympicCompetenciesForEvent(
        event_id,
        inputName,
        inputReglament
      );
      console.log("Компетенция создана", response);
      message.success("Компетенция успешно создана!");
      onOk(); // Вызываем функцию onOk, если требуется
    } catch (error) {
      console.error("Ошибка при создании компетенции:", error);
      message.error(
        "Ошибка при создании компетенции. Пожалуйста, попробуйте снова."
      );
    } finally {
      setIsLoading(false); // Сбрасываем состояние загрузки
    }
  };
  console.log(selectedValue);
  return (
    <Modal
      title={name}
      className="event-settings__modal"
      open={isOpen}
      onCancel={onCancel}
      footer={null} // Убираем стандартные кнопки
      width={600}
    >
      <Form
        layout="vertical"
        requiredMark="default"
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
        <CompetitionJudge />
        <CompetitionType onSelectChange={handleSelectChange} />

        <Flex gap="middle">
          <Button
            className="event-settings__saveButton"
            type="primary"
            loading={isLoading}
            onClick={sendRequest} // Вызываем sendRequest при нажатии на кнопку "Сохранить"
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
