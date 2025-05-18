import { isScoreEqual } from "@/utils";
import { Button, InputNumber, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import "@/modules/judgment/groupStage/modals/sass/edit-match-score-modal.scss";

export const EditMatchScoreModal = ({ isOpen, match, onSubmit, onClose }) => {
  const { t } = useTranslation();
  const { team1, team2 } = match;

  const [team1Score, setTeam1Score] = useState(team1.score);
  const [team2Score, setTeam2Score] = useState(team2.score);

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleSendScore = (e) => {
    e.preventDefault();
    onSubmit({
      ...match,
      team1: { ...team1, score: team1Score },
      team2: { ...team2, score: team2Score },
      type: "group",
    });
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setTeam1Score(team1.score);
      setTeam2Score(team2.score);
    }
  }, [isOpen, team1, team2]);

  return (
    <Modal
      title={t("TOURNAMENTS.REPORT_SCORE")}
      open={isOpen}
      onCancel={handleCancel}
      footer={
        <Button type="primary" onClick={handleSendScore}>
          {t("TOURNAMENTS.SEND_RATINGS")}
        </Button>
      }
    >
      <div className="edit-match-score-modal">
        <div className="edit-match-score-modal__header-section">
          <h2>{t("COMMON.TEAM")}</h2>
          <h2>{t("TOURNAMENTS.SCORE")}</h2>
        </div>
        <div className="edit-match-score-modal__input-section">
          <Typography.Title level={5}>{team1.name}</Typography.Title>
          <InputNumber
            min={0}
            value={team1Score}
            onChange={(value) => setTeam1Score(value)}
          />
          <Typography.Title level={5}>{team2.name}</Typography.Title>
          <InputNumber
            min={0}
            value={team2Score}
            onChange={(value) => setTeam2Score(value)}
          />
        </div>
      </div>
    </Modal>
  );
};
