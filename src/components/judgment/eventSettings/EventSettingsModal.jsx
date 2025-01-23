import { competenciesApi } from "@api";
import CompetitionJudge from "@modules/judgment/events/CompetitionJudgeName";
import CompetitionName from "@modules/judgment/events/CompetitionName";
import CompetitionType from "@modules/judgment/events/CompetitionType";
import ReglamentName from "@modules/judgment/events/ReglamentName";
import { Button, Flex, Form, Modal, message } from "antd";
import { ModalType, NOMINATIONS } from "@constants";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserSelector } from "@store/users";
import { useTranslation } from "react-i18next";

function EventSettingsCompitations({
  isOpen,
  onOk,
  onCancel,
  name,
  mode,
  onAdd,
  nominationId,
  eventName,
}) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputReglament, setInputReglament] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [groupCount, setGroupCount] = useState(1);
  const [criteria, setCriteria] = useState([]);
  const [selectedJudges, setSelectedJudges] = useState([]);
  const [oldJudges, setOldJudges] = useState([]);
  const [selectedType, setSelectedType] = useState();
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [selectedGroupCount, setSelectedGroupCount] = useState();
  const [isTournamentStarted, setIsTournamentStarted] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { eventID } = useParams();
  const user = useSelector(getUserSelector);
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === ModalType.EDIT) {
      const params = new URLSearchParams();
      params.append("event_id", eventID);
      params.append("nomination_id", nominationId);
      if (isOpen) {
        competenciesApi.getNominationEventInfo(params).then((data) => {
          const judgeIds = data.judges.map((judge) => judge.id);
          setSelectedJudges(judgeIds);

          form.setFieldsValue({
            nomination_name: data.nomination_name,
            reglament: data.reglament,
          });

          setIsTournamentStarted(data.tournament_started);
          if (data.tournament_started) {
            message.error(t("MESSAGES.TOURNAMENT_ALREADY_START"));
          }

          setInputName(data.nomination_name);
          setInputReglament(data.reglament);
          setSelectedType(data.type);

          if (data.type == NOMINATIONS.CRITERIA) {
            setCriteria(data.criterias);
            setSelectedCriteria(data.criterias);
          } else if (data.type == NOMINATIONS.TIME) {
            setGroupCount(data.race_round_amount);
            setSelectedGroupCount(data.race_round_amount);
          }

          setOldJudges(judgeIds);
        });
      }
    }
  }, [eventID, nominationId, form, isOpen]);

  const eventId = parseInt(eventID, 10);
  const handleInputNameChange = (value) => {
    setInputName(value);
  };

  const handleGroupCount = (value) => {
    setGroupCount(value);
  };

  const handleCriteriaChange = (newCriteria) => {
    setCriteria(newCriteria);
  };
  const handleInputReglamentChange = (value) => {
    setInputReglament(value);
  };

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleChangeJudges = (value) => {
    setSelectedJudges(value);
  };

  const onFinishFailed = () => {
    message.error(t("MESSAGES.CHECK_FIELDS"));
    setIsLoading(false);
  };

  const onFinish = async () => {
    setIsLoading(true);
    if (mode === ModalType.ADD) {
      if (
        !selectedValue ||
        (selectedValue === NOMINATIONS.CRITERIA && criteria.length === 0)
      ) {
        message.error(t("MESSAGES.CHOOSE_TYPE_OF_TOURNAMENT"));
        setIsLoading(false);
        return;
      }
      const data = {
        append_nomination_event_data: {
          event_id: eventId,
          nomination_name: inputName,
          reglament: inputReglament,
          judges_ids: selectedJudges,
        },
      };
      try {
        switch (selectedValue) {
          case NOMINATIONS.TIME:
            Object.assign(data, { race_round_amount: groupCount });
            await competenciesApi
              .addTimeCompetenciesForEvent(data)
              .then(() => {});
            break;

          case NOMINATIONS.OLYMPIC:
            await competenciesApi
              .addOlympicCompetenciesForEvent(data)
              .then(() => {});
            break;
          case NOMINATIONS.CRITERIA:
            Object.assign(data, { criterias: criteria });
            await competenciesApi
              .addCriteriaCompetenciesForEvent(data)
              .then(() => {});
            break;
          default:
            break;
        }
        if (selectedJudges.length !== 0) {
          try {
            const params = {
              user_full_name: `${user?.data.second_name} ${user?.data.first_name} ${user?.data.third_name}`,
              event_name: eventName,
              event_id: eventID,
            };
            const body = JSON.stringify(selectedJudges);
            await competenciesApi.sendJudgeNotice(params, body);
          } catch {}
        }

        message.success(t("MESSAGES.SUCCESS_NOMINATION_ADD"));
        onOk();
        onAdd();
        setInputName("");
        setInputReglament("");
        setSelectedJudges([]);
        form.resetFields();
        setRefreshKey((prevKey) => prevKey + 1);
      } catch {}
    } else if (mode === ModalType.EDIT) {
      try {
        const data = {
          nomination_name: inputName,
          reglament: inputReglament,
          judges_ids: selectedJudges,
        };
        const params = new URLSearchParams();
        params.append("event_id", eventID);
        params.append("nomination_id", nominationId);
        await competenciesApi.updateNominationEvent(params.toString(), data);

        try {
          const params = {
            user_full_name: `${user.first_name} ${user.third_name} ${user.second_name}`,
            event_name: eventName,
            event_id: eventID,
          };
          const filteredJudges = selectedJudges.filter(
            (judge) => !oldJudges.includes(judge)
          );

          if (filteredJudges.length !== 0) {
            const body = JSON.stringify(filteredJudges);
            await competenciesApi.sendJudgeNotice(params, body);
          }
        } catch {}

        switch (selectedType) {
          case NOMINATIONS.TIME: {
            const params = {
              nomination_id: nominationId,
              event_id: eventID,
              race_rounds_num: groupCount,
            };

            try {
              await competenciesApi.editNumberRaceRounds(params);
            } catch {}

            break;
          }
          case NOMINATIONS.CRITERIA: {
            const params = {
              nomination_id: nominationId,
              event_id: eventID,
            };

            const filteredCriteria = criteria.filter(
              (item) => item.name !== "" && item.max_score !== 0
            );

            if (selectedCriteria != criteria) {
              try {
                await competenciesApi.updateCriteria(filteredCriteria, params);
              } catch {}
            }

            break;
          }
        }

        message.success(t("MESSAGES.SUCCESS_NOMINATION_EDIT"));
        onOk();
        onAdd();
        setInputName("");
        setInputReglament("");
        setSelectedJudges([]);
        form.resetFields();
        setRefreshKey((prevKey) => prevKey + 1);
      } catch {}
    }
    setIsLoading(false);
  };

  return (
    <Modal
      title={name}
      className="event-settings__modal"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <Form
        key={refreshKey}
        form={form}
        layout="vertical"
        requiredMark="default"
        disabled={isTournamentStarted}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <CompetitionName
          onInputChange={handleInputNameChange}
          value={inputName}
          name="nomination_name"
        />
        <ReglamentName
          onInputChange={handleInputReglamentChange}
          value={inputReglament}
          name="reglament"
        />
        <CompetitionJudge
          onJudgeChange={handleChangeJudges}
          judges={selectedJudges}
        />
        <CompetitionType
          name="nomination_type"
          onChange={(value) => {
            if (mode == "edit") {
              return;
            }
            handleChange(value);
          }}
          onInputChange={handleGroupCount}
          onCriteriaChange={handleCriteriaChange}
          value={selectedType}
          criteriaValue={selectedCriteria}
          groupCountValue={selectedGroupCount}
        />
        <Flex gap="middle">
          <Button
            className="event-settings__saveButton"
            type="primary"
            loading={isLoading}
            htmlType="submit"
          >
            {t("COMMON.SAVE")}
          </Button>
          <Button className="event-settings__cancelButton" onClick={onCancel}>
            {t("COMMON.CANCEL")}
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
}

export default EventSettingsCompitations;
