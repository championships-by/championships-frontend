import { TabsProvider } from "@contexts/TabsContext";
import { TimeMatchesTabs } from "@modules/judgment/timeMatches/TimeMatchesTabs";
import { timeMatchesTabs } from "@modules/judgment/timeMatches/constants";

export default function TimeMatches() {
  return (
    <TabsProvider initialTabs={timeMatchesTabs}>
      <TimeMatchesTabs />
    </TabsProvider>
  );
}
