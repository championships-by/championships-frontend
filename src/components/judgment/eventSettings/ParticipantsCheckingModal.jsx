import { Modal, Button, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ParticipantsCheckingModal = ({ data, isOpen, onCancel, onOk }) => {
  const [updatedData, setUpdatedData] = useState(null);
  const { t } = useTranslation();

  const initializeData = (rawData) => {
    return {
      ...rawData,
      team_participants: rawData.team_participants.map((team) => ({
        ...team,
        team: {
          ...team.team,
          participants: team.team.participants.map((p) => ({
            ...p,
            presense: p.presense ?? false,
          })),
        },
      })),
    };
  };

  useEffect(() => {
    if (data) {
      setUpdatedData(initializeData(data));
    }
  }, [data]);

  const handleCheckboxChange = (
    { target: { checked } },
    teamId,
    participantId
  ) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      team_participants: prevData.team_participants.map(({ team, ...rest }) =>
        team.id === teamId
          ? {
              ...rest,
              team: {
                ...team,
                participants: team.participants.map((p) =>
                  p.participant_data.id === participantId
                    ? { ...p, presense: checked }
                    : p
                ),
              },
            }
          : { team, ...rest }
      ),
    }));
  };

  return (
    <Modal
      title={t("EVENTS.PARTICIPANTS_LIST")}
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {t("COMMON.CANCEL")}
        </Button>,
        <Button key="ok" type="primary" onClick={() => onOk(updatedData)}>
          {t("COMMON.OK")}
        </Button>,
      ]}
    >
      {updatedData &&
        updatedData.team_participants.map((team) => (
          <div key={team.team.id}>
            <h3>{team.team.name}</h3>
            {team.team.participants.map((member) => (
              <div key={member.participant_data.id}>
                <Checkbox
                  checked={member.presense}
                  onChange={(e) =>
                    handleCheckboxChange(
                      e,
                      team.team.id,
                      member.participant_data.id
                    )
                  }
                >
                  {[
                    member.participant_data.first_name,
                    member.participant_data.second_name,
                    member.participant_data.third_name,
                  ].join(" ")}
                </Checkbox>
              </div>
            ))}
          </div>
        ))}
    </Modal>
  );
};

export default ParticipantsCheckingModal;
