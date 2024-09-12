import { eventApi, teamApi } from "@api";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import TeamCreateModal from "@components/eventRegistration/TeamCreateModal";
import TeamsTable from "@components/eventRegistration/TeamsTable";
import Loader from "@components/loader/Loader";
import { ROUTES } from "@constants";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Row,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./sass/event-registration.scss";

function EventsRegistration() {
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataTeams, setTeams] = useState([]);
  const [dataEvent, setEvent] = useState({});
  const { eventID } = useParams();
  const items = [
    {
      title: "Мероприятия",
      href: ROUTES.EVENTS.PATH,
    },
    {
      title: dataEvent?.event?.name ?? "",
      href: ROUTES.EVENTS_DESCRIPTION.PATH(dataEvent?.event?.id),
    },
    {
      title: "Регистрация участников",
    },
  ];

  const getTeams = () => {
    teamApi
      .getTeam()
      .then((data) => setTeams(data))
      .catch(() =>
        message.error("Невозможно получить данные. Обратитесь к администратору")
      )
      .finally(() => setTimeout(() => setIsLoading(false), 300));
  };

  useEffect(() => {
    if (isLoading) {
      eventApi
        .getEvent(eventID)
        .then((response) => setEvent(response.data))
        .catch(() =>
          message.error(
            "Невозможно получить данные. Обратитесь к администратору"
          )
        );

      getTeams();
    }
  }, [isLoading, eventID]);

  return (
    <>
      <Loader show={isLoading} />
      <Row align="bottom">
        <Col>
          <Typography.Title level={2}>Регистрация участников</Typography.Title>
        </Col>
        <Col flex="auto">
          <AdminPanelControls>
            <Button type="primary" onClick={() => setIsAddTeamModalOpen(true)}>
              Добавить команду
            </Button>
          </AdminPanelControls>
        </Col>
      </Row>
      <Divider />
      <Breadcrumb className="event-registration__breadcrumb" items={items} />
      <TeamsTable TeamsData={dataTeams} />

      <TeamCreateModal
        isOpen={isAddTeamModalOpen}
        onOk={() => setIsAddTeamModalOpen(false)}
        onCancel={() => setIsAddTeamModalOpen(false)}
        onAdd={getTeams}
      />
    </>
  );
}

export default EventsRegistration;
