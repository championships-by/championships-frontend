import { MatchesProvider } from "@/contexts/MatchesContext";
import { PlayOffTabs } from "@/modules/judgment/playOff/PlayOffTabs";
import { useParams } from "react-router-dom";

function JudgmentPlayOff() {
  const { eventId, nominationId } = useParams();
  return (
    <MatchesProvider eventId={eventId} nominationId={nominationId}>
      <PlayOffTabs />
    </MatchesProvider>
  );
}

export default JudgmentPlayOff;
