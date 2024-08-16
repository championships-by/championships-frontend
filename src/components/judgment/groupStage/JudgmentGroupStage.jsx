import { MatchesProvider } from "@contexts/MatchesContext";
import { TabsProvider } from "@contexts/TabsContext";
import { GroupStageTabs } from "@modules/judgment/groupStage/GroupStageTabs";
import { groupStageTabs } from "@modules/judgment/groupStage/constants";
import { useParams } from "react-router-dom";

function JudgmentGroupStage() {
  const { eventId, nominationId } = useParams();
  return (
    <MatchesProvider eventId={eventId} nominationId={nominationId}>
      <TabsProvider initialTabs={groupStageTabs}>
        <GroupStageTabs />
      </TabsProvider>
    </MatchesProvider>
  );
}

export default JudgmentGroupStage;
