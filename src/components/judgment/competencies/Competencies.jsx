import { TabsProvider } from "@contexts/TabsContext";
import CompetenciesTab from "@modules/judgment/competencies/CompetenciesTab";
import { competenciesTabs } from "@modules/judgment/competencies/constants";

function Competencies() {
  return (
    <TabsProvider initialTabs={competenciesTabs}>
      <CompetenciesTab />
    </TabsProvider>
  );
}

export default Competencies;
