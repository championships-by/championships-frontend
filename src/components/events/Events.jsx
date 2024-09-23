import EventsList from "@components/events/EventsList";
import Loader from "@components/loader/Loader";
import { getEventsSelector } from "@store/events/selectors";
import { getEventWithNominations } from "@store/events/thunk";
import { Card, Divider, Flex, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomCalendar } from "./CustomCalendar";
import { FilterSearchPanel } from "./FilterSearchPanel";
import "./sass/events.scss";

function Events() {
  const dispatch = useDispatch();
  const {
    data: events,
    isLoading,
    search,
    filters,
  } = useSelector(getEventsSelector);

  useEffect(() => {
    dispatch(
      getEventWithNominations({
        published: true,
        levels: filters,
        event_name_chars: search,
      })
    );
  }, [dispatch, filters, search]);

  return (
    <>
      <Loader show={isLoading} />
      <Typography.Title level={2}>Мероприятия</Typography.Title>
      <Divider />
      <Flex vertical gap={500}>
        <Flex gap="small">
          <EventsList events={events} />
          <Flex vertical="vertical" gap={10}>
            <FilterSearchPanel />
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
