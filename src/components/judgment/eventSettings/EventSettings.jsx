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
import EventDescription from "@modules/judgment/events/EventDescription";
import EventEmail from "@modules/judgment/events/EventEmail";
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
    title: "Количество зарегестрированных участников",
    dataIndex: "porticipants_count",
    key: "porticipants_count",
  },
  {
    title: "Действия",
    key: "action",
    render: () => (
      <Space>
        <Button type="text" icon={<EditOutlined />} />
        <Button type="text" icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];

function EventSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadings, setLoadings] = useState([]);
  const [isAddCompitationModalOpen, setIsAddCompitationModalOpen] =
    useState(false);
  const [dataEvent, setEvent] = useState({});
  const { eventID } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    if (eventID !== undefined) {
      try {
        eventApi
          .getEvent(eventID)
          .then((response) => response.json())
          .then((data) => {
            setEvent(data);
            form.setFieldsValue({
              event_name: data?.event_data?.name,
              event_date: data?.event_data?.date,
            });
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

  const update_event_request = async () => {
    const body = JSON.stringify({
      id: eventID,
      new_name: form.getFieldValue("event_name"),
      new_date: dayjs(form.getFieldValue("event_date")).format("YYYY-MM-DD"),
    });

    eventApi.changeEvent(body);
  };

  const create_event_request = async () => {
    const body = JSON.stringify({
      name: form.getFieldValue("event_name"),
      date: dayjs(form.getFieldValue("event_date")).format("YYYY-MM-DD"),
    });

    eventApi.setEvent(body);
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
      <Breadcrumb
        items={[
          {
            title: "Мероприятия",
            href: "./",
          },
          {
            title: "Настройка мероприятия",
          },
        ]}
      />
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form
            form={form}
            layout="vertical"
            requiredMark="optional"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Typography.Title level={3}>Данные мероприятия</Typography.Title>
            <EventName name="event_name" />
            <EventDate name="event_date" />
            <EventRegistrationSwitch name="event_registartion" />
            <EventEmail name="event_email" />
            <EventPlace name="event_place" />
            <EventLogo name="event_logo" />
            <EventRegulation name="event_regulation" />
            <EventDescription name="event_description" />
            <Button
              type="primary"
              htmlType="submit"
              loading={loadings[0]}
              onClick={() => {
                enterLoading(0);
                if (!eventID === undefined) {
                  create_event_request();
                } else {
                  update_event_request();
                }
              }}
            >
              Сохранить данные
            </Button>
          </Form>
        </Col>
        <Col xs={24} md={16}>
          <Typography.Title level={3}>Компетенции</Typography.Title>
          <Button
            onClick={() => setIsAddCompitationModalOpen(true)}
            type="primary"
          >
            Добавить компетенцию
          </Button>
          <Table columns={columns} dataSource={dataEvent.competitions} />
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
