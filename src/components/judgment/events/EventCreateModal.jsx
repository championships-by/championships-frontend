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
import { Locale } from "@constants";

function EventCreateModal({ isOpen, onOk, onCancel, name }) {
  const [form] = Form.useForm();

  const [values, setValues] = useState({});

  const onClick = async () => {
    const {
      name,
      participant_question_email,
      event_place,
      description,
      event_level,
      participation_needs,
      published,
      registration,
      holding,
    } = values;

    // todo formdata
    const formData = new FormData();

    const body = JSON.stringify({
      logo: formData,
      rules: formData,
      event_data: {
        name,
        participant_question_email,
        event_place,
        description,
        event_level,
        participation_needs,
        published,
        registration_start_date: registration?.registration_start_date,
        registration_finish_date: registration?.registration_finish_date,
        holding_start_date: holding?.holding_start_date,
        holding_finish_date: holding?.holding_finish_date,
      },
    });

    eventApi.setEvent(body);
  };

  const onValuesChange = (values) => {
    setValues((oldValues) => ({ ...oldValues, ...values }));
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
        <EventName name="name" value={values.name} />
        <EventLogo name="event_logo" value={values.event_logo} />
        <EventEmail
          name="participant_question_email"
          value={values.participant_question_email}
        />
        <EventPlace name="event_place" value={values.event_place} />
        <EventRegulation
          name="event_regulation"
          value={values.event_regulation}
        />
        <EventRegisterDate
          name="registration"
          value={values.registration}
          onChange={onValuesChange}
        />
        <EventDate
          name="holding"
          value={values.holding}
          onChange={onValuesChange}
        />
        <EventRegistrationSwitch
          name="published"
          value={values.published}
          onChange={onValuesChange}
        />
        <EventDescription name="description" value={values.description} />
        <EventLevel
          name="event_level"
          value={values.event_level}
          onChange={onValuesChange}
        />
        <EventRequirements
          name="participation_needs"
          value={values.participation_needs}
        />
        <Button type="primary" htmlType="submit" onClick={onClick}>
          Сохранить
        </Button>
      </Form>
    </Modal>
  );
}

export default EventCreateModal;
