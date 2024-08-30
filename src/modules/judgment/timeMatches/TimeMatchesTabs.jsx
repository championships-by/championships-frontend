import { useTabs } from "@hooks/useTabs";
import { Button, Tabs } from "antd";
import { TimeMatchesResults, TimeMatchesTable } from "./components";

export const TimeMatchesTabs = () => {
  const { tabs } = useTabs();

  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          ...tabs[0],
          children: <TimeMatchesTable />,
        },
        {
          ...tabs[1],
          children: <TimeMatchesResults />,
        },
      ]}
      tabBarExtraContent={{
        right: (
          <Button onClick={() => console.log("clicked")} type="primary">
            Завершить этап
          </Button>
        ),
      }}
    />
  );
};
