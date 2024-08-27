import { Button, Typography, message, Breadcrumb } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TeamCreateModal from "@components/eventRegistration/TeamCreateModal";
import TeamsTable from "@components/eventRegistration/TeamsTable";
import Loader from "@components/loader/Loader";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import { teamApi, eventApi } from "@api";
import { ROUTES } from "@constants";

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
      href: "./",
    },
    {
      title: dataEvent?.event?.name ?? "",
      href: ROUTES.EVENTS_DESCRIPTION.PATH(dataEvent?.event?.id),
    },
    {
      title: "Регистрация участников",
    },
  ];

  useEffect(() => {
    if (isLoading) {
      eventApi
        .getEvent(eventID)
        .then((data) => setEvent(data))
        .catch(() =>
          message.error(
            "Невозможно получить данные. Обратитесь к администратору"
          )
        );

      teamApi
        .getTeam()
        .then((data) => setTeams(data))
        .catch(() =>
          message.error(
            "Невозможно получить данные. Обратитесь к администратору"
          )
        )
        .finally(() => setTimeout(() => setIsLoading(false), 300));
    }
  }, [isLoading, eventID]);

  return (
    <>
      <Loader show={isLoading} />
      <Typography.Title level={2}>Регистрация участников</Typography.Title>
      <Breadcrumb items={items} />
      <AdminPanelControls>
        <Button type="primary" onClick={() => setIsAddTeamModalOpen(true)}>
          Добавить команду
        </Button>
      </AdminPanelControls>

      <TeamsTable TeamsData={dataTeams} />

      <TeamCreateModal
        isOpen={isAddTeamModalOpen}
        onOk={() => setIsAddTeamModalOpen(false)}
        onCancel={() => setIsAddTeamModalOpen(false)}
      />
    </>
  );
}

export default EventsRegistration;
