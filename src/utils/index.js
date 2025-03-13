import { EventFilters, defaultFormat, defaultTime, url } from "@constants";
import { competenciesApi, eventApi } from "@api";
import {
  ROUTES,
  MAX_TEXTAREA_LENGTH,
  medals,
  RESULTS_EDITABILITY_MINUTES,
} from "@constants";
import i18n from "@src/translations/translations";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import JSEncrypt from "jsencrypt";
import * as qs from "qs";

dayjs.extend(utc);

export const FILTER_OPTION = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export const MatchResult = {
  TEAM1: "team1",
  TEAM2: "team2",
  DRAW: "draw",
};

export const determinateTheWinner = (score1, score2) => {
  if (score1 === null || score2 === null) {
    return MatchResult.DRAW;
  }

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
      title: `${i18n.t("COMMON.ATTEMPT")} №${i + 1}`,
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

export const transformCriteriaResultsData = (criteriaResults, isFinished) =>
  criteriaResults.team_data.map((team, index) => ({
    id: index + 1,
    team: {
      id: team.team_data.team_id,
      name: team.team_data.team_name,
    },
    participants: team.participants.map(
      (participant) =>
        `${participant.second_name} ${participant.first_name} ${participant.third_name}`
    ),
    criteria: team.criterias.map((criterion) => ({
      id: criterion.criteria_id,
      name: criterion.criteria_name,
      maxScore: criterion.max_score,
      score: isFinished ? criterion.score : null,
      initialScore: criterion.score,
    })),
    totalScore: team.criterias.reduce((acc, obj) => (acc += obj.score), 0),
  }));

export const transformTimeMatchesData = (rounds, empty) => {
  return rounds.map((round, index) => ({
    key: `round-${index + 1}`,
    teamName: round.team_data.team_name,
    participants: round.participants.map(
      ({ second_name, first_name, third_name }) =>
        `${second_name} ${first_name} ${third_name}`
    ),
    attempts: round.attempts.map(({ id, result }) => ({
      id,
      result: !empty ? result : null,
      isDisqualified: false,
    })),
    bestAttempt:
      round.best_attempt && !empty
        ? {
            id: round.best_attempt.id,
            result: round.best_attempt.result,
          }
        : null,
  }));
};

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

export const getEventLevel = (eventLevel) => {
  switch (eventLevel) {
    case EventFilters.REPUBLIC:
      return "EVENT_LEVELS.REPUBLIC";
    case EventFilters.REGION:
      return "EVENT_LEVELS.REGION";
    case EventFilters.DISTRICT:
      return "EVENT_LEVELS.DISTRICT";
    case EventFilters.TOWN:
      return "EVENT_LEVELS.TOWN";
    case EventFilters.OTHER:
      return "EVENT_LEVELS.OTHER";
    default:
      return "COMMON.UNKNOWN";
  }
};

export const getTranslation = (locale, t) => {
  const translateValue = (value) => {
    if (typeof value === "string") {
      return t(value);
    } else if (Array.isArray(value)) {
      return value.map((item) => translateValue(item));
    } else if (typeof value === "object" && value !== null) {
      return Object.entries(value).reduce((translated, [key, val]) => {
        translated[key] = translateValue(val);
        return translated;
      }, {});
    }

    return value;
  };

  return translateValue(locale);
};

export const downloadProtocol = async (eventId, nominationId) => {
  const params = {
    event_id: eventId,
    nomination_id: nominationId,
  };

  const response = await competenciesApi.getNominationEventProtocol(params);

  const blob = new Blob([response.data], { type: "application/pdf" });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;

  const contentDisposition = response.headers["content-disposition"];
  const fileNameMatch = contentDisposition?.match(/filename\*=utf-8''(.+)/);
  const fileName = fileNameMatch
    ? decodeURIComponent(fileNameMatch[1])
    : "Финальный протокол.pdf";

  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const downloadCriteriaExcel = async (eventId, nominationId) => {
  const params = {
    event_id: eventId,
    nomination_id: nominationId,
  };

  const response =
    await competenciesApi.getNominationEventCriteriaExcel(params);

  const blob = new Blob([response.data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;

  const contentDisposition = response.headers["content-disposition"];
  const fileNameMatch = contentDisposition?.match(/filename\*=utf-8''(.+)/);
  const fileName = fileNameMatch
    ? decodeURIComponent(fileNameMatch[1])
    : "Критерии.xlsx";

  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const downloadCompetenceParticipantsExcel = async (
  eventId,
  nominationId,
  nominationType
) => {
  const params = {
    event_id: eventId,
    nomination_id: nominationId,
    kind: nominationType,
  };

  const response =
    await competenciesApi.getNominationEventParticipantsExcel(params);

  const blob = new Blob([response.data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;

  const contentDisposition = response.headers["content-disposition"];
  const fileNameMatch = contentDisposition?.match(/filename\*=utf-8''(.+)/);
  const fileName = fileNameMatch
    ? decodeURIComponent(fileNameMatch[1])
    : "Участники компетенции.xlsx";

  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const remakeSoftware = (dataList, inputString) => {
  const substrings = inputString.split(",");
  let substringIndex = 0;
  const result = dataList.map((item) => {
    if (substringIndex < substrings.length) {
      item.software = substrings[substringIndex].trim();
      substringIndex++;
    } else {
      item.software = "";
    }
    return item;
  });
  if (substringIndex < substrings.length) {
    const remainingSubstrings = substrings.slice(substringIndex).join(",");
    result[result.length - 1].software += `,${remainingSubstrings}`;
  }
  return result;
};

export const remakeEquipment = (dataList, inputString) => {
  const substrings = inputString.split(",");
  let substringIndex = 0;
  const result = dataList.map((item) => {
    if (substringIndex < substrings.length) {
      item.equipment = substrings[substringIndex].trim();
      substringIndex++;
    } else {
      item.equipment = "";
    }
    return item;
  });
  if (substringIndex < substrings.length) {
    const remainingSubstrings = substrings.slice(substringIndex).join(",");
    result[result.length - 1].equipment += `,${remainingSubstrings}`;
  }
  return result;
};

export const findRouteTitle = async (path) => {
  const routesArray = Object.values(ROUTES);

  const directMatch = routesArray.find(
    (route) => typeof route.PATH === "string" && route.PATH === path
  );
  if (directMatch) return directMatch.TITLE;

  const functionMatch = routesArray.find(
    (route) =>
      typeof route.PATH === "function" &&
      path.startsWith(route.PATH("").replace(/\/$/, ""))
  );

  if (functionMatch) {
    if (functionMatch.TITLE === ROUTES.EVENTS_DESCRIPTION.TITLE) {
      const match = path.match(/\/events\/(\d+)/);

      if (match) {
        const eventID = match[1];

        let eventName = functionMatch.TITLE;

        await eventApi.getEvent(eventID).then((result) => {
          eventName = result.event.name;
        });

        return eventName;
      }
      return functionMatch.TITLE;
    }
  }
  return null;
};

export const removeHtmlTags = (html) => {
  return html ? html.replace(/<\/?[^>]+(>|$)/g, "") : "";
};

export const validateDescription = (value, t) => {
  const cleanedValue = removeHtmlTags(value);

  if (!cleanedValue || cleanedValue.length < 5) {
    return Promise.reject(new Error(t("RULES.MIN_5_SYMBOLS")));
  }
  if (cleanedValue.length > MAX_TEXTAREA_LENGTH) {
    return Promise.reject(new Error(t("RULES.MAX_3000_SYMBOLS")));
  }
  return Promise.resolve();
};

export const splitByCookies = (str) => {
  const match = str.match(/(.*?)(Cookies)(.*)/);
  if (match) {
    return [match[1], match[2], match[3]];
  }
  return ["", str, ""];
};

function cleanPlayoffTree(tree) {
  const nodesToRemove = new Set();

  tree.forEach((level) => {
    level.forEach((match) => {
      match.children = match.children.filter((childId) => {
        const child = tree.flat().find((node) => node.id === childId);

        if (!child) return true;

        const isRedundant =
          (child.team1?.id === match.team1?.id && child.team2 === null) ||
          (child.team1?.id === match.team2?.id && child.team2 === null);

        if (isRedundant) {
          nodesToRemove.add(childId);
          return false;
        }
        return true;
      });
    });
  });

  return tree.map((level) =>
    level.filter((match) => !nodesToRemove.has(match.id))
  );
}

export const getPlayOffLevels = (objects) => {
  const map = new Map();
  const levels = [];
  const rootNodes = [];

  objects.forEach((obj) => {
    map.set(obj.id, { ...obj, children: [] });
    if (obj.next_id === null) {
      rootNodes.push(obj.id);
    }
  });

  objects.forEach((obj) => {
    if (obj.next_id !== null) {
      const parent = map.get(obj.next_id);
      parent.children.push(obj.id);
    }
  });

  function traverse(nodeId, level) {
    if (!levels[level]) levels[level] = [];
    levels[level].push(map.get(nodeId));

    const node = map.get(nodeId);
    node.children.forEach((childId) => traverse(childId, level + 1));
  }

  rootNodes.forEach((rootId) => traverse(rootId, 0));

  if (levels[0]) {
    levels[0].sort((b, a) => (a.children.length === 0 ? 1 : -1));
  }

  const cleanLevels = cleanPlayoffTree(levels);
  return cleanLevels;
};

export const extendWithTreePositions = (leveledMatches) => {
  const coeffY = 200;
  const coeffX = 350;
  const levels = leveledMatches.length;

  const startX = (levels - 1) * coeffX;
  const startY = coeffY * levels;

  return leveledMatches.map((level, levelIndex) =>
    level.map((match, index) => {
      const deltaY = (levels / 2 ** levelIndex) * coeffY;

      let xPos = startX - levelIndex * coeffX;
      let yPos = startY - index * deltaY - 0.5 * deltaY;

      if (levelIndex === 0) {
        if (match.children.length !== 0) {
          yPos = startY - 0.5 * deltaY;
        } else {
          yPos = startY - 0.5 * deltaY + 0.5 * coeffY;
        }
      }

      return { ...match, xPos, yPos };
    })
  );
};

export const getTreeData = (leveledMatches, handleEditScore) => {
  const nodes = [];
  const edges = [];
  leveledMatches = extendWithTreePositions(leveledMatches);

  const nodesCount = leveledMatches.reduce(
    (accumulator, level) => accumulator + level.length,
    0
  );

  let overallIndex = 0;
  leveledMatches.forEach((level, levelIndex) => {
    level.forEach((match, index) => {
      if (!match.team1 && !match.team2) {
        return;
      }
      nodes.push({
        id: match.id.toString(),
        data: {
          id: match.id,
          matchIndex: nodesCount - overallIndex,
          team1: match.team1,
          team2: match.team2,
          onEditScore: () => handleEditScore(match),
          lastCreatorEmail: match.lastResultCreatorEmail,
        },
        type: "customNode",
        position: {
          x: match.xPos,
          y: match.yPos,
        },
      });

      match.children.forEach((childId) => {
        edges.push({
          id: `e${match.id}-${childId}`,
          source: match.id.toString(),
          target: childId.toString(),
          type: "step",
        });
      });
      overallIndex += 1;
    });
  });

  return { nodes, edges };
};

export const getPlayoffResults = (leveledMatches) => {
  const playoffData = leveledMatches.flat();

  const scores = new Map();
  const matches = new Map();
  const childrenMap = new Map();

  let rootMatch = null;

  playoffData.forEach((match) => {
    matches.set(match.id, match);
    if (match.next_id === null) rootMatch = match;

    if (!childrenMap.has(match.id)) {
      childrenMap.set(match.id, []);
    }

    match.children.forEach((childId) => {
      childrenMap.get(match.id).push(childId);
    });

    if (match.team1) {
      scores.set(
        match.team1.id,
        (scores.get(match.team1.id) || 0) + match.team1.score
      );
    }

    if (match.team2) {
      scores.set(
        match.team2.id,
        (scores.get(match.team2.id) || 0) + match.team2.score
      );
    }
  });

  if (!rootMatch) return [];

  let rankings = [];
  let place = 0;

  function processMatch(match, place) {
    if (!(match.team1 && match.team2)) {
      return place;
    }

    let [winner, loser] =
      match.team1.score > match.team2.score
        ? [match.team1, match.team2]
        : [match.team2, match.team1];

    if (!rankings.some((entry) => entry.id === winner.id)) {
      rankings.push({
        id: winner.id,
        team: winner.name,
        score: scores.get(winner.id),
        place: place,
      });
    }

    if (!rankings.some((entry) => entry.id === loser.id)) {
      rankings.push({
        id: loser.id,
        team: loser.name,
        score: scores.get(loser.id),
        place: place + 1,
      });
    }

    let nextPlace = place + 1;
    if (childrenMap.has(match.id)) {
      childrenMap.get(match.id).forEach((childId) => {
        nextPlace = processMatch(matches.get(childId), nextPlace);
      });
    }
    return nextPlace;
  }

  processMatch(rootMatch, place);
  return rankings;
};

export const getMedal = (place) => {
  return medals[place];
};

export const getPlace = (index, maxPlace) => {
  return index + (maxPlace ? maxPlace - 1 : 0);
};

export const transformParticipantsInSystemData = (data) => {
  return data?.map((item) => {
    const fullName = `${item.second_name} ${item.first_name} ${item.third_name}`;
    const birthDate = item.birth_date;
    return {
      value: item.id,
      label: `${fullName}, ${changeDateFormat(birthDate)}`,
    };
  });
};

export const getParticipantLink = (id) => {
  return url + ROUTES.PARTICIPANT_INFORMATION.PATH(id);
};

export const getMinutesAfterFinishing = (endTime) => {
  return dayjs.utc().diff(endTime, "minutes");
};

export const isStillEditable = (endTime) => {
  try {
    const dayjsTime = dayjs.utc(endTime);
    return getMinutesAfterFinishing(dayjsTime) < RESULTS_EDITABILITY_MINUTES;
  } catch (err) {}
  return false;
};
