import { Button, Typography, Breadcrumb, Divider, Tabs, Row, Col } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TeamCreateModal from "@components/eventRegistration/TeamCreateModal";
import TeamsTable from "@components/eventRegistration/TeamsTable";
import AllTeamsTable from "@components/eventRegistration/AllTeamsTable";
import Loader from "@components/loader/Loader";
import AdminPanelControls from "@components/adminPanel/AdminPanelControls";
import { eventApi } from "@api";
import { ROUTES } from "@constants";

import "./sass/event-registration.scss";

function EventsRegistration() {
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataAllTeams, setAllTeams] = useState([]);
  const [dataTeams, setTeams] = useState([]);
  const [dataEvent, setEvent] = useState({});
  const [activeTab, setActiveTab] = useState("1");
  const { eventID } = useParams();
  const isRelated = true;

  const items = [
    {
      title: "Мероприятия",
      href: ROUTES.EVENTS.PATH,
    },
    {
      title: dataEvent?.event?.name ?? "",
      href: ROUTES.EVENTS_DESCRIPTION.PATH(dataEvent?.event?.id),
    },
    {
      title: "Регистрация участников",
    },
  ];

  const tabsitems = [
    {
      key: "1",
      label: "Мои команды",
      children: (
        <>
          <AllTeamsTable teamsData={dataAllTeams} />
        </>
      ),
    },
    {
      key: "2",
      label: "Зарегистрированые команды",
      children: <TeamsTable teamsData={dataTeams} />,
    },
  ];

  const getTeams = () => {
    const params = new URLSearchParams();
    params.append("event_id", eventID);
    params.append("related", isRelated);
    eventApi
      .getEventWithNominationsAndTeamParticipants(params.toString())
      .then((data) => {
        setTeams(data);
      });
    eventApi
      .getEventTeamsNotRelated({
        event_id: eventID,
      })
      .then((data) => {
        setAllTeams(data);
      })
      .finally(() => setTimeout(() => setIsLoading(false), 300));
  };

  useEffect(() => {
    if (isLoading) {
      eventApi.getEvent(eventID).then((data) => setEvent(data));
      getTeams();
    }
  }, [isLoading, eventID]);

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <>
      <Loader show={isLoading} />
      <Row align="bottom">
        <Col>
          <Typography.Title level={2}>Регистрация участников</Typography.Title>
        </Col>
        <Col flex="auto">
          {activeTab === "1" && (
            <AdminPanelControls>
              <Button
                type="primary"
                onClick={() => setIsAddTeamModalOpen(true)}
              >
                Добавить команду
              </Button>
            </AdminPanelControls>
          )}
        </Col>
      </Row>
      <Divider />
      <Breadcrumb className="event-registration__breadcrumb" items={items} />
      <Tabs items={tabsitems} onChange={onTabChange} />
      <TeamCreateModal
        isOpen={isAddTeamModalOpen}
        onOk={() => setIsAddTeamModalOpen(false)}
        onCancel={() => setIsAddTeamModalOpen(false)}
        onAdd={getTeams}
      />
    </>
  );
}

export default EventsRegistration;
