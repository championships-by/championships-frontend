import { Card, Checkbox, Input, Typography } from "antd";

const { Search } = Input;

const options = [
  {
    label: "Республиканский",
    value: "republic",
  },
  {
    label: "Областной",
    value: "region",
  },
  {
    label: "Районный",
    value: "district",
  },
  {
    label: "Городской",
    value: "town",
  },
  {
    label: "Другое",
    value: "other",
  },
];

export const FilterSearchPanel = ({ onSearch, onFilter }) => {
  return (
    <Card
      style={{
        backgroundColor: "#7EA7F9",
        border: 0,
      }}
    >
      <Search
        placeholder="Поиск мероприятия"
        size="large"
        onChange={(e) => onSearch?.(e.target.value)}
        enterButton
      />
      <Typography
        style={{
          fontWeight: 500,
          fontSize: 16,
          lineHeight: "26px",
          margin: "30px 0 15px 0",
        }}
      >
        Уровень мероприятия
      </Typography>
      <Checkbox.Group
        defaultValue={["other"]}
        style={{ flexDirection: "column", gap: "8px" }}
        options={options}
        onChange={(values) => onFilter?.(values)}
      />
    </Card>
  );
};
