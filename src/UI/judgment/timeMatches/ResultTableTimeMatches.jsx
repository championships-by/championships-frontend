import BronzeMedal from "@src/assets/img/bronze-medal.png";
import GoldMedal from "@src/assets/img/gold-medal.png";
import SilverMedal from "@src/assets/img/silver-medal.png";
import { Button, Flex, Table, Tooltip } from "antd";

const data = [
  {
    place: "1",
    participants: "Иванов Иван Иванович",
    best_attempt: "2:49:35",
  },
  {
    place: "2",
    participants: "Егоров Егор Егорович",
    best_attempt: "2:41:30",
  },
  {
    place: "3",
    participants: "Кириллов Кирилл Кириллович",
    best_attempt: "2:40:12",
  },
];

const columns = [
  {
    title: <Tooltip></Tooltip>,
    key: "medal",
    render: (record) => (
      <div>
        <img
          src={
            record.place === "1"
              ? GoldMedal
              : record.place === "2"
                ? SilverMedal
                : record.place === "3"
                  ? BronzeMedal
                  : ""
          }
          style={{ width: "50px", height: "50px" }}
        />
      </div>
    ),
  },
  {
    title: <Tooltip title="Место">Место</Tooltip>,
    dataIndex: "place",
    key: "place",
  },
  {
    title: <Tooltip title="Участник">Участники</Tooltip>,
    dataIndex: "participants",
    key: "participants",
  },
  {
    title: <Tooltip title="Лучшее время">Лучшее время</Tooltip>,
    dataIndex: "best_attempt",
    key: "best_attempt",
  },
];

function ResultTableTimeMatches() {
  return (
    <>
      <Flex vertical gap="large">
        <Table pagination={false} columns={columns} dataSource={data} />
      </Flex>
      <Button style={{ margin: "10px 0px 10px 0px" }} type="primary">
        Итоговый протокол
      </Button>
    </>
  );
}
export default ResultTableTimeMatches;
