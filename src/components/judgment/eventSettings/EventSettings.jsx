import {
  Button,
  Typography,
  Breadcrumb,
  Table,
  Row,
  Col,
  message,
  Form,
  Space,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "@components/loader/Loader";
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
import CompitationModal from "./EventSettingsModal";

import "./sass/event-settings.scss";
import { eventApi } from "@api";

const columns = [
  {
    title: "Название компетенции",
    dataIndex: "name_compitation",
    key: "name_nomination",
  },
  {
    title: "Тип соревнований",
    dataIndex: "compitation_type",
    key: "compitation_type",
  },
  {
    title: "Регламент",
    key: "regulations",
    render: () => (
      <Space>
        <Button type="text" icon={<LinkOutlined />} />
      </Space>
    ),
  },
  {
    title: "Действия",
    key: "action",
    render: () => (
      <Space>
        <Button type="text" icon={<EditOutlined />} />
        <Button type="text" icon={<TrophyOutlined />} />
        <Button type="text" icon={<TeamOutlined />} />
        <Button type="text" icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];

const items = [
  {
    title: "Мероприятия",
    href: "./",
  },
  {
    title: "Настройка мероприятия",
  },
];

function EventSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadings, setLoadings] = useState([]);
  const [isAddCompitationModalOpen, setIsAddCompitationModalOpen] =
    useState(false);
  const [event, setEvent] = useState({});
  const { eventID } = useParams();
  const [form] = Form.useForm();
  const [values, setValues] = useState({});

  useEffect(() => {
    if (!Object.keys(event).length) {
      try {
        eventApi.getEvent(eventID).then((data) => {
          setEvent(data);

          const { event } = data;

          // event_logo
          // event_regulation
          const values = {
            name: event.name,
            participant_question_email: event.participant_question_email,
            event_place: event.event_place,
            description: event.description,
            event_level: event.event_level,
            participation_needs: event.participation_needs,
            published: event.published,
            registration: {
              registration_start_date: event.registration_start_date,
              registration_finish_date: event.registration_finish_date,
            },
            holding: {
              holding_start_date: event.holding_start_date,
              holding_finish_date: event.holding_finish_date,
            },
          };

          form.setFieldsValue(values);
          setValues(values);

          setTimeout(() => setIsLoading(false), 300);
        });
      } catch (error) {
        message.error(
          "Ошибка: Невозможно получить данные. Обратитесь к администратору..."
        );
      }
    } else {
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [eventID, form, event]);

  const onClick = async () => {
    enterLoading(0);

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

    const body = new URLSearchParams({
      event_data: JSON.stringify({
        id: eventID,
        name,
        participant_question_email,
        event_place,
        description,
        event_level,
        participation_needs,
        published,
        registration_start_date: registration.registration_start_date,
        registration_finish_date: registration.registration_finish_date,
        holding_start_date: holding.holding_start_date,
        holding_finish_date: holding.holding_finish_date,
      }),
    });

    eventApi.changeEvent(body);
  };

  const onValuesChange = (values) => {
    setValues((oldValues) => ({ ...oldValues, ...values }));
  };

  const onFinish = () => {
    message.success("Всё в порядке!");
  };

  const onFinishFailed = () => {
    message.error("Проверьте поля для ввода!");
  };

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  return (
    <div>
      <Loader show={isLoading} />
      <Typography.Title level={2}>Редактирование мероприятия</Typography.Title>
      <Breadcrumb items={items} />
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form
            name="event"
            form={form}
            layout="vertical"
            requiredMark="optional"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
          >
            <Typography.Title level={3}>Данные мероприятия</Typography.Title>
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
            <Button
              type="primary"
              htmlType="submit"
              loading={loadings[0]}
              onClick={onClick}
            >
              Сохранить данные
            </Button>
          </Form>
        </Col>
        <Col xs={24} md={16}>
          <Typography.Title
            level={3}
            className="event-settings__compitation-title"
          >
            Компетенции
          </Typography.Title>
          <Button
            onClick={() => setIsAddCompitationModalOpen(true)}
            type="primary"
            className="event-settings__add-compitation-btn"
          >
            Добавить компетенцию
          </Button>
          <Table columns={columns} dataSource={event.competitions} />
        </Col>
      </Row>
      <CompitationModal
        name="Добавить компетенцию"
        isOpen={isAddCompitationModalOpen}
        onOk={() => setIsAddCompitationModalOpen(false)}
        onCancel={() => setIsAddCompitationModalOpen(false)}
      />
    </div>
  );
}

export default EventSettings;
