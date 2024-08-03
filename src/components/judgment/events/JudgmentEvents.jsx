import { Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "@components/loader/Loader";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import { ROUTES } from "@constants";
import EventTable from "@components/judgment/events/JudgmentEventsTable";
import { eventApi } from "@api";

function JudgmentEvents() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataEvents, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      eventApi
        .getEventWithNominations({ limit: 49 })
        .then((response) => response.json())
        .then((data) => setEvents(data))
        .catch(() =>
          message.error(
            "Невозможно получить данные. Обратитесь к администратору"
          )
        )
        .finally(() => setIsLoading(false));
    }
  }, [isLoading]);
  return (
    <>
      <Loader show={isLoading} />
      <Typography.Title level={2}>Редактирование мероприятий</Typography.Title>
      <AdminPanelControls>
        <Button
          type="primary"
          onClick={() => navigate(ROUTES.JUDGMENT_CREATE.PATH)}
        >
          {ROUTES.JUDGMENT_CREATE.TITLE}
        </Button>
      </AdminPanelControls>

      <EventTable EventsData={dataEvents} />
    </>
  );
}

export default JudgmentEvents;
