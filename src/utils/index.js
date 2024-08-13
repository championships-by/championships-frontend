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
