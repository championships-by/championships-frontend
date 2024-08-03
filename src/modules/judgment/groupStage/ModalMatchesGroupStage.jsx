import { Modal, Button, Flex, Table, InputNumber } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./sass/groupStage.scss";
import { matchApi } from "@api";

function ModalGroupStage(match) {
  const [visible, setVisible] = useState(false);

  const data = [
    {
      key: "1",
      participants: match.match?.team1,
      result: 0,
    },
    {
      key: "2",
      participants: match.match?.team2,
      result: 1,
    },
  ];
  const columns = [
    {
      title: "Участники",
      key: "participants",
      dataIndex: "participants",
    },
    {
      title: "Счёт",
      key: "result",
      dataIndex: "result",
      render: (result) => (
        <div>
          <InputNumber
            onChange={(e) => setScore(result, e)}
            min={0}
            defaultValue={0}
          />
        </div>
      ),
    },
  ];

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    sendMatchResult(team1Score, team2Score, match);
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const [team1Score, setTeam1Score] = useState();
  const [team2Score, setTeam2Score] = useState();

  const setScore = (key, score) => {
    if (key === 0) setTeam1Score(score);

    if (key === 1) setTeam2Score(score);
  };

  const { event_id, nomination_id } = useParams();
  const sendMatchResult = () => {
    const data = {
      nomination_event: {
        event_id,
        nomination_id,
      },
      match_id: match.match.match_id,
      team1_score: team1Score,
      team2_score: team2Score,
    };

    matchApi.setMatch(data).then((response) => {
      if (response.ok) {
        window.location.reload();
      }
    });
  };

  return (
    <Flex>
      <Button type="text" icon={<EditOutlined />} onClick={showModal} />
      <Modal
        title="Сообщить счёт"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Отправить оценки"
        cancelButtonProps={{
          style: {
            display: "none",
          },
        }}
      >
        <Table columns={columns} pagination={false} dataSource={data} />
      </Modal>
    </Flex>
  );
}

export default ModalGroupStage;
