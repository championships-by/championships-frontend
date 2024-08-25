import { useTabs } from "@hooks/useTabs";
import { Button, Tabs } from "antd";

function CompetenciesTab() {
  const { tabs } = useTabs();

  return (
    <Tabs
      items={tabs}
      tabBarExtraContent={{
        right: <Button type="primary">Завершить этап</Button>,
      }}
    />
  );
}

export default CompetenciesTab;
