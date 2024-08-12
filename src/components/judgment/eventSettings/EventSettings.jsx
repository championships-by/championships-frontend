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
import { DeleteOutlined, EditOutlined, TrophyOutlined,TeamOutlined } from "@ant-design/icons";
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
import { competenciesApi } from "@api";

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
  //Колонка пока закоменчена,потому что пока нет эндпоинта,который бы был с регламентом
  // {
  //   title: "Регламент",
  //   key: "regulations",
  //   render: () => (
  //     <Space>
  //       <Button type="text" icon={<LinkOutlined />} />
  //     </Space>
  //   ),
  // },
  {
    title: "Действия",
    key: "action",
    render: () => (
      <Space>
        <Button type="text" icon={<EditOutlined />} onClick={() => ShowModal()} />
        <Button type="text" icon={<TrophyOutlined />} />
        <Button type="text" icon={<TeamOutlined />} />
        <Button type="text" icon={<DeleteOutlined />} />
      </Space>
    ),
  },
];

function EventSettings() { 
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
    //Колонка пока закоменчена,потому что пока нет эндпоинта,который бы был с регламентом
    // {
    //   title: "Регламент",
    //   key: "regulations",
    //   render: () => (
    //     <Space>
    //       <Button type="text" icon={<LinkOutlined />} />
    //     </Space>
    //   ),
    // },
    {
      title: "Действия",
      key: "action",
      render: () => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => openEditModal()}/>
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
  const [ isEditModalOpen,setIsEditModalOpen ] = useState(false)
  const [dataNomination, setDataNomination] = useState([])
  const { eventID } = useParams();
  const [form] = Form.useForm();

  const openEditModal = () => {
    setIsEditModalOpen(true)
  }

  useEffect(() => {
    competenciesApi
      .getCompetenciesEventData(eventID)
      .then((response) => setDataNomination(response.data))
  })

  //Я пока хз что делать с этим и для чего этот запрос кроме загрузки страницы
  useEffect(() => {
    if (!eventID) {
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
            <EventLogo name="event_logo" />
            <EventEmail name="event_email" />
            <EventPlace name="event_place" />
            <EventRegulation name="event_regulation" />
            <EventRegisterDate name="event_register_date" />
            <EventDate name="event_date" />
            <EventRegistrationSwitch name="event_registartion" />
            <EventDescription name="event_description" />
            <EventLevel name="event_level" />
            <EventRequirements name="event_requirements" />
            <Button
              type="primary"
              htmlType="submit"
              loading={loadings[0]}
              onClick={() => {
                enterLoading(0);
                if (!eventID) {
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
          <Table columns={columns} dataSource={dataNomination} locale={{emptyText: "Нет данных"}}/>
        </Col>
      </Row>
      <CompitationModal
        name="Добавить компетенцию"
        isOpen={isAddCompitationModalOpen}
        onOk={() => setIsAddCompitationModalOpen(false)}
        onCancel={() => setIsAddCompitationModalOpen(false)}
      />
      <CompitationModal
      name="Редактировать компитенцию"
      isOpen={isEditModalOpen}
      onOk={() => setIsEditModalOpen(false)}
      onCancel={() => setIsEditModalOpen(false)}
      />
      
    </div>
  );
}

export default EventSettings;
