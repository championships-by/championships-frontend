import { eventApi } from "@api";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import EventTable from "@components/judgment/events/JudgmentEventsTable";
import Loader from "@components/loader/Loader";
import SearchInput from "@modules/search/SearchInput";
import { ROUTES } from "@constants";
import { Button, Col, Divider, Row, Typography, Flex } from "antd";
import { useEffect, useState } from "react";
import EventCreateModal from "./EventCreateModal";

function JudgmentEvents() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataEvents, setEvents] = useState([]);
  const [IsEventCreateModalOpen, setIsEventCreateModalOpen] = useState(false);

  const getEvents = async (value) => {
    const params = new URLSearchParams();
    if (value) {
      params.append("event_name_chars", value);
    }
    let eventsData = [];
    const levels = ["region", "republic", "district", "town", "other"];
    const isOwner = true;

    levels.forEach((level) => params.append("levels", level));
    params.append("is_owner", isOwner);
    await eventApi
      .getEventsWithNominationsByOwner(params.toString())
      .then((response) => {
        const formattedDate = response.data.map((user) => ({
          ...user,
          date: user.date,
        }));
        return formattedDate;
      })
      .then((data) => (eventsData = [...eventsData, ...data]));

    params.delete("is_owner");

    await eventApi
      .getEventsWithNominationsByJudgeInCommand(params.toString())
      .then((response) => {
        const formattedDate = response.data.map((user) => ({
          ...user,
          date: user.date,
        }));
        return formattedDate;
      })
      .then((data) => (eventsData = [...eventsData, ...data]));

    setEvents(eventsData);
    setIsLoading(false);
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
        <Col xs={24} sm={24} md={14}>
          <Typography.Title level={2}>
            Управление мероприятиями
          </Typography.Title>
        </Col>
        <Col flex="auto">
          <Flex justify="flex-end">
            <SearchInput onChange={getEvents} />
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
          </Flex>
        </Col>
      </Row>
      <Divider />

      <EventTable EventsData={dataEvents} />
    </>
  );
}

export default JudgmentEvents;
