import { tabsButtonEventEmitter, TabsButtonEvents } from "@constants";
import { useTabs } from "@hooks/useTabs";
import { Button, Tabs } from "antd";

function CompetenciesTab() {
  const { tabs } = useTabs();

  const onClick = (e) => {
    e.preventDefault();
    tabsButtonEventEmitter.emit(TabsButtonEvents.ON_CLICK);
  };

  return (
    <Tabs
      items={tabs}
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
