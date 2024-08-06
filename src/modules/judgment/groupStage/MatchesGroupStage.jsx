import { Card, Tooltip, Table, ConfigProvider, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalGroupStage from "./ModalMatchesGroupStage";
import Queries from "./api/Queries";
import "./sass/groupStage.scss";

function MatchesGroupStage() {
  const [dataMatches, setMatches] = useState([]);
  const getMatches = (dataMatches) => {
    const result = [];
    let matchNumber = 1;
    dataMatches?.map((group) => {
      group?.matches.map((match) => {
        match.team1 = match.team1?.name;
        match.team2 = match.team2?.name;
        const { team1, team2, match_id, team1_score, team2_score } = match;
        const team = {
          team1,
          team2,
          matchNumber,
          team1_score,
          team2_score,
          match_id,
        };
        result.push(team);
        matchNumber++;
      });
    });
    return result;
  };

  const data = getMatches(dataMatches);

  const { event_id, nomination_id } = useParams();
  useEffect(() => {
    (async () => {
      const responseJson = await Queries.getMatches(event_id, nomination_id);
      setMatches(responseJson);
    })();
  }, []);

  function MatchCard({ match }) {
    const columns = [
      {
        title: <Tooltip title="Команды">Команды</Tooltip>,
        key: "team1",
        render: (record) => (
          <div className="showTeams">
            <div>{record?.team1} </div>
            <div>{record?.team2} </div>
          </div>
        ),
      },
      {
        title: <Tooltip title="Результаты матча">Результат</Tooltip>,
        key: "result",
        render: (record) => (
          <div>
            <div style={{ marginTop: "15px" }}>
              <div>
                <span style={{ float: "left", alignItems: "center" }}>
                  {record.team1_score}
                </span>
              </div>
              <br />
              <div>
                <span style={{ float: "left", alignItems: "center" }}>
                  {record.team2_score}
                </span>
              </div>
            </div>
            <div style={{ marginLeft: "100px", alignItems: "center" }}>
              <ModalGroupStage match={record} />
            </div>
          </div>
        ),
      },
    ];

    return (
      <ConfigProvider
        theme={{
          components: {
            Card: {
              headerBg: "#1E90FF",
            },
          },
        }}
      >
        <Card className="getMatches" title={`Матч ${match.matchNumber}`}>
          <Table columns={columns} dataSource={[match]} pagination={false} />
        </Card>
      </ConfigProvider>
    );
  }
  return (
    <Row
      className="matchRow"
      gutter={[16, 16]}
      style={{ maxWidth: "100vw", overflowX: "auto", overflowY: "auto" }}
    >
      {data.map((match, index) => (
        <Col key={index} span={8} style={{ minWidth: "200px" }}>
          <MatchCard match={match} />
        </Col>
      ))}
    </Row>
  );
}

export default MatchesGroupStage;
