import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, List, Tooltip, Typography } from "antd";
import {
  CalendarOutlined,
  StarOutlined,
  HomeOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { changeDateFormat, getEventLevel } from "@utils";
import { ROUTES } from "@constants";
import { Locale } from "@constants";

function EventsList({ events }) {
  const data = events.map(({ event }, index) => {
    const navigate = useNavigate();
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
            src={
              event.logo_path !== "/" && event.logo_path
                ? `http://robin-zubronok.by/${event.logo_path}`
                : "https://www.uznai24.su/images/company_blanklogo.png"
            }
          />
        }
      >
        <Typography.Title level={4}>{event.name}</Typography.Title>
        <Typography.Text>
          <CalendarOutlined />
          {changeDateFormat(event.holding_start_date) !==
          changeDateFormat(event.holding_finish_date)
            ? ` c ${changeDateFormat(
                event.holding_start_date
              )} по ${changeDateFormat(event.holding_finish_date)}`
            : ` ${changeDateFormat(event.holding_start_date)}`}
        </Typography.Text>
        <br />
        <Typography.Text>
          <StarOutlined /> {getEventLevel(event.event_level)}
        </Typography.Text>
        <br />
        <Typography.Text>
          <HomeOutlined /> {event.event_place}
        </Typography.Text>
        <Typography.Text>
          {finishDate <= now ? (
            <div className="events__card__registration_closed">
              <CloseCircleOutlined /> Регистрация закрыта
            </div>
          ) : (
            <div className="events__card__registration_open">
              <CheckCircleOutlined />
              Регистрация открыта по {changeDateFormat(finishDate)}
            </div>
          )}
        </Typography.Text>
      </Card>
    );
  });

  return (
    <List
      grid={{ gutter: 5, column: 3 }}
      pagination={{
        hideOnSinglePage: true,
        pageSize: 3,
        position: "bottom",
        align: "center",
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
