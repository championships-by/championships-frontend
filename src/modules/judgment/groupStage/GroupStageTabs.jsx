import { useMatches } from "@hooks";
import { isScoreZero } from "@utils";
import { Button, message, Tabs } from "antd";
import { useMemo, useState } from "react";
import { MatchesGroupStage, TableGroupStage } from "./components";
import { FinalParticipantsModal } from "./modals";
import { useTranslation } from "react-i18next";

export const GroupStageTabs = () => {
  const { t } = useTranslation();
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

    messageApi.error(t("TOURNAMENTS.NOT_ALL_MATCHES_FILLED"));
  };

  const items = [
    {
      key: "1",
      label: t("COMMON.TABLE"),
      children: <TableGroupStage />,
      disabled: false,
    },
    {
      key: "2",
      label: t("TOURNAMENTS.MATCHES"),
      children: <MatchesGroupStage />,
      disabled: false,
    },
    {
      key: "3",
      label: t("NOMINATION_TYPES.PLAYOFF"),
      children: "Content Tab3",
      disabled: true,
    },
    {
      key: "4",
      label: t("COMMON.RESULTS"),
      children: "Content Tab4",
      disabled: true,
    },
  ];

  return (
    <>
      {contextHolder}
      <Tabs
        defaultActiveKey="1"
        items={items}
        tabBarExtraContent={{
          right: (
            <Button onClick={handleClick} type="primary">
              {t("COMMON.COMPLETE_STAGE")}
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
