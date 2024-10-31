import Loader from "@components/loader/Loader";
import {
  Button,
  Flex,
  Typography,
  message,
  Row,
  Col,
  Divider,
  Breadcrumb,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserSelector } from "@store/users";
import TeamWinsTable from "./TeamWinsTable";
import { ROUTES } from "@constants";
import { participantApi } from "@api";
import { changeDateFormat } from "@utils";
import participantImg from "@assets/img/participant.jpg";

import "./sass/participants.scss";

const items = [
  {
    title: "Управление участниками",
    href: ROUTES.PARTICIPANTS.PATH,
  },
  {
    title: "Карточка участника",
  },
];

function ParticipantInformation() {
  const [participantData, setParticipantData] = useState([]);
  const [teamWinsData, setTeamWinsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(getUserSelector);
  const profileIsLoading = user.isLoading;
  const navigate = useNavigate();
  const { participantID } = useParams();

  useEffect(() => {
    const body = {
      participant_id: participantID,
    };

    try {
      participantApi
        .getParticipantStats(body)
        .then((data) => {
          data.participant.map((participant) => {
            if (!profileIsLoading && participant.creator_id != user?.data.id) {
              navigate(ROUTES.FORBIDDEN.PATH);
            }
            setParticipantData(participant);
          });
          setTeamWinsData(data.participation);
        })
        .finally(() => setTimeout(() => setIsLoading(false), 300));
    } catch {}
  }, [participantID, isLoading, profileIsLoading]);

  return (
    <>
      <Loader show={isLoading || profileIsLoading} />
      <Typography.Title level={2}>Карточка участника</Typography.Title>
      <Divider />
      <Breadcrumb items={items} />
      <Row align="top" className="participants__information__row">
        <Col>
          <img
            src={participantImg}
            className="participants__information__img"
          />
        </Col>
        <Col>
          <Typography.Title
            level={2}
            className="participants__information__name"
          >
            {`${participantData.second_name}`}
            <br />
            {`${participantData.first_name}`}
            <br />
            {`${participantData.third_name}`}
          </Typography.Title>
          <Typography.Text strong>Электронная почта: </Typography.Text>
          <Typography.Text>
            <a href={`mailto:${participantData.email}`}>
              {participantData.email}
            </a>
          </Typography.Text>
          <br />
          <Typography.Text strong>Дата рождения: </Typography.Text>
          <Typography.Text>
            {changeDateFormat(participantData.birth_date)}
          </Typography.Text>
        </Col>
      </Row>
      <TeamWinsTable teamWinsData={teamWinsData} />
    </>
  );
}

export default ParticipantInformation;
