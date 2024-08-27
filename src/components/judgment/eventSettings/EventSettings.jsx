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
import {
  DeleteOutlined,
  EditOutlined,
  TrophyOutlined,
  TeamOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { ROUTES } from "@constants";
import { eventApi } from "@api";
import { competenciesApi } from "@api";

import "./sass/event-settings.scss";

const columns = [
  {
    title: "Название компетенции",
    dataIndex: "nomination_name",
    key: "nomination_name",
  },
  {
    title: "Тип соревнований",
    dataIndex: "type",
    key: "type",
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
        <Button type="text" icon={<EditOutlined />} onClick={showModal} />
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
  const navigate = useNavigate();

  const columns = [
    {
      title: "Название компетенции",
      dataIndex: "nomination_name",
      key: "nomination_name",
    },
    {
      title: "Тип соревнований",
      dataIndex: "type",
      key: "type",
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
          <Button type="text" icon={<EditOutlined />} onClick={openEditModal} />
          <Button type="text" icon={<TrophyOutlined />} />
          <Button type="text" icon={<TeamOutlined />} />
          <Button type="text" icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [loadings, setLoadings] = useState([]);
  const [isAddCompitationModalOpen, setIsAddCompitationModalOpen] =
    useState(false);
  const [dataEvent, setEvent] = useState({});
  const [values, setValues] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dataNomination, setDataNomination] = useState([]);
  const { eventID } = useParams();
  const [form] = Form.useForm();

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    competenciesApi
      .getCompetenciesEventData(eventID)
      .then((response) => setDataNomination(response.data));
  });

  useEffect(() => {
    if (eventID) {
      try {
        eventApi.getEvent(eventID).then((data) => {
          setEvent(data);

          const { event } = data;

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
  }, [eventID, form]);

  const onSubmit = async () => {
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
      event_logo,
      event_regulation,
    } = values;

    const body = new URLSearchParams({
      event_data: JSON.stringify({
        id: eventID,
        name: dataEvent.event.name === name ? undefined : name,
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
    try {
      eventApi.changeEvent(body);
    } catch (error) {
      message.error("При редактировании мероприятия произошла ошибка.");
    }
    if (event_logo) {
      try {
        const formData = new FormData();
        formData.append("logo", event_logo);
        formData.append("event_id", eventID);
        eventApi.changeLogo(formData);
      } catch (error) {
        message.error("При изменение логотипа произошла ошибка.");
      }
    }

    if (event_regulation) {
      try {
        const formData = new FormData();
        formData.append("rules", event_regulation);
        formData.append("event_id", eventID);
        eventApi.changeRegulation(formData);
      } catch (error) {
        message.error("При изменение положение о проведении произошла ошибка.");
      }
    }
  };

  const onValuesChange = (values) => {
    setValues((oldValues) => ({ ...oldValues, ...values }));
  };

  const onFinish = () => {
    try {
      onSubmit();
    } catch (error) {
      return;
    }

    message.success("Всё в порядке!");
    navigate(ROUTES.JUDGMENT.PATH);
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
            <EventLogo
              name="event_logo"
              value={values.event_logo}
              required={false}
              onChange={onValuesChange}
            />
            <EventEmail
              name="participant_question_email"
              value={values.participant_question_email}
            />
            <EventPlace name="event_place" value={values.event_place} />
            <EventRegulation
              name="event_regulation"
              value={values.event_regulation}
              required={false}
              onChange={onValuesChange}
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
              disabled={false}
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
            <Button type="primary" htmlType="submit" loading={loadings[0]}>
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
          <Table
            columns={columns}
            dataSource={dataNomination}
            locale={{ emptyText: "Нет данных" }}
          />
        </Col>
      </Row>
      <CompitationModal
        name="Добавить компетенцию"
        isOpen={isAddCompitationModalOpen}
        onOk={() => setIsAddCompitationModalOpen(false)}
        onCancel={() => setIsAddCompitationModalOpen(false)}
      />
      <CompitationModal
        name="Редактировать компетенцию"
        isOpen={isEditModalOpen}
        onOk={() => setIsEditModalOpen(false)}
        onCancel={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}

export default EventSettings;
