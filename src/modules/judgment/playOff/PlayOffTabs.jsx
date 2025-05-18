import { useMatches } from "@/hooks";
import { isScoreZero } from "@/utils";
import { Button, message, Tabs, Flex, Divider } from "antd";
import { useMemo, useState } from "react";
import {
  MatchesGroupStage,
  TableGroupStage,
  MatchesPlayoffStage,
  PlayoffResult,
} from "./components";
import { FinalParticipantsModal, FinishPlayOffModal } from "./modals";
import { useTranslation } from "react-i18next";
import ReturnButton from "@/modules/judgment/common/ReturnButton";
import { downloadProtocol } from "@/utils";
import { useParams } from "react-router-dom";

export function PlayOffTabs() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinishPlayoffModalOpen, setIsFinishPlayoffModalOpen] =
    useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { eventId, nominationId } = useParams();

  const {
    matches,
    setFinalParticipants,
    handleFinishGroupStage,
    handleStartPlayoffStage,
    isPlayoffStageFinished,
    isGroupStageFinished,
    leveledPlayoffMatches,
    finishPlayoffStage,
  } = useMatches();

  const handleClickFinishGroupStage = (e) => {
    e.preventDefault();
    const completed = matches.every(
      ({ lastResultCreatorEmail }) => lastResultCreatorEmail !== null
    );

    if (!completed) {
      messageApi.error(t("TOURNAMENTS.NOT_ALL_MATCHES_FILLED"));
      return;
    }
    setIsModalOpen(true);
  };

  const onClickDownloadProtocol = async () => {
    try {
      await downloadProtocol(eventId, nominationId);
    } catch {
      message.error(t("TOURNAMENTS.COULDNT_DOWNLOAD_FILE"));
    }
  };

  const handleClickFinishPlayoffStage = (e) => {
    setIsFinishPlayoffModalOpen(true);
  };

  const onOkFinishPlayoffModal = () => {
    setIsFinishPlayoffModalOpen(false);
    finishPlayoffStage();
  };

  const onCancelFinishPlayoffModal = () => {
    setIsFinishPlayoffModalOpen(false);
  };

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
      children: <PlayoffResult />,
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
                <Button type="primary" onClick={onClickDownloadProtocol}>
                  {t("COMMON.FINAL_PROTOCOL")}
                </Button>
              )}
            </Flex>
          ),
        }}
      />
      {isPlayoffStageFinished && (
        <>
          <ReturnButton />
        </>
      )}

      <FinalParticipantsModal
        isOpen={isModalOpen}
        onSubmit={onSubmitFinalParticipants}
        onCancel={() => setIsModalOpen(false)}
      />
      <FinishPlayOffModal
        isOpen={isFinishPlayoffModalOpen}
        onOk={onOkFinishPlayoffModal}
        onCancel={onCancelFinishPlayoffModal}
      />
    </Flex>
  );
}
