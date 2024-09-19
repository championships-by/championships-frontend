import { eventApi } from "@api";
import EventsList from "@components/events/EventsList";
import Loader from "@components/loader/Loader";
import { Card, Divider, Flex, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { CustomCalendar } from "./CustomCalendar";
import { FilterSearchPanel } from "./FilterSearchPanel";
import "./sass/events.scss";

function Events() {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    eventApi
      .getEventWithNominations({
        published: true,
        levels: ["other"],
      })
      .then((data) => setEvents(data))
      .catch(() =>
        message.error("Невозможно получить данные. Обратитесь к администратору")
      );
    setTimeout(() => setIsLoading(false), 0);
  }, []);

  return (
    <>
      <Loader show={isLoading} />
      <Typography.Title level={2}>Мероприятия</Typography.Title>
      <Divider />
      <Flex vertical gap={500}>
        <Flex gap="small">
          <EventsList events={events} />
          <Flex vertical="vertical" gap={10}>
            <FilterSearchPanel
              onSearch={(search) => console.log(search)}
              onFilter={(values) => console.log(values)}
            />
            <Card className="events__card">
              <CustomCalendar />
            </Card>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Events;
