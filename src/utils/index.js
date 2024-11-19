import { defaultFormat, defaultTime, url } from "@constants";
import i18n from "@src/translations/translations";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import JSEncrypt from "jsencrypt";
import * as qs from "qs";

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

export const fetchWithPagination = async (
  instance,
  url,
  params = {},
  limit = 49,
  offset = 0
) => {
  const response = await instance.get(url, {
    params: { ...params, offset, limit },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  const { data } = response;

  if (data.length === limit) {
    return fetchWithPagination(
      instance,
      url,
      params,
      limit,
      offset + limit
    ).then((nextData) => [...data, ...nextData]);
  }

  return data;
};

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
      title: `${translate("COMMON.ATTEMPT")} №${i + 1}`,
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
    participants: team.participants
      .map(
        (participant) =>
          `${participant.second_name} ${participant.first_name} ${participant.third_name}`
      )
      .join(", "),
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
    participants: `${round.participant_data.second_name} ${round.participant_data.first_name} ${round.participant_data.third_name}`,
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
    participants: result.participants,
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
      ({ result, isDisqualified }) =>
        (!result || result === undefined || result === null) && !isDisqualified
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

export const getTextByTabIndex = (tabIndex, arr) => arr[tabIndex - 1];

export const getClickHandler = (selector, handlers) => handlers[selector()];

export const isAttemptDisqualified = (value) => value === defaultTime;

export const getContentSectionWidth = () => {
  const adminPanelWidth = document.getElementById("admin-panel").offsetWidth;
  const adminPanelMenuWidth = document.getElementById("sidebar").offsetWidth;
  const adminPanelContent = document.getElementById("content");
  const adminPanelContentStyles = getComputedStyle(adminPanelContent);
  return (
    adminPanelWidth -
    adminPanelMenuWidth -
    parseInt(adminPanelContentStyles.getPropertyValue("padding-left"), 10) -
    parseInt(adminPanelContentStyles.getPropertyValue("padding-right"), 10)
  );
};

export function translate(key) {
  if (i18n.isInitialized) {
    return i18n.t(key);
  } else {
    i18n.on("initialized", () => {
      return i18n.t(key);
    });
  }
}

export const getEventLevel = (eventLevel) => {
  switch (eventLevel) {
    case "republic":
      return translate("EVENT_LEVELS.REPUBLIC");
    case "region":
      return translate("EVENT_LEVELS.REGION");
    case "district":
      return translate("EVENT_LEVELS.DISTRICT");
    case "town":
      return translate("EVENT_LEVELS.TOWN");
    case "other":
      return translate("EVENT_LEVELS.OTHER");
    default:
      return "Неизвестно";
  }
};

export const getRoleFilters = (roleFilters) => {
  const { t } = useTranslation();

  return roleFilters.map((filter) => ({
    text: t(filter.text),
    value: filter.value,
  }));
};

export const getEventsFilters = (eventFilters) => {
  const { t } = useTranslation();

  return eventFilters.map((filter) => ({
    label: t(filter.label),
    value: filter.value,
  }));
};

export const getTranslate = (text) => {
  const { t } = useTranslation();
  return t(text);
};
