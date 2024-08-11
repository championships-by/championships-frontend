import { Typography, message, Card, Calendar, Flex } from "antd";
import { useState } from "react";
import EventsList from "@components/events/EventsList";
import Loader from "@components/loader/Loader";
import { Locale } from "@constants";

import "./sass/events.scss";
import { eventApi } from "@api";

function Events() {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  if (isLoading) {
    eventApi
      .getEventWithNominations({ limit: 10 })
      .then((response) => response.json())
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
            <Calendar fullscreen={false} locale={Locale} />
          </Card>
        </Flex>
      </Flex>
    </>
  );
}

export default Events;
