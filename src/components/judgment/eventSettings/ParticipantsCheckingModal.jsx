import { Modal, Button, Checkbox } from "antd";
import { useEffect, useState } from "react";

const ParticipantsCheckingModal = ({ data, isOpen, onCancel, onOk }) => {
  const [teams, setTeams] = useState([]);
  const [presenseList, setPresenseList] = useState([]);

  useEffect(() => {
    if (data) {
      setTeams(data.team_participants);

      const updatedPresenseList = data.team_participants.flatMap((item) =>
        item.team.participants.map((participant) => ({
          ...participant,
          presense: false,
        }))
      );

      setPresenseList(updatedPresenseList);
    }
  }, [data]);

  const handleCheckboxChange = (e, id) => {
    setPresenseList((prevList) =>
      prevList.map((participant) =>
        participant.participant_data.id === id
          ? { ...participant, presense: e.target.checked }
          : participant
      )
    );
  };

  return (
    <Modal
      title="Список участников"
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Отмена
        </Button>,
        <Button key="ok" type="primary" onClick={() => onOk(presenseList)}>
          ОК
        </Button>,
      ]}
    >
      {teams.map((team) => (
        <div key={team.team.id}>
          <h3>{team.team.name}</h3>
          {team.team.participants.map((member) => {
            const id = member.participant_data.id;
            return (
              <div key={id}>
                <Checkbox onChange={(e) => handleCheckboxChange(e, id)}>
                  {`${member?.participant_data?.first_name || ""} 
                    ${member?.participant_data?.second_name || ""} 
                    ${member?.participant_data?.third_name || ""}`}
                </Checkbox>
              </div>
            );
          })}
        </div>
      ))}
    </Modal>
  );
};

export default ParticipantsCheckingModal;
