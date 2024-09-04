import { eventApi } from "@api";
import EventsList from "@components/events/EventsList";
import Loader from "@components/loader/Loader";
import { Card, Flex, Typography, message } from "antd";
import { useState } from "react";
import { CustomCalendar } from "./CustomCalendar";
import "./sass/events.scss";

function Events() {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  //here undefined in limit
  if (isLoading) {
    eventApi
      .getEventWithNominations({ published: true })
      .then((data) => setEvents(data))
      .catch(() =>
        message.error("Невозможно получить данные. Обратитесь к администратору")
      )
      .finally(() => setTimeout(() => setIsLoading(false), 300));
  }

  return (
    <>
      <Loader show={isLoading} />
      <Typography.Title level={2}>Мероприятия</Typography.Title>
      <Flex vertical gap={500}>
        <Flex gap="small">
          <EventsList events={events} />
          <Card className="events__card">
            <CustomCalendar />
          </Card>
        </Flex>
      </Flex>
    </>
  );
}

export default Events;
