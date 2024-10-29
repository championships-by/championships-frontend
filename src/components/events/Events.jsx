import EventsList from "@components/events/EventsList";
import Loader from "@components/loader/Loader";
import { getEventsSelector } from "@store/events/selectors";
import { getEventsRelatedToDate } from "@store/events/thunk";
import { Card, Divider, Flex, Typography, Tabs } from "antd";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomCalendar } from "./CustomCalendar";
import { FilterSearchPanel } from "./FilterSearchPanel";

import "./sass/events.scss";

const isMobile = useMediaQuery({ maxWidth: 767 });
const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });

function Events() {
  const dispatch = useDispatch();
  const {
    data: events,
    isLoading,
    search,
    filters,
    date,
  } = useSelector(getEventsSelector);

  useEffect(() => {
    dispatch(
      getEventsRelatedToDate({
        published: true,
        levels: filters,
        event_name_chars: search,
        date: date,
      })
    );
  }, [dispatch, filters, search, date]);

  const tabsitems = [
    {
      key: "1",
      label: `Предстоящие (${events?.future ? events.future.length : 0})`,
      children: <EventsList events={events?.future} />,
    },
    {
      key: "2",
      label: `В этот день (${events?.on_date ? events.on_date.length : 0})`,
      children: <EventsList events={events?.on_date} />,
    },
    {
      key: "3",
      label: `Прошедшие (${events?.past ? events.past.length : 0})`,
      children: <EventsList events={events?.past} />,
    },
  ];

  return (
    <>
      <Loader show={isLoading} />
      <Typography.Title level={2}>Мероприятия</Typography.Title>
      <Divider />
      <Flex vertical gap={500}>
        <Flex vertical={isMobile || isTablet} gap="small">
          <Tabs items={tabsitems} className="events__tabs" />
          <Flex vertical={!isTablet} gap={10}>
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
