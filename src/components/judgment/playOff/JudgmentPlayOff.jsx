import { MatchesProvider } from "@contexts/MatchesContext";
import { GroupStageTabs } from "@modules/judgment/playOff/PlayOffTabs";
import { useParams } from "react-router-dom";

function JudgmentPlayOff() {
  const { eventId, nominationId } = useParams();
  return (
    <MatchesProvider eventId={eventId} nominationId={nominationId}>
      <GroupStageTabs />
    </MatchesProvider>
  );
}

export default JudgmentPlayOff;
