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
  Tooltip,
  Modal,
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
import CompetitionModal from "@modules/judgment/events/CompetitionModal";
import ParticipantModal from "@modules/judgment/events/ParticipantModal";
import { eventApi, competenciesApi, participantApi } from "@api";
import { Locale, ROUTES, NOMINATION_TYPES, ModalType } from "@constants";

import "./sass/event-settings.scss";

const eventsBreadcromb = {
  title: "Управление мероприятиями",
  href: ROUTES.JUDGMENT.PATH,
};

const editEventBreadcromb = {
  title: "Редактирование мероприятия",
};

function EventSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadings, setLoadings] = useState([]);
  const [isAddCompitationModalOpen, setIsAddCompitationModalOpen] =
    useState(false);
  const [dataEvent, setEvent] = useState({});
  const [values, setValues] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openTrophyModal, setTrophyModal] = useState(false);
  const [participantModal, setParticipantModal] = useState(false);
  const [competenciesModal, setCompetenciesModal] = useState(false);
  const [switchDisabled, setSwitchDisabled] = useState(true);
  const [eventInfo, setEventInfo] = useState();
  const [published, setPublished] = useState(true);
  const [dataNomination, setDataNomination] = useState([]);
  const [selectedNomination, setSelectedNomination] = useState();
  const { eventID } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [dataNominationID, setNominationID] = useState();
  const [participantsInfo, setParticipantsInfo] = useState([]);

  const columns = [
    {
      title: "Название компетенции",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Тип соревнований",
      dataIndex: "kind",
      key: "kind",
      filters: [
        { text: "По времени", value: NOMINATION_TYPES.TIME },
        { text: "По критериям", value: NOMINATION_TYPES.CRITERIA },
        { text: "Плей-офф", value: NOMINATION_TYPES.OLYMPIC },
      ],
      onFilter: (value, record) => record.kind.includes(value),
    },
    {
      title: "Регламент",
      key: "reglament",
      render: (record) => (
        <Space>
          <Button
            type="text"
            icon={<LinkOutlined />}
            onClick={() => openLink(record)}
          />
        </Space>
      ),
    },
    {
      title: "Действия",
      key: "action",
      render: (record) => (
        <Space>
          <Tooltip title="Редактировать">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal(record.id)}
            />
          </Tooltip>
          <Tooltip title="Начать соревнование">
            <Button
              type="text"
              icon={<TrophyOutlined />}
              onClick={() => openCompetenciesModal(record)}
            />
          </Tooltip>
          <Tooltip title="Участники">
            <Button
              type="text"
              icon={<TeamOutlined />}
              onClick={() => openParticipantModal(record)}
            />
          </Tooltip>
          <Tooltip title="Удалить">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => deleteNominations(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const items = [
    eventsBreadcromb,
    {
      title: dataEvent?.event?.name ?? "",
      href: ROUTES.EVENTS_DESCRIPTION.PATH(dataEvent?.event?.id),
    },
    editEventBreadcromb,
  ];

  const eventId = parseInt(eventID, 10);

  const openEditModal = (id) => {
    setSelectedNomination(id);
    setIsEditModalOpen(true);
  };

  const startCriteriaStage = async (eventID, nominationID) => {
    const data = {
      event_id: eventID,
      nomination_id: nominationID,
    };
    try {
      await competenciesApi.startCriteriaStage(data);
    } catch (error) {
      return "failed";
    }
    return "success";
  };

  const startTimeStage = async (eventID, nominationID) => {
    const data = {
      event_id: eventID,
      nomination_id: nominationID,
    };
    try {
      await competenciesApi.startTimeStage(data);
    } catch (error) {
      return "failed";
    }
    return "success";
  };
  const openLink = (record) => {
    window.open(record.reglament);
  };

  const translateTypeFromEnglishIntoRussian = (type) => {
    switch (type) {
      case "time":
        return "По времени";
      case "criteria":
        return "По критериям";
      case "olympic":
        return "Плей-офф";
      default:
        return type;
    }
  };

  const translateTypeFromRussianIntoEnglish = (type) => {
    switch (type) {
      case "По критериям":
        return "criteria";
      case "По времени":
        return "time";
      case "Плей-офф":
        return "olympic";
      default:
        return type;
    }
  };

  const findNominationId = (name, response) => {
    const nomination = response.find((item) => item.name === name);
    return nomination ? nomination.id : null;
  };

  const deleteNominations = (record) => {
    const getNominationInfo = () => {
      const eventId = parseInt(eventID, 10);
      const nominationType = translateTypeFromRussianIntoEnglish(record.kind);
      const nominationName = record.name;
      const nominationID = findNominationId(nominationName, eventInfo);
      const data = {
        event_id: eventId,
        nomination_id: nominationID,
        type: nominationType,
      };
      return competenciesApi.deleteNomination(data);
    };

    if (eventInfo.length > 1 || !published) {
      Modal.confirm({
        title: "Вы уверены?",
        content: "Вы уверены что хотите удалить эту компетенцию?",
        footer: (_, { OkBtn, CancelBtn }) => (
          <>
            <OkBtn />
            <CancelBtn />
          </>
        ),
        okText: "Да",
        onOk: () => {
          getNominationInfo()
            .then(() => {
              message.success("Компетенция успешно удалена");
              getNominations();
            })
            .catch(() => {
              message.error("При удалении произошла ошибка");
            });
        },
        cancelText: "Отмена",
      });
    } else {
      message.error(
        "Прежде чем удалить последнюю компетенцию, снимите мероприятие с публикации"
      );
    }
  };
  const openCompetenciesModal = async (record) => {
    const competitionType = record.kind;
    const competitionName = record.name;
    const nominationID = findNominationId(competitionName, eventInfo);
    setNominationID(nominationID);

    const params = {
      event_id: eventID,
      nomination_id: nominationID,
    };

    let isTournamentStarted = false;
    let isTournamentFinished = false;

    try {
      await competenciesApi.getNominationEventInfo(params).then((data) => {
        isTournamentStarted = data.tournament_started;
        isTournamentFinished = data.tournament_finished;
      });
    } catch {}

    if (isTournamentFinished) {
      message.error("Турнир уже завершился");
      return;
    } else if (isTournamentStarted) {
      switch (competitionType) {
        case NOMINATION_TYPES.OLYMPIC:
          navigate(ROUTES.JUDGMENT_GROUP_STAGE.PATH(eventID, nominationID));
          break;
        case NOMINATION_TYPES.TIME:
          navigate(ROUTES.JUDGMENT_TIME_MATCHES.PATH(eventID, nominationID));
          break;
        case NOMINATION_TYPES.CRITERIA:
          navigate(ROUTES.JUDGMENT_CRITERIA.PATH(eventID, nominationID));
          break;
      }
      return;
    }

    switch (competitionType) {
      case NOMINATION_TYPES.OLYMPIC:
        setTrophyModal(true);
        break;
      default:
        Modal.confirm({
          title: "Вы уверены?",
          content:
            "Вы уверены, что хотите начать соревнование? Отменить данное действие будет невозможно!",
          footer: (_, { OkBtn, CancelBtn }) => (
            <>
              <OkBtn />
              <CancelBtn />
            </>
          ),
          okText: "Да",
          onOk: async () => {
            try {
              switch (competitionType) {
                case NOMINATION_TYPES.TIME:
                  let timeResult = await startTimeStage(eventId, nominationID);
                  switch (timeResult) {
                    case "success":
                      message.success("Соревнование успешно начато");
                      navigate(
                        ROUTES.JUDGMENT_TIME_MATCHES.PATH(eventID, nominationID)
                      );
                      break;
                    case "failed":
                      break;
                  }

                  break;
                case NOMINATION_TYPES.CRITERIA:
                  let creteriaResult = await startCriteriaStage(
                    eventId,
                    nominationID
                  );
                  switch (creteriaResult) {
                    case "success":
                      message.success("Соревнование успешно начато");
                      navigate(
                        ROUTES.JUDGMENT_CRITERIA.PATH(eventID, nominationID)
                      );
                      break;
                    case "failed":
                      break;
                  }
                  break;

                default:
                  break;
              }
            } catch (error) {}
          },
          cancelText: "Отмена",
        });
        break;
    }
  };

  const openParticipantModal = (record) => {
    const competitionType = translateTypeFromRussianIntoEnglish(record.kind);
    const competitionName = record.name;
    const nominationID = findNominationId(competitionName, eventInfo);

    participantApi
      .getParticipantsWithInfo(eventId, nominationID, competitionType)
      .then((data) => {
        setParticipantsInfo(data);
      });
    setParticipantModal(true);
  };

  const getNominations = () => {
    eventApi.getEvent(eventID).then((data) => {
      const translatedType = data.nominations.map((item) => ({
        ...item,
        kind: translateTypeFromEnglishIntoRussian(item.kind),
      }));
      setEventInfo(translatedType);
      if (translatedType.length > 0) {
        setSwitchDisabled(false);
      } else {
        setSwitchDisabled(true);
      }
    });
  };

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

          setPublished(values.published);
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
    getNominations();
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

    let eventSuccess = true;

    try {
      await eventApi.changeEvent(body);
    } catch (error) {
      message.error("При редактировании мероприятия произошла ошибка.");
      eventSuccess = false;
    }

    let logoSuccess = true;

    if (event_logo) {
      try {
        const formDataLogo = new FormData();
        formDataLogo.append("logo", event_logo);
        formDataLogo.append("event_id", eventID);
        await eventApi.changeLogo(formDataLogo);
      } catch (error) {
        message.error("При изменении логотипа произошла ошибка.");
        logoSuccess = false;
      }
    }

    let regulationSuccess = true;

    if (event_regulation) {
      try {
        const formDataRegulation = new FormData();
        formDataRegulation.append("rules", event_regulation);
        formDataRegulation.append("event_id", eventID);
        await eventApi.changeRegulation(formDataRegulation);
      } catch (error) {
        message.error("При изменении положения о проведении произошла ошибка.");
        regulationSuccess = false;
      }
    }

    return eventSuccess && logoSuccess && regulationSuccess;
  };

  const onValuesChange = (values) => {
    setValues((oldValues) => ({ ...oldValues, ...values }));
  };

  const onFinish = async () => {
    const success = await onSubmit();
    if (success) {
      message.success("Данные успешно сохранены");
      navigate(ROUTES.JUDGMENT.PATH);
    }
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
              required={false}
              onChange={onValuesChange}
              form={form}
            />
            <EventRegisterDate
              name="registration"
              value={values.registration}
              form={form}
              onChange={onValuesChange}
              isEdit={true}
            />
            <EventDate
              name="holding"
              value={values.holding}
              form={form}
              onChange={onValuesChange}
              isEdit={true}
            />
            <EventRegistrationSwitch
              name="published"
              value={values.published}
              onChange={onValuesChange}
              disabled={switchDisabled}
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
            dataSource={eventInfo}
            locale={Locale}
            pagination={false}
          />
        </Col>
      </Row>
      <CompitationModal
        name="Добавить компетенцию"
        isOpen={isAddCompitationModalOpen}
        onOk={() => setIsAddCompitationModalOpen(false)}
        onCancel={() => setIsAddCompitationModalOpen(false)}
        onAdd={getNominations}
        mode={ModalType.ADD}
        eventName={dataEvent?.event?.name}
      />
      <CompitationModal
        name="Редактировать компетенцию"
        isOpen={isEditModalOpen}
        onOk={() => setIsEditModalOpen(false)}
        onCancel={() => setIsEditModalOpen(false)}
        onAdd={getNominations}
        mode={ModalType.EDIT}
        nominationId={selectedNomination}
        eventName={dataEvent?.event?.name}
      />
      <CompetitionModal
        isOpen={openTrophyModal}
        onOk={() => setTrophyModal(false)}
        onCancel={() => setTrophyModal(false)}
        name="Настройки плей-офф"
        nominationID={dataNominationID}
      ></CompetitionModal>
      <ParticipantModal
        isOpen={participantModal}
        onOk={() => setParticipantModal(false)}
        onCancel={() => setParticipantModal(false)}
        name="Участники соревнования"
        data={participantsInfo}
      ></ParticipantModal>
    </div>
  );
}

export default EventSettings;
