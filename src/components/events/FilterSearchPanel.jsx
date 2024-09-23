import { Button, Card, Checkbox, Flex, Input, Typography } from "antd";
import { useState } from "react";
import { defaultEventFilterOptions, eventFilterOptions } from "../../constants";

export const FilterSearchPanel = ({ onSubmit }) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(defaultEventFilterOptions);

  return (
    <Card
      style={{
        backgroundColor: "#7EA7F9",
        border: 0,
      }}
    >
      <Flex vertical gap={16}>
        <Input
          placeholder="Поиск мероприятия"
          size="large"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Typography
          style={{
            fontWeight: 500,
            fontSize: 16,
            lineHeight: "26px",
          }}
        >
          Уровень мероприятия
        </Typography>
        <Checkbox.Group
          style={{ flexDirection: "column", gap: "8px" }}
          options={eventFilterOptions}
          defaultValue={defaultEventFilterOptions}
          value={filters}
          onChange={(selectedFilters) => setFilters(selectedFilters)}
        />
        <Flex gap="small" wrap>
          <Button size="large" style={{ width: "50%" }}>
            Очистить
          </Button>
          <Button
            size="large"
            type="primary"
            style={{ width: "50%" }}
            onClick={() => onSubmit?.(search, filters)}
          >
            Применить
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
