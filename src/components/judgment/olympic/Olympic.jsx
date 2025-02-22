import { MatchesProvider } from "@contexts/MatchesContext";
import { GroupStageTabs } from "@modules/judgment/olympic/OlympicTabs";
import { useParams } from "react-router-dom";

function Olympic() {
  const { eventId, nominationId } = useParams();
  return (
    <MatchesProvider eventId={eventId} nominationId={nominationId}>
      <GroupStageTabs />
    </MatchesProvider>
  );
}

export default Olympic;
