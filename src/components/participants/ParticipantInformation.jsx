import Loader from "@components/loader/Loader";
import { Typography, Row, Col, Divider, Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserSelector } from "@store/users";
import TeamWinsTable from "./TeamWinsTable";
import { ROUTES } from "@constants";
import { participantApi } from "@api";
import { changeDateFormat } from "@utils";
import noPhoto from "@assets/img/participant.jpg";
import { useTranslation } from "react-i18next";

import "./sass/participants.scss";

function ParticipantInformation() {
  const { t } = useTranslation();
  const [participantData, setParticipantData] = useState([]);
  const [teamWinsData, setTeamWinsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(getUserSelector);
  const profileIsLoading = user.isLoading;
  const { participantID } = useParams();

  const participantsBreadcrumb = {
    title: t("COMMON.PARTICIPANT_MANAGEMENT"),
    href: ROUTES.PARTICIPANTS.PATH,
  };

  const items = [
    participantsBreadcrumb,
    {
      title: t("PARTICIPANTS.CARD_OF_PARTICIPANT"),
    },
  ];

  useEffect(() => {
    const body = {
      participant_id: participantID,
    };

    try {
      participantApi
        .getParticipantStats(body)
        .then((data) => {
          data.participant.map((participant) => {
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
      <Typography.Title level={2}>
        {t("PARTICIPANTS.CARD_OF_PARTICIPANT")}
      </Typography.Title>
      <Divider />
      <Breadcrumb items={items} />
      <Row align="top" className="participants__information__row">
        <Col>
          <img
            src={
              participantData.photo_path
                ? `${API_HOST}/${participantData.photo_path}`
                : noPhoto
            }
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
          <Typography.Text strong>{t("COMMON.EMAIL")}: </Typography.Text>
          <Typography.Text>
            <a href={`mailto:${participantData.email}`}>
              {participantData.email}
            </a>
          </Typography.Text>
          <br />
          <Typography.Text strong>{t("COMMON.BIRTHDAY")}: </Typography.Text>
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
