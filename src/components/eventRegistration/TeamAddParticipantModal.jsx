import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Modal, message, Flex } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import TeamNominationSelect from "@modules/team/TeamNominationSelect";
import TeamParticipantsInput from "@modules/team/TeamParticipantsInput";
import ParticipantEquipmentInput from "@modules/participant/ParticipantEquipmentInput";
import ParticipantSoftwareInput from "@modules/participant/ParticipantSoftwareInput";

import "./sass/event-registration.scss";

function TeamAddParticipantModal({ isOpen, onOk, onCancel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

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
                  <TeamNominationSelect name="nomination" />
                  <TeamParticipantsInput name="participant" mode="single" />
                  <ParticipantEquipmentInput name="equipment" />
                  <ParticipantSoftwareInput name="software" />
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
