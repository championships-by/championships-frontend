import { useContext } from "react";
import { TabsContext } from "../contexts/TabsContext";

/**
 * Hook to access the tabs context.
 *
 * @returns {{ tabs: Array<Object>, createTabs: Function, deleteTabs: Function, updateTabs: Function }}
 * @example
 * const { tabs, createTabs, deleteTabs, updateTabs } = useTabs();
 * createTabs({ [Tabs.TAB_3]: { title: "Tab #3" } });
 */
export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("useTabs must be used within a TabsProvider");
  return context;
};
