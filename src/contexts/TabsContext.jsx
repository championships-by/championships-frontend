import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Context for managing tabs.
 */
export const TabsContext = createContext();

/**
 * Context provider for managing tabs.
 *
 * @param {Object} props
 * @param {Object} props.initialTabs Initial tabs object.
 * @param {ReactNode} props.children Children components.
 * @returns {JSX.Element}
 */
export const TabsProvider = ({ initialTabs, children }) => {
  const [tabs, setTabs] = useState({});

  /**
   * Create a new tab or multiple tabs.
   *
   * @param {Object} newTabs Object with new tabs, where keys are tab IDs and values are tab objects.
   * @example
   * createTabs({ [Tabs.TAB_3]: { title: "Tab #3" } });
   * createTabs({
   *   [Tabs.TAB_4]: { title: "Tab #4" },
   *   [Tabs.TAB_5]: { title: "Tab #5" },
   * });
   */
  const createTabs = useCallback(
    (newTabs) => setTabs((prevTabs) => ({ ...prevTabs, ...newTabs })),
    []
  );

  /**
   * Delete one or multiple tabs.
   *
   * @param {Array<string>} keys Array of tab IDs to delete.
   * @example
   * deleteTabs([Tabs.TAB_3, Tabs.TAB_4]);
   */
  const deleteTabs = useCallback((keys) => {
    setTabs((prevTabs) => {
      const newTabs = { ...prevTabs };
      keys.forEach((key) => delete newTabs[key]);
      return newTabs;
    });
  }, []);

  /**
   * Update one or multiple tabs.
   *
   * @param {Object} updates Object with updates, where keys are tab IDs and values are update objects.
   * @example
   * updateTabs({
   *   [Tabs.TAB_3]: { title: "New title" },
   *   [Tabs.TAB_4]: { content: "New content" },
   * });
   */
  const updateTabs = useCallback((updates) => {
    setTabs((prevTabs) => {
      const newTabs = { ...prevTabs };
      Object.keys(updates).forEach((key) => {
        if (prevTabs[key]) {
          newTabs[key] = { ...prevTabs[key], ...updates[key] };
        }
      });
      return newTabs;
    });
  }, []);

  useEffect(() => {
    setTabs(initialTabs);
  }, [initialTabs]);

  const context = useMemo(
    () => ({
      tabs,
      createTabs,
      deleteTabs,
      updateTabs,
    }),
    [createTabs, deleteTabs, tabs, updateTabs]
  );

  return (
    <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
  );
};
