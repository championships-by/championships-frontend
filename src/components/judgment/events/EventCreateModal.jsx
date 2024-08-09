import React, { useState, useEffect } from "react";
import { Button, Form, Modal, message, Typography, Row, Col } from "antd";
import dayjs from "dayjs";
import EventName from "@modules/judgment/events/EventName";
import EventDate from "@modules/judgment/events/EventDate";
import EventRegisterDate from "@modules/judgment/events/EventRegisterDate";
import EventDescription from "@modules/judgment/events/EventDescription";
import EventRequirements from "@modules/judgment/events/EventRequirements";
import EventEmail from "@modules/judgment/events/EventEmail";
import EventLevel from "@modules/judgment/events/EventLevel";
import EventPlace from "@modules/judgment/events/EventPlace";
import EventRegistrationSwitch from "@modules/judgment/events/EventRegistrationSwitch";
import EventRegulation from "@modules/judgment/events/EventRegulation";
import EventLogo from "@modules/judgment/events/EventLogo";
import { eventApi } from "@api";

function EventCreateModal({ isOpen, onOk, onCancel, name }) {
  const [form] = Form.useForm();

  const create_event_request = async () => {
    const body = JSON.stringify({
      name: form.getFieldValue("event_name"),
      date: dayjs(form.getFieldValue("event_date")).format("YYYY-MM-DD"),
    });

    await eventApi.setEvent(body);
  };

  const onFinish = () => {
    message.success("Данные мероприятия сохранены!");
    onOk();
  };

  const onFinishFailed = () => {
    message.error("Проверьте поля для ввода!");
  };

  return (
    <Modal
      title="Создание мероприятия"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <EventName name="event_name" />
        <EventLogo name="event_logo" />
        <EventEmail name="event_email" />
        <EventPlace name="event_place" />
        <EventRegulation name="event_regulation" />
        <EventRegisterDate name="event_register_date" />
        <EventDate name="event_date" />
        <EventRegistrationSwitch name="event_registartion" />
        <EventLevel name="event_level" />
        <EventDescription name="event_description" />
        <EventRequirements name="event_requirements" />
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            create_event_request();
          }}
        >
          Сохранить
        </Button>
      </Form>
    </Modal>
  );
}

export default EventCreateModal;
