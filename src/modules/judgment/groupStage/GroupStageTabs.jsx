import { useMatches, useTabs } from "@hooks";
import { isScoreZero } from "@utils";
import { Button, message, Tabs } from "antd";
import { useState } from "react";
import { FinalParticipantsModal } from "./modals";

export const GroupStageTabs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { tabs } = useTabs();
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

  return (
    <>
      {contextHolder}
      <Tabs
        defaultActiveKey="1"
        items={tabs}
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
