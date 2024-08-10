import { useContext } from "react";
import { MatchesGroupStage } from "../modules/judgment/groupStage/components";

/**
 * Hook to access the tabs context.
 *
 * @returns {{ tabs: Object, createTabs: Function, deleteTabs: Function, updateTabs: Function }}
 * @example
 * const { tabs, createTabs, deleteTabs, updateTabs } = useTabs();
 * createTabs({ [Tabs.TAB_3]: { title: "Tab #3" } });
 */
export const useTabs = () => {
  const context = useContext(MatchesGroupStage);
  if (!context) throw new Error("useTabs must be used within a TabsProvider");
  return context;
};
