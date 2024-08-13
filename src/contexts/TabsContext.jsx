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
 * @param {Array<Object>} props.initialTabs Initial tabs array.
 * @param {ReactNode} props.children Children components.
 * @returns {JSX.Element}
 */
export const TabsProvider = ({ initialTabs, children }) => {
  const [tabs, setTabs] = useState([]);

  /**
   * Create a new tab or multiple tabs.
   *
   * @param {Array<Object>} newTabs Array of new tabs.
   * @example
   * createTabs([{ id: Tabs.TAB_3, title: "Tab #3" }]);
   * createTabs([
   *   { id: Tabs.TAB_4, title: "Tab #4" },
   *   { id: Tabs.TAB_5, title: "Tab #5" },
   * ]);
   */
  const createTabs = useCallback(
    (newTabs) => setTabs((prevTabs) => [...prevTabs, ...newTabs]),
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
    setTabs((prevTabs) => prevTabs.filter((tab) => !keys.includes(tab.id)));
  }, []);

  /**
   * Update one or multiple tabs.
   *
   * @param {Array<Object>} updates Array of updates, where each object has an `id` property and update properties.
   * @example
   * updateTabs([
   *   { id: Tabs.TAB_3, title: "New title" },
   *   { id: Tabs.TAB_4, content: "New content" },
   * ]);
   */
  const updateTabs = useCallback((updates) => {
    setTabs((prevTabs) => {
      return prevTabs.map((tab) => {
        const update = updates.find((update) => update.id === tab.id);
        return update ? { ...tab, ...update } : tab;
      });
    });
  }, []);

  useEffect(() => {
    const transformedTabs = Object.values(initialTabs).map((tab) => ({
      ...tab,
    }));
    setTabs(transformedTabs);
  }, [initialTabs]);

  const context = useMemo(
    () => ({
      tabs,
      createTabs,
      deleteTabs,
      updateTabs,
    }),
    [tabs, createTabs, deleteTabs, updateTabs]
  );

  return (
    <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
  );
};
