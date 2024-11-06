import { useMatches } from "@hooks";
import { isScoreZero } from "@utils";
import { Button, message, Tabs } from "antd";
import { useMemo, useState } from "react";
import { MatchesGroupStage, TableGroupStage } from "./components";
import { FinalParticipantsModal } from "./modals";

export const GroupStageTabs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { matches, setFinalParticipants } = useMatches();

  const handleClick = (e) => {
    e.preventDefault();

    // true - if all matches have a score
    const completed = !matches.some(({ team1, team2 }) =>
      isScoreZero(team1.score, team2.score)
    );

    if (completed) {
      setIsModalOpen(true);
      return;
    }

    messageApi.error("Не все матчи заполнены!");
  };

  const items = useMemo(
    () => [
      {
        key: "1",
        label: "Таблица",
        children: <TableGroupStage />,
        disabled: false,
      },
      {
        key: "2",
        label: "Матчи",
        children: <MatchesGroupStage />,
        disabled: false,
      },
      {
        key: "3",
        label: "Финальный этап",
        children: "Content Tab3",
        disabled: true,
      },
      {
        key: "4",
        label: "Итоги",
        children: "Content Tab4",
        disabled: true,
      },
    ],
    []
  );

  return (
    <>
      {contextHolder}
      <Tabs
        defaultActiveKey="1"
        items={items}
        tabBarExtraContent={{
          right: (
            <Button onClick={handleClick} type="primary">
              Завершить этап
            </Button>
          ),
        }}
      />
      <FinalParticipantsModal
        isOpen={isModalOpen}
        onSubmit={(data) => {
          setFinalParticipants(data);
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};
