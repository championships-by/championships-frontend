import { defaultEventFilterOptions, eventFilterOptions } from "@constants";
import { setEventFilters, setEventSearchValue } from "@store/events/slice";
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

  const handleSubmit = () => {
    dispatch(setEventSearchValue(search));
    dispatch(
      setEventFilters(filters.length <= 0 ? defaultEventFilterOptions : filters)
    );
    onSubmit?.(search, filters);
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
          <Flex vertical gap={8}>
            <Checkbox
              indeterminate={isSomeFiltersSelected}
              onChange={handleCheckAllChange}
              checked={isAllFiltersSelected}
            >
              {t("COMMON.ALL")}
            </Checkbox>
            <Checkbox.Group
              className="filter-search-panel__filters__checkbox-group"
              options={eventFilterOptions}
              defaultValue={defaultEventFilterOptions}
              value={filters}
              onChange={setFilters}
            />
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
