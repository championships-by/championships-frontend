import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Modal,
  message,
  Typography,
  Row,
  Col,
  notification,
} from "antd";
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

  const onSubmit = async () => {
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
      event_logo,
      event_regulation,
    } = values;

    const formData = new FormData();
    formData.append("logo", event_logo);
    formData.append("rules", event_regulation);

    const event_data = {
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
    };

    formData.append("event_data", JSON.stringify(event_data));

    eventApi.setEvent(formData);
  };

  const onValuesChange = (values) => {
    setValues((oldValues) => ({ ...oldValues, ...values }));
  };

  const onFinish = () => {
    message.success("Мероприятие успешно создано!");
    onOk();
    notification.info({
      message: "Внимание!",
      description:
        "Для опубликования мероприятия необходимо добавить хотя бы одну компетенцию!",
      duration: 120,
      placement: "bottomRight",
    });
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
        onValuesChange={onValuesChange}
      >
        <EventName name="name" value={values.name} />
        <EventLogo
          name="event_logo"
          value={values.event_logo}
          onChange={onValuesChange}
          required={true}
        />
        <EventEmail
          name="participant_question_email"
          value={values.participant_question_email}
        />
        <EventPlace name="event_place" value={values.event_place} />
        <EventRegulation
          name="event_regulation"
          value={values.event_regulation}
          onChange={onValuesChange}
          required={true}
        />
        <EventRegisterDate
          name="registration"
          value={values.registration}
          form={form}
          onChange={onValuesChange}
        />
        <EventDate
          name="holding"
          value={values.holding}
          form={form}
          onChange={onValuesChange}
        />
        <EventRegistrationSwitch
          name="published"
          value={values.published}
          onChange={onValuesChange}
          disabled={true}
        />
        <EventDescription name="description" value={values.description} />
        <EventLevel
          name="event_level"
          value={values.event_level}
          form={form}
          onChange={onValuesChange}
        />
        <EventRequirements
          name="participation_needs"
          value={values.participation_needs}
        />
        <Button type="primary" htmlType="submit" onSubmit={onSubmit}>
          Сохранить
        </Button>
      </Form>
    </Modal>
  );
}

export default EventCreateModal;
