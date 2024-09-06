import { Button, Typography, message, Row, Col, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "@components/loader/Loader";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import { ROUTES } from "@constants";
import EventTable from "@components/judgment/events/JudgmentEventsTable";
import { eventApi } from "@api";
import EventCreateModal from "./EventCreateModal";

function changeDateFormat(date) {
  const formattedDate = new Date(date);

  const month = formattedDate.getMonth() + 1;
  const formattedMonth = String(month).padStart(2, "0");

  return (
    formattedDate.getDate() +
    "." +
    formattedMonth +
    "." +
    formattedDate.getFullYear()
  );
}

function JudgmentEvents() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataEvents, setEvents] = useState([]);
  const [IsEventCreateModalOpen, setIsEventCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  const getEvents = () => {
    eventApi
      .getEventWithNominations({})
      .then((response) => {
        const formattedDate = response.map((user) => ({
          ...user,
          date: user.date,
        }));
        return formattedDate;
      })
      .then((data) => setEvents(data))
      .catch(() =>
        message.error("Невозможно получить данные. Обратитесь к администратору")
      )
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (isLoading) {
      getEvents();
    }
  }, [isLoading]);
  return (
    <>
      <Loader show={isLoading} />
      <Row align="bottom">
        <Col>
          <Typography.Title level={2}>
            Управление мероприятиями
          </Typography.Title>
        </Col>
        <Col flex="auto">
          <AdminPanelControls>
            <Button
              type="primary"
              onClick={() => setIsEventCreateModalOpen(true)}
            >
              {ROUTES.JUDGMENT_CREATE.TITLE}
            </Button>
            <EventCreateModal
              name="Добавить мероприятие"
              isOpen={IsEventCreateModalOpen}
              onOk={() => setIsEventCreateModalOpen(false)}
              onCancel={() => setIsEventCreateModalOpen(false)}
              onAdd={getEvents}
            />
          </AdminPanelControls>
        </Col>
      </Row>
      <Divider />

      <EventTable EventsData={dataEvents} />
    </>
  );
}

export default JudgmentEvents;
