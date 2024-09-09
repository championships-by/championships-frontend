import { defaultFormat, defaultTime, url } from "@constants";
import dayjs from "dayjs";
import JSEncrypt from "jsencrypt";

export const FILTER_OPTION = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export const MatchResult = {
  TEAM1: "team1",
  TEAM2: "team2",
  DRAW: "draw",
};

export const determinateTheWinner = (score1, score2) => {
  if (score1 > score2) {
    return MatchResult.TEAM1;
  }

  if (score2 > score1) {
    return MatchResult.TEAM2;
  }

  return MatchResult.DRAW;
};

export const isScoreZero = (score1, score2) => !!(score1 === 0 && score2 === 0);

export const isScoreEqual = (score1, score2) => score1 === score2;

export const handlePaste = (event) => {
  event.preventDefault();
  const clipboardData = (event.clipboardData || window.clipboardData).getData(
    "text"
  );
  const sanitizedData = clipboardData.replace(/\s/g, "");
  const input = event.target;
  const { value } = input;
  const { selectionStart } = input;
  const { selectionEnd } = input;
  input.value =
    value.substring(0, selectionStart) +
    sanitizedData +
    value.substring(selectionEnd);
  input.setSelectionRange(
    selectionStart + sanitizedData.length,
    selectionStart + sanitizedData.length
  );
  input.dispatchEvent(new Event("input", { bubbles: true }));
};

export const formatTime = (time = defaultTime, format = defaultFormat) =>
  dayjs(time, format);

export const formatTimeToString = (
  time = defaultTime,
  format = defaultFormat
) => dayjs(time, format).format(defaultFormat);

export const generateColumns = (data, render) => {
  if (data && data[0] && data[0].attempts) {
    return data[0].attempts.map((attempt, i) => ({
      key: `attempt-${i}`,
      dataIndex: `attempt-${i}`,
      title: `Попытка №${i + 1}`,
      render: (text, record, index) => render(text, record, index, i),
    }));
  }

  return [];
};

export const transformCriteriaData = (criteria) =>
  criteria.map((criterion) => ({
    id: criterion.id,
    name: criterion.name,
    maxScore: criterion.max_score,
  }));

export const transformCriteriaResultsData = (criteriaResults) =>
  criteriaResults.team_data.map((team, index) => ({
    id: index + 1,
    team: {
      id: team.team_data.team_id,
      name: team.team_data.team_name,
    },
    participant: {
      firstName: team.participant_data.first_name,
      secondName: team.participant_data.second_name,
      thirdName: team.participant_data.third_name,
    },
    criteria: team.criterias.map((criterion) => ({
      id: criterion.criteria_id,
      name: criterion.criteria_name,
      maxScore: criterion.max_score,
      score: criterion.score,
      initialScore: criterion.score,
    })),
    totalScore: team.criterias.reduce((acc, obj) => (acc += obj.score), 0),
  }));

export const transformTimeMatchesData = (rounds) =>
  rounds.map((round, index) => ({
    key: `round-${index + 1}`,
    teamName: round.team_name,
    participant: {
      firstName: round.participant_data.first_name,
      secondName: round.participant_data.second_name,
      thirdName: round.participant_data.third_name,
    },
    attempts: round.attempts.map(({ id, result }) => ({
      id,
      result,
      isDisqualified: false,
    })),
    bestAttempt: {
      id: round.best_attempt.id,
      result: round.best_attempt.result,
    },
  }));

export const changeDateFormat = (date) => {
  const formattedDate = dayjs(date);
  return formattedDate.format("DD.MM.YYYY");
};

export const getEventLevel = (eventLevel) => {
  switch (eventLevel) {
    case "republic":
      return "Республиканский";
    case "region":
      return "Областной";
    case "district":
      return "Районный";
    case "town":
      return "Городской";
    case "other":
      return "Другое";
    default:
      return "Неизвестно";
  }
};

export const getEncryptedPassword = (toEncrypt, publicKey) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);

  const encrypted = encrypt.encrypt(toEncrypt);

  return encrypted;
};

export const getUniqueFilters = (data, key) => {
  const uniqueValues = [...new Set(data.map((item) => item[key]))];

  return uniqueValues.map((value) => ({ text: value, value }));
};

export const generateCriteriaColumns = (criteria, render) =>
  criteria.map(({ name }, columnIndex) => ({
    title: name,
    dataIndex: `criteria${columnIndex}`,
    key: `criteria${columnIndex}`,
    render: (text, record, recordIndex) =>
      render(text, record, recordIndex, columnIndex),
  }));

export const generateCompetenciesDataSource = (criteriaResults) =>
  criteriaResults.map((result) => ({
    key: `participant-${result.id}`,
    team: {
      id: result.team.id,
      name: result.team.name,
    },
    participant: {
      firstName: result.participant.firstName,
      secondName: result.participant.secondName,
      thirdName: result.participant.thirdName,
    },
    ...Object.keys(result.criteria).reduce(
      (acc, key) => ({
        ...acc,
        [`criteria${key}`]: {
          id: result.criteria[key].id,
          score: result.criteria[key].score,
          maxScore: result.criteria[key].maxScore,
          initialScore: result.criteria[key].initialScore,
        },
      }),
      {}
    ),
    totalScore: result.totalScore,
  }));

export const openPdf = (eventRulesPath) => {
  const pdfUrl = `${url}/${eventRulesPath}`;
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const transformStageStatus = (info) => ({
  regulations: info.reglament,
  registrationFinished: info.registration_finished,
  tournamentStarted: info.tournament_started,
  tournamentFinished: info.tournament_finished,
});

export const isTimeMatchesFilled = (timeMatches) =>
  !timeMatches.some((timeMatch) =>
    timeMatch.attempts.some(
      ({ result }) => !result || result === undefined || result === null
    )
  );

export const isCriteriaFilled = (criteria) =>
  criteria.every((result) =>
    Object.keys(result).reduce((acc, key) => {
      if (key.startsWith("criteria")) {
        return (
          acc && result[key].score !== null && result[key].score !== undefined
        );
      }
      return acc;
    }, true)
  );
