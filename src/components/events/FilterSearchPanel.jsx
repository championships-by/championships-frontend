import { defaultEventFilterOptions, eventFilterOptions } from "@constants";
import { setEventFilters, setEventSearchValue } from "@store/events/slice";
import { Button, Card, Checkbox, Flex, Input, Typography } from "antd";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import "./FilterSearchPanel.scss";

export const FilterSearchPanel = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(defaultEventFilterOptions);

  const isAllFiltersSelected =
    filters.length === defaultEventFilterOptions.length;
  const isSomeFiltersSelected =
    filters.length > 0 && filters.length < defaultEventFilterOptions.length;

  const handleCheckAllChange = (e) => {
    setFilters(e.target.checked ? defaultEventFilterOptions : []);
  };

  const handleSubmit = useCallback(() => {
    dispatch(setEventSearchValue(search));
    dispatch(
      setEventFilters(filters.length <= 0 ? defaultEventFilterOptions : filters)
    );
    onSubmit?.(search, filters);
  }, [dispatch, filters, onSubmit, search]);

  const handleClear = useCallback(() => {
    setSearch("");
    setFilters(defaultEventFilterOptions);
    handleSubmit();
  }, []);

  return (
    <Card className="filter-search-panel">
      <Flex vertical gap={16}>
        <Input
          placeholder="Поиск мероприятия"
          size="large"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Flex className="filter-search-panel__filters" vertical>
          <Typography>Уровень мероприятия</Typography>
          <Flex vertical gap={8}>
            <Checkbox
              indeterminate={isSomeFiltersSelected}
              onChange={handleCheckAllChange}
              checked={isAllFiltersSelected}
            >
              Все
            </Checkbox>
            <Checkbox.Group
              options={eventFilterOptions}
              defaultValue={defaultEventFilterOptions}
              value={filters}
              onChange={(selectedFilters) => setFilters(selectedFilters)}
            />
          </Flex>
        </Flex>
        <Flex className="filter-search-panel__buttons" gap="small" wrap>
          <Button size="large" onClick={handleClear}>
            Очистить
          </Button>
          <Button size="large" type="primary" onClick={handleSubmit}>
            Применить
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
