import { tabsButtonEventEmitter, TabsButtonEvents } from "@constants";
import { useTabs } from "@hooks/useTabs";
import { Button, Tabs } from "antd";
import { CompetenciesResults, CompetenciesTable } from "./components";

function CompetenciesTab() {
  const { tabs } = useTabs();

  const onClick = (e) => {
    e.preventDefault();
    tabsButtonEventEmitter.emit(TabsButtonEvents.ON_CLICK);
  };

  return (
    <Tabs
      items={[
        {
          ...tabs[0],
          children: <CompetenciesTable />,
        },
        {
          ...tabs[1],
          children: <CompetenciesResults />,
        },
      ]}
      tabBarExtraContent={{
        right: (
          <Button onClick={onClick} type="primary">
            Завершить этап
          </Button>
        ),
      }}
    />
  );
}

export default CompetenciesTab;
