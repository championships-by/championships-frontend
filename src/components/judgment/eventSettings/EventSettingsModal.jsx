import React, { useState } from "react";
import { Button, Flex, Form, Modal, message } from "antd";
import ReglamentName from "@modules/judgment/events/ReglamentName";
import CompetitionJudge from "@modules/judgment/events/CompetitionJudgeName";
import Competition from "@modules/judgment/events/CompetitionName";
import CompetitionType from "@modules/judgment/events/CompetitionType";

function EventSettingsCompitations({ isOpen, onOk, onCancel, name }) {
  const [isLoading, setIsLoading] = useState(false);

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
      title={name}
      className="event-settings__modal"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      footer={[]}
      width={600}
    >
      <Form
        layout="vertical"
        variant="filled"
        requiredMark="Default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Competition />
        <ReglamentName />
        <CompetitionJudge />
        <CompetitionType />

        <Flex gap="middle">
          <Button
            className="event-settings__saveButton"
            type="primary"
            htmlType="submit"
            loading={isLoading}
            onClick={() => setIsLoading(true)}
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
