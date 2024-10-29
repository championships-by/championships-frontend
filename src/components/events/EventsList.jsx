import {
  CalendarOutlined,
  HomeOutlined,
  StarOutlined,
} from "@ant-design/icons";
import noLogo from "@assets/img/auth-background.png";
import { ROUTES, url, Locale } from "@constants";
import { changeDateFormat, getEventLevel } from "@utils";
import { Card, List, Tooltip, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function EventsList({ events }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const navigate = useNavigate();

  const data = Array.isArray(events)
    ? events.map(({ event }, index) => {
        const finishDate = new Date(event.registration_finish_date);
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
                    ? `${url}/${event.logo_path}`
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
                  c{" "}
                  <Typography.Text strong>
                    {changeDateFormat(event.holding_start_date)}
                  </Typography.Text>{" "}
                  по{" "}
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
              <StarOutlined /> {getEventLevel(event.event_level)}
            </Typography.Text>
            <br />
            <Tooltip title={event.event_place} placement="bottomLeft">
              <Typography.Text ellipsis={true} type="secondary">
                <HomeOutlined /> {event.event_place}
              </Typography.Text>
            </Tooltip>
            <Typography.Title level={5}>
              {finishDate <= now ? (
                <div className="events__card__registration__closed">
                  Регистрация закрыта
                </div>
              ) : (
                <div className="events__card__registration__open">
                  Регистрация открыта
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
        locale: Locale.pagination,
      }}
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
      locale={{
        emptyText: "Мероприятия отсутствуют",
      }}
      className="events__list"
    />
  );
}

export default EventsList;
