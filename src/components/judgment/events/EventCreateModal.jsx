import { eventApi } from "@api";
import EventDate from "@modules/judgment/events/EventDate";
import EventDescription from "@modules/judgment/events/EventDescription";
import EventEmail from "@modules/judgment/events/EventEmail";
import EventLevel from "@modules/judgment/events/EventLevel";
import EventLogo from "@modules/judgment/events/EventLogo";
import EventName from "@modules/judgment/events/EventName";
import EventPlace from "@modules/judgment/events/EventPlace";
import EventRegisterDate from "@modules/judgment/events/EventRegisterDate";
import EventRegulation from "@modules/judgment/events/EventRegulation";
import EventRequirements from "@modules/judgment/events/EventRequirements";
import { Button, Form, message, Modal, notification } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function EventCreateModal({ isOpen, onOk, onCancel, name, onAdd }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [values, setValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

    event_data.published = false;

    formData.append("event_data", JSON.stringify(event_data));

    try {
      await eventApi.setEvent(formData);
      return true;
    } catch (error) {
      message.error(t("MESSAGES.EVENT_CREATE_ERROR"));
      return false;
    }
  };

  const onValuesChange = (values) => {
    setValues((oldValues) => ({ ...oldValues, ...values }));
  };

  const onFinish = async () => {
    setIsLoading(true);
    const success = await onSubmit();
    if (success) {
      message.success(t("MESSAGES.EVENT_CREATE_SUCCESS"));
      onAdd();
      form.resetFields();
      onOk();
      notification.info({
        message: t("COMMON.ATTENTION"),
        description: t("EVENTS.AT_LEAST_ONE_NOMINATION_FOR_CREATE_EVENT"),
        duration: 120,
        placement: "bottomRight",
      });
    }
    setIsLoading(false);
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
  };

  return (
    <Modal
      title={t("EVENTS.CREATE_EVENT")}
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      width={600}
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
          form={form}
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
          form={form}
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
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {t("COMMON.SAVE")}
        </Button>
      </Form>
    </Modal>
  );
}

export default EventCreateModal;
