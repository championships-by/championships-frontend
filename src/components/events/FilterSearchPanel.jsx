import { defaultEventFilterOptions, eventFilterOptions } from "@/const";
import { setEventFilters, setEventSearchValue } from "@/store/events/slice";
import { Button, Card, Checkbox, Flex, Input, Typography } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import "./FilterSearchPanel.scss";

export const FilterSearchPanel = ({ onSubmit }) => {
  const { t } = useTranslation();
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

  const getEventsFilters = (eventFilters) => {
    return eventFilters.map((filter) => ({
      label: t(filter.label),
      value: filter.value,
    }));
  };

  const handleSubmit = () => {
    dispatch(setEventSearchValue(search));
    dispatch(
      setEventFilters(filters.length <= 0 ? defaultEventFilterOptions : filters)
    );
    onSubmit?.(search, filters);
  };

  const handleFilterChange = (selectedFilters, groupFilters) => {
    setFilters((prevFilters) => {
      const remainingFilters = prevFilters.filter(
        (filter) => !groupFilters.includes(filter)
      );

      return [...remainingFilters, ...selectedFilters];
    });
  };

  return (
    <Card className="filter-search-panel">
      <Flex vertical gap={16}>
        <Input
          placeholder={t("EVENTS.SEARCH_EVENT")}
          size="large"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Flex className="filter-search-panel__filters" vertical>
          <Typography className="filter-search-panel__filters__title">
            {t("COMMON.LEVEL_OF_EVENT")}
          </Typography>
          <Flex className="filter-search-panel__filters__columns" gap={16}>
            <Flex vertical>
              <Checkbox
                indeterminate={isSomeFiltersSelected}
                onChange={handleCheckAllChange}
                checked={isAllFiltersSelected}
                className="filter-search-panel__filters__checkbox-all"
              >
                {t("COMMON.ALL")}
              </Checkbox>
              <Checkbox.Group
                className="filter-search-panel__filters__checkbox-group"
                options={getEventsFilters(eventFilterOptions.slice(0, 2))}
                value={filters}
                onChange={(selectedFilters) =>
                  handleFilterChange(
                    selectedFilters,
                    eventFilterOptions.slice(0, 2).map((f) => f.value)
                  )
                }
              />
            </Flex>
            <Flex vertical>
              <Checkbox.Group
                className="filter-search-panel__filters__checkbox-group"
                options={getEventsFilters(eventFilterOptions.slice(2))}
                value={filters}
                onChange={(selectedFilters) =>
                  handleFilterChange(
                    selectedFilters,
                    eventFilterOptions.slice(2).map((f) => f.value)
                  )
                }
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex className="filter-search-panel__buttons" gap="small" wrap>
          <Button size="large" type="primary" onClick={handleSubmit}>
            {t("COMMON.APPLY")}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
