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
import { useParams } from "react-router-dom";
import TeamWinsTable from "./TeamWinsTable";
import { ROUTES } from "@constants";
import { participantApi } from "@api";
import { changeDateFormat } from "@utils";

import "./sass/participants.scss";

function ParticipantInformation() {
  const [isLoading, setIsLoading] = useState(true);
  const [participantData, setParticipantData] = useState([]);
  const [teamWinsData, setTeamWinsData] = useState([]);
  const { participantID } = useParams();

  useEffect(() => {
    const body = {
      participant_id: participantID,
    };
    try {
      participantApi.getParticipantStats(body).then((data) => {
        data.participant.map((participant) => setParticipantData(participant));
        setTeamWinsData(data.team_wins);
      });
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [participantID, isLoading]);

  const items = [
    {
      title: "Управление участниками",
      href: ROUTES.PARTICIPANTS.PATH,
    },
    {
      title: "Карточка участника",
    },
  ];

  return (
    <>
      <Loader show={isLoading} />
      <Typography.Title level={2}>Карточка участника</Typography.Title>
      <Divider />
      <Breadcrumb items={items} />
      <Typography.Title level={2}>
        {`${participantData.first_name} ${participantData.third_name} ${participantData.second_name}`}
      </Typography.Title>
      <Typography.Text>
        {changeDateFormat(participantData.birth_date)}
      </Typography.Text>
      <TeamWinsTable teamWinsData={teamWinsData} />
    </>
  );
}

export default ParticipantInformation;
