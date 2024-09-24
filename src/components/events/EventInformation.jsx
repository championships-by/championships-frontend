import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { competenciesApi, eventApi } from "@api";
import noLogo from "@assets/img/auth-background.png";
import Loader from "@components/loader/Loader";
import { ROUTES, url, yaShareLink } from "@constants";
import { changeDateFormat, getEventLevel, openPdf } from "@utils";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  message,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./sass/events.scss";

function EventInformation() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataEvent, setEvent] = useState({});
  const [dataNominations, setNomination] = useState([]);
  const { eventID } = useParams();
  const navigate = useNavigate();

  const columns = [
    {
      title: "Название компетенции",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Количество зарегистрированных участников",
      dataIndex: "participant_count",
      key: "participant_count",
    },
    {
      title: "Регламент",
      key: "reglament",
      render: (record) => (
        <Space>
          <a href={record.reglament} target="_blank" rel="noopener noreferrer">
            <Button type="text" icon={<LinkOutlined />} />
          </a>
        </Space>
      ),
    },
    {
      title: "Итоги",
      key: "results",
      render: (record) => (
        <Space>
          <Button
            onClick={() => onResultsClick(record)}
            type="text"
            icon={<InfoCircleOutlined />}
          />
        </Space>
      ),
    },
  ];

  const items = [
    {
      title: "Мероприятия",
      href: ROUTES.EVENTS.PATH,
    },
    {
      title: dataEvent.name,
    },
  ];

  useEffect(() => {
    if (eventID) {
      try {
        eventApi.getEvent(eventID).then((data) => {
          setEvent(data.event);
          setNomination(data.nominations);

          const script = document.createElement("script");
          script.src = yaShareLink;
          script.async = true;
          document.body.appendChild(script);
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
  }, [eventID]);

  const onResultsClick = (nomination) => {
    competenciesApi
      .getNominationEventInfo(eventID, nomination.id)
      .then((response) => {
        const data = response.data;
        if (!data.tournament_started) {
          message.error("Соревнование ещё не началось");
        } else if (!data.tournament_finished) {
          message.error("Соревнование ещё не закончилось");
        } else {
          if (nomination.kind == "time") {
            navigate(ROUTES.JUDGMENT_TIME_MATCHES.PATH(eventID, nomination.id));
          } else if (nomination.kind == "criteria") {
            navigate(ROUTES.JUDGMENT_CRITERIA.PATH(eventID, nomination.id));
          } else if (nomination.kind == "olympic") {
            navigate(ROUTES.JUDGMENT_GROUP_STAGE.PATH(eventID, nomination.id));
          } else {
            message.error("Произошла ошибка");
          }
        }
      });
  };

  const finishDate = new Date(dataEvent.registration_finish_date);
  const now = new Date();

  return (
    <div className="events__event-information__container">
      <Loader show={isLoading} />
      <Typography.Title level={2}>Информация о мероприятии</Typography.Title>
      <Divider />
      <Breadcrumb items={items} />
      <Row className="events__event-information__flex-container">
        <Col span={10}>
          <img
            alt="Logo"
            src={
              dataEvent.logo_path !== "/" && dataEvent.logo_path
                ? `${url}/${dataEvent.logo_path}`
                : noLogo
            }
            className={
              dataEvent.logo_path !== "/" && dataEvent.logo_path
                ? "events__event-information__img"
                : "events__event-information__noImg"
            }
          />
        </Col>
        <Col span={14}>
          <Row gutter={14}>
            <Col>
              <Typography.Title
                level={2}
                className="events__event-information__title"
              >
                {dataEvent.name}
              </Typography.Title>
            </Col>
            <Col>
              <div
                className="ya-share2 events__event-information__ya-share"
                data-curtain
                data-shape="round"
                data-limit="0"
                data-more-button-type="short"
                data-services="vkontakte,odnoklassniki,telegram,twitter,viber,whatsapp"
              />
            </Col>
            <Col flex="1" className="events__event-information__align-right">
              <Typography.Text strong>Дата проведения</Typography.Text>
              <br />
              <Typography.Text>
                {changeDateFormat(dataEvent.holding_start_date) !==
                changeDateFormat(dataEvent.holding_finish_date)
                  ? `c ${changeDateFormat(
                      dataEvent.holding_start_date
                    )} по ${changeDateFormat(dataEvent.holding_finish_date)}`
                  : changeDateFormat(dataEvent.holding_start_date)}
              </Typography.Text>
            </Col>
          </Row>
          <Row className="events__event-information__rows-margin">
            <Col>
              <Typography.Text strong>Место проведения</Typography.Text>
              <br />
              <Typography.Text>{dataEvent.event_place}</Typography.Text>
            </Col>
          </Row>
          <Row className="events__event-information__rows-margin">
            <Col>
              <Typography.Text strong>Организатор</Typography.Text>
              <br />
              <Typography.Text>
                {dataEvent.educational_institution}
              </Typography.Text>
            </Col>
            <Col flex="1" className="events__event-information__align-right">
              <Typography.Text strong>Уровень мероприятия</Typography.Text>

              <br />
              <Typography.Text>
                {getEventLevel(dataEvent.event_level)}
              </Typography.Text>
            </Col>
          </Row>
          <Row className="events__event-information__rows-margin">
            <Col>
              <Typography.Text strong>Что нужно для участия?</Typography.Text>
              <br />
              <Typography.Text>{dataEvent.participation_needs}</Typography.Text>
            </Col>
          </Row>
          <Row
            align="bottom"
            className="events__event-information__rows-margin"
          >
            <Col>
              {finishDate > now ? (
                <Button
                  onClick={() =>
                    navigate(ROUTES.EVENTS_REGISTRATION.PATH(dataEvent.id))
                  }
                  type="primary"
                >
                  Регистрация участников
                </Button>
              ) : (
                <Typography.Text>Регистрация закрыта</Typography.Text>
              )}
            </Col>
            <Col flex="1" className="events__event-information__align-right">
              <Typography.Text strong>
                Email для вопросов участников
              </Typography.Text>
              <br />
              <Typography.Text>
                <a href={`mailto:${dataEvent.participant_question_email}`}>
                  {dataEvent.participant_question_email}
                </a>
              </Typography.Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Typography.Title level={3}>Описание мероприятия</Typography.Title>
      <Typography.Text className="events__event-information__text">
        {dataEvent.description}
      </Typography.Text>
      <br />
      <Button
        className="events__event-information__regulation"
        type="primary"
        onClick={() => openPdf(dataEvent.event_rules)}
      >
        Положение
      </Button>
      <br />
      <Typography.Title level={3} className="event-settings__compitation-title">
        Компетенции
      </Typography.Title>
      <Table
        columns={columns}
        dataSource={dataNominations}
        locale={{
          emptyText: "Компетенции пока отсутствуют",
        }}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
}

export default EventInformation;
