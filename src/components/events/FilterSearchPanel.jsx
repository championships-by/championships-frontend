import { defaultEventFilterOptions, eventFilterOptions } from "@constants";
import { Button, Card, Checkbox, Flex, Input, Typography } from "antd";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setEventFilters, setEventSearchValue } from "../../store/events/slice";

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
    <Card style={{ backgroundColor: "#7EA7F9", border: 0 }}>
      <Flex vertical gap={16}>
        <Input
          placeholder="Поиск мероприятия"
          size="large"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Flex vertical>
          <Typography
            style={{
              fontWeight: 500,
              fontSize: 16,
              lineHeight: "26px",
              marginBottom: "4px",
            }}
          >
            Уровень мероприятия
          </Typography>
          <Flex vertical gap={8}>
            <Checkbox
              indeterminate={isSomeFiltersSelected}
              onChange={handleCheckAllChange}
              checked={isAllFiltersSelected}
            >
              Все
            </Checkbox>
            <Checkbox.Group
              style={{ flexDirection: "column", gap: "8px", fontSize: "10px" }}
              options={eventFilterOptions}
              defaultValue={defaultEventFilterOptions}
              value={filters}
              onChange={(selectedFilters) => setFilters(selectedFilters)}
            />
          </Flex>
        </Flex>
        <Flex gap="small" wrap>
          <Button size="large" style={{ width: "50%" }} onClick={handleClear}>
            Очистить
          </Button>
          <Button
            size="large"
            type="primary"
            style={{ width: "50%" }}
            onClick={handleSubmit}
          >
            Применить
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
