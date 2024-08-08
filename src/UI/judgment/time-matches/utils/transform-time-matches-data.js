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
