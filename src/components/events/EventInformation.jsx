import { InfoCircleOutlined, LinkOutlined } from "@ant-design/icons";
import { competenciesApi, eventApi } from "@api";
import noLogo from "@assets/img/auth-background.png";
import Loader from "@components/loader/Loader";
import {
  extendedDateFormat,
  NOMINATIONS,
  ROUTES,
  url,
  yaShareLink,
} from "@constants";
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
  Flex,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import EventPhotoGallery from "@modules/judgment/events/EventPhotoGallery";

import "./sass/event-information.scss";

function EventInformation() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [dataEvent, setEvent] = useState({});
  const [dataNominations, setNomination] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const { eventID } = useParams();
  const navigate = useNavigate();

  const columns = [
    {
      title: t("EVENTS.NOMINATION_NAME"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("EVENTS.COUNT_OF_REGISTERED_PARTICIPANTS"),
      dataIndex: "participant_count",
      key: "participant_count",
    },
    {
      title: t("COMMON.REGLAMENT"),
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
      title: t("COMMON.RESULTS"),
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
      title: t("EVENTS.EVENTS"),
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

        eventApi
          .getOrganizersRelatedToEvent(eventID)
          .then((organizerData) => {
            setOrganizers(organizerData);
          })
          .catch((error) => {
            console.error("Error fetching organizers:", error);
            message.error(t("MESSAGES.GET_ORGANIZERS_ERROR"));
          });
      } catch (error) {
        message.error(t("MESSAGES.GET_DATA_ERROR"));
      }
    } else {
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [eventID, t]);

  const onResultsClick = (nomination) => {
    const params = new URLSearchParams();
    params.append("event_id", eventID);
    params.append("nomination_id", nomination.id);

    competenciesApi.getNominationEventInfo(params).then((data) => {
      if (!data.tournament_started) {
        message.error(t("MESSAGES.TOURNAMENT_NOT_START"));
      } else if (!data.tournament_finished) {
        message.error(t("MESSAGES.TOURNAMENT_NOT_FINISHED"));
      } else {
        switch (nomination.kind) {
          case NOMINATIONS.TIME:
            navigate(ROUTES.JUDGMENT_TIME_MATCHES.PATH(eventID, nomination.id));
            break;
          case NOMINATIONS.CRITERIA:
            navigate(ROUTES.JUDGMENT_CRITERIA.PATH(eventID, nomination.id));
            break;
          case NOMINATIONS.OLYMPIC:
            navigate(ROUTES.JUDGMENT_GROUP_STAGE.PATH(eventID, nomination.id));
            break;
          default:
            message.error(t("MESSAGES.ERROR"));
            break;
        }
      }
    });
  };

  const finishDate = dayjs(dataEvent.registration_finish_date);
  const startDate = dayjs(dataEvent.registration_start_date);
  const now = dayjs();

  return (
    <div className="events__event-information__container">
      <Loader show={isLoading} />
      <Typography.Title level={2}>
        {t("EVENTS.INFO_ABOUT_EVENT")}
      </Typography.Title>
      <Divider />
      <Breadcrumb items={items} />
      <Row className="events__event-information__flex-container">
        <Col xs={24} sm={24} md={24} lg={10}>
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
        <Col xs={24} sm={24} md={24} lg={14}>
          <Row gutter={14}>
            <Col xs={20} sm={20} md={20}>
              <Typography.Title
                level={2}
                className="events__event-information__title"
              >
                {dataEvent.name}
              </Typography.Title>
            </Col>
            <Col xs={4} sm={4} md={4}>
              <div
                className="ya-share2 events__event-information__ya-share"
                data-curtain
                data-shape="round"
                data-limit="0"
                data-more-button-type="short"
                data-services="vkontakte,odnoklassniki,telegram,twitter,viber,whatsapp"
              />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              flex="1"
              className="events__event-information__align-right"
            >
              <Typography.Text strong>
                {t("EVENTS.DATE_OF_HOLDING")}
              </Typography.Text>
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
            <Col xs={24} sm={24} md={24}>
              <Typography.Text strong>
                {t("EVENTS.PLACE_OF_HOLDING")}
              </Typography.Text>
              <br />
              <Typography.Text>{dataEvent.event_place}</Typography.Text>
            </Col>
          </Row>
          <Row className="events__event-information__rows-margin">
            <Col xs={24} sm={24} md={12}>
              <Typography.Text strong>{t("COMMON.ORGANIZER")}</Typography.Text>
              <br />
              <Typography.Text>
                {organizers.length > 0
                  ? organizers.map((org) => org.name).join(", ")
                  : t("COMMON.NO_ORGANIZERS")}
              </Typography.Text>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={12}
              flex="1"
              className="events__event-information__align-right"
            >
              <Typography.Text strong>
                {t("COMMON.LEVEL_OF_EVENT")}
              </Typography.Text>
              <br />
              <Typography.Text>
                {t(getEventLevel(dataEvent.event_level))}
              </Typography.Text>
            </Col>
          </Row>
          <Row className="events__event-information__rows-margin">
            <Col>
              <Typography.Text strong>
                {t("COMMON.WHAT_NEED_TO_PARTICIPATE")}?
              </Typography.Text>
              <br />
              <Typography.Text>
                <span
                  dangerouslySetInnerHTML={{
                    __html: dataEvent.participation_needs,
                  }}
                />
              </Typography.Text>
            </Col>
          </Row>
          <Row
            align="bottom"
            className="events__event-information__rows-margin"
          >
            <Col xs={24} sm={24} md={12}>
              {finishDate > now && startDate < now ? (
                <Flex gap="small" align="center">
                  <Button
                    onClick={() =>
                      navigate(ROUTES.EVENTS_REGISTRATION.PATH(dataEvent.id))
                    }
                    type="primary"
                  >
                    {t("EVENTS.PARTICIPANT_REGISTRATION")}
                  </Button>
                  {t("EVENTS.TIME_UNTIL_PREPOSITION")}{" "}
                  {finishDate.format(extendedDateFormat)}
                </Flex>
              ) : finishDate > now ? (
                <Typography.Text>
                  {t("EVENTS.REGISTRATION_NOT_STARTED")}
                </Typography.Text>
              ) : (
                <Typography.Text>
                  {t("EVENTS.REGISTRATION_CLOSED")}
                </Typography.Text>
              )}
            </Col>
            <Col
              xs={24}
              sm={24}
              flex="1"
              className="events__event-information__align-right"
            >
              <Typography.Text strong>
                {t("COMMON.EMAIL_FOR_QUESTIONS")}
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
      <Typography.Title level={3}>
        {t("EVENTS.EVENT_DESCRIPTION")}
      </Typography.Title>
      <Typography.Text className="events__event-information__text">
        <span dangerouslySetInnerHTML={{ __html: dataEvent.description }} />
      </Typography.Text>
      <br />
      <Button
        className="events__event-information__regulation"
        type="primary"
        onClick={() => openPdf(dataEvent.event_rules)}
      >
        {t("COMMON.REGULATION")}
      </Button>
      <br />
      <Typography.Title level={3} className="event-settings__compitation-title">
        {t("COMMON.NOMINATIONS")}
      </Typography.Title>
      <Table
        columns={columns}
        dataSource={dataNominations}
        locale={{
          emptyText: t("COMMON.NO_NOMINATIONS"),
        }}
        rowKey="id"
        pagination={false}
      />
      <EventPhotoGallery eventId={eventID} />
    </div>
  );
}

export default EventInformation;
