import { useNavigate } from "react-router-dom";
import EventsList from "@components/events/EventsList";
import Loader from "@components/loader/Loader";
import { getEventsSelector } from "@store/events/selectors";
import { getUserSelector } from "@store/users";
import { getEventsRelatedToDate } from "@store/events/thunk";
import { Card, Flex, Typography, Tabs, Row, Col, Button } from "antd";
import { useDevice } from "@hooks";
import { ROUTES } from "@constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { CustomCalendar } from "./CustomCalendar";
import { FilterSearchPanel } from "./FilterSearchPanel";

import "./sass/events.scss";

function Events() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useDevice();
  const dispatch = useDispatch();
  const {
    data: events,
    isLoading,
    search,
    filters,
    date,
  } = useSelector(getEventsSelector);
  const user = useSelector(getUserSelector);

  useEffect(() => {
    dispatch(
      getEventsRelatedToDate({
        published: true,
        levels: filters,
        event_name_chars: search,
        date,
      })
    );
  }, [dispatch, filters, search, date]);

  const tabsitems = [
    {
      key: "1",
      label: `${t("EVENTS.FUTURE")} (${
        events?.future ? events.future.length : 0
      })`,
      children: <EventsList events={events?.future} />,
    },
    {
      key: "2",
      label: `${t("EVENTS.ON_DAY")} (${
        events?.on_date ? events.on_date.length : 0
      })`,
      children: <EventsList events={events?.on_date} />,
    },
    {
      key: "3",
      label: `${t("EVENTS.PAST")} (${events?.past ? events.past.length : 0})`,
      children: <EventsList events={events?.past} />,
    },
  ];

  return (
    <>
      <Loader show={isLoading} />
      <Row align="middle" justify={"space-between"}>
        <Col xs={24} sm={24} md={14}>
          <Typography.Title level={2}>{t("EVENTS.EVENTS")}</Typography.Title>
        </Col>
        {!user.data && (
          <Col flex="auto">
            <Flex justify="flex-end" gap="15px">
              <Button
                type="primary"
                onClick={() => navigate(ROUTES.AUTHORIZATION.PATH)}
              >
                {t("COMMON.LOGIN")}
              </Button>
              <Button
                type="primary"
                onClick={() => navigate(ROUTES.CHECK_CERTIFICATE.PATH)}
              >
                {t("CHECK_CERTIFICATE.TITLE")}
              </Button>
            </Flex>
          </Col>
        )}
        <Button
          type="primary"
          onClick={() => navigate(ROUTES.CHECK_CERTIFICATE.PATH)}
        >
          {t("CHECK_CERTIFICATE.TITLE")}
        </Button>
      </Row>
      <Flex vertical gap={500}>
        <Flex vertical={isMobile || isTablet} gap="large">
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
