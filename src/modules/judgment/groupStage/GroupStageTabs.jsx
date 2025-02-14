/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */
import { useMatches } from "@hooks";
import { isScoreZero } from "@utils";
import { Button, message, Tabs, Flex, Divider } from "antd";
import { useMemo, useState } from "react";
import {
  MatchesGroupStage,
  TableGroupStage,
  MatchesPlayoffStage,
  PlayoffTree,
} from "./components";
import { FinalParticipantsModal } from "./modals";
import { useTranslation } from "react-i18next";
import ReturnButton from "@modules/judgment/returnButton/ReturnButton";

export function GroupStageTabs() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    matches,
    setFinalParticipants,
    handleFinishGroupStage,
    handleStartPlayoffStage,
    isPlayoffStageFinished,
    isGroupStageFinished,
  } = useMatches();

  const handleClickFinishGroupStage = (e) => {
    e.preventDefault();
    console.log(matches);
    const completed = matches.every(
      ({ lastResultCreatorEmail }) => lastResultCreatorEmail !== null
    );

    if (!completed) {
      messageApi.error(t("TOURNAMENTS.NOT_ALL_MATCHES_FILLED"));
      return;
    }
    setIsModalOpen(true);
  };

  const handleClickFinishPlayoffStage = (e) => {};

  const onSubmitFinalParticipants = async (data) => {
    await handleFinishGroupStage(data);
    await handleStartPlayoffStage(data);
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
      disabled: !isGroupStageFinished,
    },
    {
      key: "4",
      label: t("COMMON.RESULTS"),
      children: "Content Tab4",
      disabled: !isPlayoffStageFinished,
    },
  ];

  return (
    <Flex vertical gap="middle">
      {contextHolder}
      <Tabs
        defaultActiveKey="1"
        items={items}
        tabBarExtraContent={{
          right: (
            <Flex gap="small">
              {!isGroupStageFinished && (
                <Button onClick={handleClickFinishGroupStage} type="primary">
                  {t("COMMON.COMPLETE_GROUP_STAGE")}
                </Button>
              )}
              {!isPlayoffStageFinished && isGroupStageFinished && (
                <Button onClick={handleClickFinishPlayoffStage} type="primary">
                  {t("COMMON.COMPLETE_PLAY_OFF_STAGE")}
                </Button>
              )}
              {isPlayoffStageFinished && isGroupStageFinished && (
                <Button type="primary">{t("COMMON.FINAL_PROTOCOL")}</Button>
              )}
            </Flex>
          ),
        }}
      />
      {isPlayoffStageFinished && (
        <>
          <Divider />
          <ReturnButton />
        </>
      )}

      <FinalParticipantsModal
        isOpen={isModalOpen}
        onSubmit={onSubmitFinalParticipants}
        onCancel={() => setIsModalOpen(false)}
      />
    </Flex>
  );
}
