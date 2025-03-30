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
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "@components/loader/Loader";
import EventName from "@modules/judgment/events/EventName";
import EventDate from "@modules/judgment/events/EventDate";
import EventRegisterDate from "@modules/judgment/events/EventRegisterDate";
import EventDescription from "@modules/judgment/events/EventDescription";
import EventRequirements from "@modules/judgment/events/EventRequirements";
import EventEmail from "@modules/judgment/events/EventEmail";
import EventOrganizerName from "@modules/judgment/events/EventOrganizerName";
import EventLevel from "@modules/judgment/events/EventLevel";
import EventPlace from "@modules/judgment/events/EventPlace";
import EventRegistrationSwitch from "@modules/judgment/events/EventRegistrationSwitch";
import EventRegulation from "@modules/judgment/events/EventRegulation";
import EventLogo from "@modules/judgment/events/EventLogo";
import EventPhotoGallery from "@modules/judgment/events/EventPhotoGallery";
import CompitationModal from "./EventSettingsModal";
import CompetitionModal from "@modules/judgment/events/CompetitionModal";
import CompetitionGroupModal from "@modules/judgment/events/CompetitionGroupModal";
import ParticipantModal from "@modules/judgment/events/ParticipantModal";
import ParticipantsCheckingModal from "./ParticipantsCheckingModal";
import { eventApi, competenciesApi, participantApi, organizerApi } from "@api";
import {
  tableLocale,
  ROUTES,
  NOMINATION_TYPES,
  STATUS_OF_EVENT,
  ModalType,
  NOMINATIONS,
} from "@constants";
import { getTranslation } from "@utils";
import { useTranslation } from "react-i18next";

import "./sass/event-settings.scss";

function EventSettings() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [loadings, setLoadings] = useState([]);
  const [isAddCompitationModalOpen, setIsAddCompitationModalOpen] =
    useState(false);
  const [dataEvent, setEvent] = useState({});
  const [values, setValues] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openTrophyModal, setTrophyModal] = useState(false);
  const [openTrophyGroupModal, setTrophyGroupModal] = useState(false);
  const [participantModal, setParticipantModal] = useState(false);
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
  const [fileList, setFileList] = useState([]);
  const [competitionVal, setCompetitionVal] = useState([]);
  const [nextModalType, setNextModalType] = useState(null);
  const [isParticipantsCheckingModalOpen, setIsParticipantsCheckingModalOpen] =
    useState(false);
  const [participantsData, setParticipantsData] = useState();
  const [eventCompetenciesData, setEventCompetenciesData] = useState(null);
  const [competenciesParticipantsData, setCompetenciesParticipantsData] =
    useState([]);

  useEffect(() => {
    const getEventCompetenciesData = async () => {
      try {
        const params = new URLSearchParams({
          event_id: eventID,
          related: "true",
        });

        const result =
          await eventApi.getEventWithNominationsAndTeamParticipants(
            params.toString()
          );
        setEventCompetenciesData(result);
      } catch (error) {}
    };

    getEventCompetenciesData();
  }, []);

  const eventsBreadcromb = {
    title: t(ROUTES.JUDGMENT.TITLE),
    href: ROUTES.JUDGMENT.PATH,
  };

  const editEventBreadcromb = {
    title: t("EVENTS.EVENT_EDIT"),
  };

  const columns = [
    {
      title: t("EVENTS.NOMINATION_NAME"),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: t("EVENTS.TYPE_OF_TOURNAMENTS"),
      dataIndex: "kind",
      key: "kind",
      render: (record) => {
        switch (record) {
          case NOMINATIONS.TIME:
            return t(NOMINATION_TYPES.TIME);
          case NOMINATIONS.GROUP:
            return t(NOMINATION_TYPES.GROUP);
          case NOMINATIONS.CRITERIA:
            return t(NOMINATION_TYPES.CRITERIA);
          case NOMINATIONS.OLYMPIC:
            return t(NOMINATION_TYPES.OLYMPIC);
          default:
            return record;
        }
      },
      filters: [
        { text: t(NOMINATION_TYPES.TIME), value: NOMINATIONS.TIME },
        {
          text: t(NOMINATION_TYPES.CRITERIA),
          value: NOMINATIONS.CRITERIA,
        },
        {
          text: t(NOMINATION_TYPES.OLYMPIC),
          value: NOMINATIONS.OLYMPIC,
        },
        {
          text: t(NOMINATION_TYPES.GROUP),
          value: NOMINATIONS.GROUP,
        },
      ],
      onFilter: (value, record) => record.kind.includes(value),
    },
    {
      title: t("EVENTS.NUMBER_OF_PARTICIPANTS"),
      dataIndex: "participant_count",
      key: "participant_count",
    },
    {
      title: t("COMMON.REGLAMENT"),
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
      title: t("COMMON.ACTIONS"),
      key: "action",
      render: (record) => (
        <Space>
          <Tooltip title={t("COMMON.EDIT")}>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal(record.id)}
            />
          </Tooltip>
          <Tooltip title={t("EVENTS.START_TOURNAMENT")}>
            <Button
              type="text"
              icon={<TrophyOutlined />}
              onClick={() => openCompetenciesModal(record)}
            />
          </Tooltip>
          <Tooltip title={t("COMMON.PARTICIPANTS")}>
            <Button
              type="text"
              icon={<TeamOutlined />}
              onClick={() => openParticipantModal(record)}
            />
          </Tooltip>
          <Tooltip title={t("COMMON.DELETE")}>
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
    const data = { event_id: eventID, nomination_id: nominationID };
    try {
      await competenciesApi.startCriteriaStage(data);
    } catch (error) {
      return STATUS_OF_EVENT.FAILED;
    }
    return STATUS_OF_EVENT.SUCCESS;
  };

  const startTimeStage = async (eventID, nominationID) => {
    const data = { event_id: eventID, nomination_id: nominationID };
    try {
      await competenciesApi.startTimeStage(data);
    } catch (error) {
      return STATUS_OF_EVENT.FAILED;
    }
    return STATUS_OF_EVENT.SUCCESS;
  };

  const openLink = (record) => {
    window.open(record.reglament);
  };

  const findNominationId = (name, response) => {
    const nomination = response.find((item) => item.name === name);
    return nomination ? nomination.id : null;
  };

  const deleteNominations = (record) => {
    const getNominationInfo = () => {
      const eventId = parseInt(eventID, 10);
      const nominationType = record.kind;
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
        title: t("COMMON.ARE_YOU_SURE"),
        content: t("EVENTS.ARE_YOU_SURE_REMOVE_NOMINATION"),
        footer: (_, { OkBtn, CancelBtn }) => (
          <>
            <OkBtn />
            <CancelBtn />
          </>
        ),
        okText: t("COMMON.YES"),
        onOk: () => {
          getNominationInfo()
            .then(() => {
              message.success(t("MESSAGES.SUCCESS_DELETE_NOMINATION"));
              getNominations();
            })
            .catch(() => {
              message.error(t("MESSAGES.DELETE_ERROR"));
            });
        },
        cancelText: t("COMMON.CANCEL"),
      });
    } else {
      message.error(t("MESSAGES.DISABLE_PUBLISH_FOR_REMOVE_NOMINATION"));
    }
  };

  const nextModal = (modal, values, participantsPresenseData) => {
    setCompetenciesParticipantsData(participantsPresenseData);
    console.log("finish data: ", participantsPresenseData);

    setIsParticipantsCheckingModalOpen(false);
    switch (modal) {
      case NOMINATIONS.OLYMPIC:
        setTrophyModal(true);
        break;
      case NOMINATIONS.GROUP:
        setTrophyGroupModal(true);
        break;
      case NOMINATIONS.TIME || NOMINATIONS.CRITERIA:
        startConfirmation(values[0], values[1], values[2]);
      default:
        break;
    }
  };

  const startConfirmation = (competitionType, eventID, nominationID) => {
    setIsParticipantsCheckingModalOpen(false);
    Modal.confirm({
      title: t("COMMON.ARE_YOU_SURE"),
      content: t("MESSAGES.ARE_YOU_SURE_TO_START_TOURNAMENT"),
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <OkBtn />
          <CancelBtn />
        </>
      ),
      okText: t("COMMON.YES"),
      onOk: async () => {
        try {
          switch (competitionType) {
            case NOMINATIONS.TIME:
              let timeResult = await startTimeStage(eventId, nominationID);
              if (timeResult === STATUS_OF_EVENT.SUCCESS) {
                message.success(t("MESSAGES.SUCCESS_TOURNAMENT_START"));
                navigate(
                  ROUTES.JUDGMENT_TIME_MATCHES.PATH(eventID, nominationID)
                );
              }
              break;
            case NOMINATIONS.CRITERIA:
              let criteriaResult = await startCriteriaStage(
                eventId,
                nominationID
              );
              if (criteriaResult === STATUS_OF_EVENT.SUCCESS) {
                message.success(t("MESSAGES.SUCCESS_TOURNAMENT_START"));
                navigate(ROUTES.JUDGMENT_CRITERIA.PATH(eventID, nominationID));
              }
              break;
          }
        } catch (error) {}
      },
      cancelText: t("COMMON.CANCEL"),
    });
  };

  const openCompetenciesModal = async (record) => {
    const competitionType = record.kind;
    const competitionName = record.name;
    const nominationID = findNominationId(competitionName, eventInfo);
    setNominationID(nominationID);

    try {
      eventCompetenciesData.find((item) => {
        if (item.nomination_id === nominationID) {
          setParticipantsData(item);
          return item;
        }
      });
    } catch (error) {}
    try {
      const params = { event_id: eventID, nomination_id: nominationID };
      const data = await competenciesApi.getNominationEventInfo(params);
      if (data.tournament_finished) {
        message.error(t("MESSAGES.TOURNAMENT_FINISHED"));
        return;
      } else if (data.tournament_started) {
        switch (competitionType) {
          case NOMINATIONS.GROUP:
            navigate(ROUTES.JUDGMENT_GROUP_STAGE.PATH(eventID, nominationID));
            break;
          case NOMINATIONS.OLYMPIC:
            navigate(ROUTES.JUDGMENT_PLAYOFF_STAGE.PATH(eventID, nominationID));
            break;
          case NOMINATIONS.TIME:
            navigate(ROUTES.JUDGMENT_TIME_MATCHES.PATH(eventID, nominationID));
            break;
          case NOMINATIONS.CRITERIA:
            navigate(ROUTES.JUDGMENT_CRITERIA.PATH(eventID, nominationID));
            break;
        }
        return;
      }
    } catch {
      return;
    }

    setNextModalType(competitionType);

    switch (competitionType) {
      case NOMINATIONS.OLYMPIC:
        setIsParticipantsCheckingModalOpen(true);

        break;
      case NOMINATIONS.GROUP:
        setIsParticipantsCheckingModalOpen(true);

        break;
      default:
        setCompetitionVal([competitionType, eventID, nominationID]);
        setIsParticipantsCheckingModalOpen(true);

        break;
    }
  };

  const openParticipantModal = (record) => {
    const competitionType = record.kind;
    const competitionName = record.name;
    const nominationID = record.id;

    participantApi
      .getParticipantsWithInfo(eventId, nominationID, competitionType)
      .then((data) => {
        const updatedData = data.map((entry) => ({
          ...entry,
          event_id: eventId,
          nomination_id: nominationID,
          competition_type: competitionType,
        }));
        setParticipantsInfo(updatedData);
      });

    setParticipantModal(true);
  };

  const getNominations = () => {
    eventApi.getEventByJudge(eventID).then((data) => {
      setEventInfo(data.nominations);
      if (data.nominations.length > 0) {
        setSwitchDisabled(false);
      } else {
        setSwitchDisabled(true);
      }
    });
  };

  useEffect(() => {
    if (eventID) {
      try {
        eventApi.getEventByJudge(eventID).then((data) => {
          setEvent(data);
          const { event } = data;

          const initialValues = {
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
            existing_logo_path: event.logo_path,
            existing_rules_path: event.event_rules,
          };
          form.setFieldsValue(initialValues);
          setPublished(initialValues.published);
          setValues(initialValues);
          setTimeout(() => setIsLoading(false), 300);
        });
      } catch (error) {
        message.error(t("MESSAGES.GET_DATA_ERROR"));
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
    } = { ...values };

    const organizers = form.getFieldValue("organizers");

    const allOrganizers = await organizerApi.getOrganizers();
    const organizersWithIds = organizers.map((orgName) => {
      const organizer = allOrganizers.find((o) => o.name === orgName);
      return organizer
        ? { id: organizer.id, name: organizer.name }
        : { name: orgName };
    });

    const eventData = {
      id: eventID,
      name: dataEvent.event?.name === name ? undefined : name,
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
      organizers: organizersWithIds || [],
    };

    const body = new URLSearchParams({
      event_data: JSON.stringify(eventData),
    });

    let eventSuccess = true;

    try {
      await eventApi.changeEvent(body);
    } catch (error) {
      message.error(t("MESSAGES.EVENT_EDIT_ERROR"));
      eventSuccess = false;
    }

    let logoSuccess = true;

    if (event_logo && event_logo instanceof File) {
      try {
        const formDataLogo = new FormData();
        formDataLogo.append("logo", event_logo);
        formDataLogo.append("event_id", eventID);
        await eventApi.changeLogo(formDataLogo);
      } catch (error) {
        message.error(t("MESSAGES.LOGO_EDIT_ERROR"));
        logoSuccess = false;
      }
    }

    let regulationSuccess = true;

    if (event_regulation && event_regulation instanceof File) {
      try {
        const formDataRegulation = new FormData();
        formDataRegulation.append("rules", event_regulation);
        formDataRegulation.append("event_id", eventID);
        await eventApi.changeRegulation(formDataRegulation);
      } catch (error) {
        message.error(t("MESSAGES.REGULATION_EDIT_ERROR"));
        regulationSuccess = false;
      }
    }

    return eventSuccess && logoSuccess && regulationSuccess;
  };

  const onValuesChange = (changedValues) => {
    setPublished(!published);
    if (changedValues.event_logo?.status === STATUS_OF_EVENT.REMOVED) {
      changedValues.event_logo = null;
    }

    setValues((oldValues) => ({
      ...oldValues,
      ...changedValues,
    }));
  };

  const onFinish = async () => {
    const success = await onSubmit();
    if (success) {
      message.success(t("MESSAGES.SUCCESS_MESSAGE"));
      navigate(ROUTES.JUDGMENT.PATH);
    }
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
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
      <Typography.Title level={2}>{t("EVENTS.EVENT_EDIT")}</Typography.Title>
      <Breadcrumb items={items} />
      <Row gutter={16}>
        <Col xs={24} sm={24} md={18} lg={8}>
          <Form
            name="event"
            form={form}
            layout="vertical"
            requiredMark="optional"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
          >
            <Typography.Title level={3}>
              {t("EVENTS.EVENT_DATA")}
            </Typography.Title>
            <EventName name="name" value={values.name} />
            <EventLogo
              name="event_logo"
              value={values.event_logo}
              required={false}
              onChange={onValuesChange}
              form={form}
              existingImage={values.existing_logo_path}
              fileList={fileList}
              setFileList={setFileList}
            />
            <EventEmail
              name="participant_question_email"
              value={values.participant_question_email}
            />
            <EventOrganizerName
              name="organizers"
              eventId={eventID}
              form={form}
              required={true}
              onChange={onValuesChange}
            />
            <EventPlace name="event_place" value={values.event_place} />
            <EventRegulation
              name="event_regulation"
              value={values.event_regulation}
              required={false}
              onChange={onValuesChange}
              form={form}
              existing={values.existing_rules_path}
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
            <EventDescription
              name="description"
              value={values.description}
              form={form}
              onChange={onValuesChange}
            />
            <EventLevel
              name="event_level"
              value={values.event_level}
              form={form}
              onChange={onValuesChange}
            />
            <EventRequirements
              name="participation_needs"
              value={values.participation_needs}
              form={form}
              onChange={onValuesChange}
            />
            <Button type="primary" htmlType="submit" loading={loadings[0]}>
              {t("COMMON.SAVE")}
            </Button>
          </Form>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16}>
          <Typography.Title
            level={3}
            className="event-settings__compitation-title"
          >
            {t("COMMON.NOMINATIONS")}
          </Typography.Title>
          <Button
            onClick={() => setIsAddCompitationModalOpen(true)}
            type="primary"
            className="event-settings__add-compitation-btn"
          >
            {t("EVENTS.ADD_NOMINATION")}
          </Button>
          <Table
            columns={columns}
            dataSource={eventInfo}
            locale={getTranslation(tableLocale, t)}
            pagination={false}
          />
          <EventPhotoGallery eventId={eventID} forEdit={true} />
        </Col>
      </Row>
      <CompitationModal
        name={t("EVENTS.ADD_NOMINATION")}
        isOpen={isAddCompitationModalOpen}
        onOk={() => setIsAddCompitationModalOpen(false)}
        onCancel={() => setIsAddCompitationModalOpen(false)}
        onAdd={getNominations}
        mode={ModalType.ADD}
        eventName={dataEvent?.event?.name}
      />
      <CompitationModal
        name={t("EVENTS.EDIT_NOMINATION")}
        isOpen={isEditModalOpen}
        onOk={() => setIsEditModalOpen(false)}
        onCancel={() => setIsEditModalOpen(false)}
        onAdd={getNominations}
        mode={ModalType.EDIT}
        nominationId={selectedNomination}
        eventName={dataEvent?.event?.name}
      />
      <ParticipantsCheckingModal
        data={participantsData}
        onOk={(participantsPresenseData) =>
          nextModal(nextModalType, competitionVal, participantsPresenseData)
        }
        isOpen={isParticipantsCheckingModalOpen}
        onCancel={() => setIsParticipantsCheckingModalOpen(false)}
      />
      <CompetitionModal
        isOpen={openTrophyModal}
        onOk={() => setTrophyModal(false)}
        onCancel={() => setTrophyModal(false)}
        name={t("EVENTS.PLAYOFF_SETTINGS")}
        nominationID={dataNominationID}
      />
      <CompetitionGroupModal
        isOpen={openTrophyGroupModal}
        onOk={() => setTrophyGroupTModal(false)}
        onCancel={() => setTrophyGroupModal(false)}
        name={t("EVENTS.GROUP_SETTINGS")}
        nominationID={dataNominationID}
      />
      <ParticipantModal
        isOpen={participantModal}
        onOk={() => setParticipantModal(false)}
        onCancel={() => setParticipantModal(false)}
        name={t("EVENTS.TOURNAMENT_PARTICIPANTS")}
        data={participantsInfo}
      />
    </div>
  );
}

export default EventSettings;
