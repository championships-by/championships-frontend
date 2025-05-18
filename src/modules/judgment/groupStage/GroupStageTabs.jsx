import { useMatches } from "@/hooks";
import { isScoreZero } from "@/utils";
import { Button, message, Tabs, Flex } from "antd";
import { useState } from "react";
import { MatchesGroupStage, TableGroupStage } from "./components";
import { FinalParticipantsModal } from "./modals";
import { useTranslation } from "react-i18next";
import ReturnButton from "@/modules/judgment/common/ReturnButton";
import { downloadProtocol } from "@/utils";
import { useParams } from "react-router-dom";

export function GroupStageTabs() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { eventId, nominationId } = useParams();

  const { matches, handleFinishGroupStage, isGroupStageFinished } =
    useMatches();

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

  const onSubmitFinalParticipants = async (data) => {
    await handleFinishGroupStage(data);
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
      label: t("COMMON.RESULTS"),
      children: <div>{t("TOURNAMENTS.FINAL_RESULTS")}</div>,
      disabled: !isGroupStageFinished,
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
                  {t("COMMON.COMPLETE_STAGE")}
                </Button>
              )}
              {isGroupStageFinished && (
                <Button type="primary" onClick={onClickDownloadProtocol}>
                  {t("COMMON.FINAL_PROTOCOL")}
                </Button>
              )}
            </Flex>
          ),
        }}
      />
      {isGroupStageFinished && <ReturnButton />}

      <FinalParticipantsModal
        isOpen={isModalOpen}
        onSubmit={onSubmitFinalParticipants}
        onCancel={() => setIsModalOpen(false)}
      />
    </Flex>
  );
}
