import {
  CalendarOutlined,
  HomeOutlined,
  StarOutlined,
} from "@ant-design/icons";
import noLogo from "@assets/img/auth-background.png";
import { ROUTES, paginationLocale, REACT_APP_API_URL } from "@const";
import { changeDateFormat, getEventLevel, getTranslation } from "@utils";
import { Card, List, Tooltip, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDevice } from "@hooks";
import { useTranslation } from "react-i18next";

function EventsList({ events }) {
  const { t } = useTranslation();
  const { isMobile, isTablet } = useDevice();
  const navigate = useNavigate();

  const data = Array.isArray(events)
    ? events.map(({ event }, index) => {
        const finishDate = new Date(event.registration_finish_date);
        const startDate = new Date(event.registration_start_date);
        const now = new Date();

        return (
          <Card
            key={index}
            size="default"
            hoverable
            className="events__cards"
            onClick={() => navigate(ROUTES.EVENTS_DESCRIPTION.PATH(event.id))}
            cover={
              <img
                alt="test"
                className={
                  event.logo_path !== "/" && event.logo_path
                    ? "events__card__img"
                    : "events__card__noImg"
                }
                src={
                  event.logo_path !== "/" && event.logo_path
                    ? `${REACT_APP_API_URL}/${event.logo_path}`
                    : noLogo
                }
              />
            }
          >
            <Typography.Title
              ellipsis={{ rows: 3 }}
              level={4}
              className="events__card__title"
            >
              {event.name}
            </Typography.Title>
            <Typography.Text type="secondary">
              <CalendarOutlined />
              {changeDateFormat(event.holding_start_date) !==
              changeDateFormat(event.holding_finish_date) ? (
                <>
                  {" "}
                  {t("COMMON.FROM")}{" "}
                  <Typography.Text strong>
                    {changeDateFormat(event.holding_start_date)}
                  </Typography.Text>{" "}
                  {t("COMMON.TO")}{" "}
                  <Typography.Text strong>
                    {changeDateFormat(event.holding_finish_date)}
                  </Typography.Text>
                </>
              ) : (
                <Typography.Text strong>
                  {" "}
                  {changeDateFormat(event.holding_start_date)}
                </Typography.Text>
              )}
            </Typography.Text>
            <br />
            <Typography.Text type="secondary">
              <StarOutlined /> {t(getEventLevel(event.event_level))}
            </Typography.Text>
            <br />
            <Tooltip title={event.event_place} placement="bottomLeft">
              <Typography.Text ellipsis type="secondary">
                <HomeOutlined /> {event.event_place}
              </Typography.Text>
            </Tooltip>
            <Typography.Title level={5}>
              {startDate <= now && now <= finishDate ? (
                <div className="events__card__registration__open">
                  {t("EVENTS.REGISTRATION_OPEN")}
                </div>
              ) : startDate > now ? (
                <div className="events__card__registration__not_started">
                  {t("EVENTS.REGISTRATION_NOT_STARTED")}
                </div>
              ) : (
                <div className="events__card__registration__closed">
                  {t("EVENTS.REGISTRATION_CLOSED")}
                </div>
              )}
            </Typography.Title>
          </Card>
        );
      })
    : [];

  return (
    <List
      grid={{ gutter: 5, column: isMobile ? 1 : isTablet ? 2 : 3 }}
      pagination={{
        hideOnSinglePage: true,
        pageSize: isMobile ? 1 : isTablet ? 2 : 3,
        position: "bottom",
        align: "center",
        locale: getTranslation(paginationLocale, t),
      }}
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
      locale={{
        emptyText: t("EVENTS.NO_EVENTS"),
      }}
      className="events__list"
    />
  );
}

export default EventsList;
