import { MatchesProvider } from "@contexts/MatchesContext";
import { GroupStageTabs } from "@modules/judgment/groupStage/GroupStageTabs";
import { useParams } from "react-router-dom";

function JudgmentGroupStage() {
  const { eventId, nominationId } = useParams();
  return (
    <MatchesProvider eventId={eventId} nominationId={nominationId}>
      <GroupStageTabs />
    </MatchesProvider>
  );
}

export default JudgmentGroupStage;
