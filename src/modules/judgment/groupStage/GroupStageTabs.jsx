/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */
import { useMatches } from "@hooks";
import { isScoreZero } from "@utils";
import { Button, message, Tabs, Flex } from "antd";
import { useMemo, useState } from "react";
import {
  MatchesGroupStage,
  TableGroupStage,
  MatchesPlayoffStage,
} from "./components";
import { FinalParticipantsModal } from "./modals";
import { useTranslation } from "react-i18next";

export function GroupStageTabs() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    matches,
    setFinalParticipants,
    handleFinishGroupStage,
    handleStartPlayoffStage,
  } = useMatches();

  const handleClickFinalStage = (e) => {
    e.preventDefault();

    const completed = matches.every(
      ({ lastResultCreatorEmail }) => lastResultCreatorEmail !== null
    );

    if (completed) {
      setIsModalOpen(true);
      return;
    }

    messageApi.error(t("TOURNAMENTS.NOT_ALL_MATCHES_FILLED"));
  };

  const onSubmitFinalParticipants = (data) => {
    handleStartPlayoffStage(data);
    setIsModalOpen(false);
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
      children: <MatchesPlayoffStage />,
      disabled: false,
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
            <Flex gap="small">
              <Button onClick={handleFinishGroupStage} type="primary">
                {t("COMMON.COMPLETE_STAGE")}
              </Button>
              <Button onClick={handleClickFinalStage} type="primary">
                {t("TOURNAMENTS.FINAL_STAGE")}
              </Button>
            </Flex>
          ),
        }}
      />
      <FinalParticipantsModal
        isOpen={isModalOpen}
        onSubmit={onSubmitFinalParticipants}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
}
