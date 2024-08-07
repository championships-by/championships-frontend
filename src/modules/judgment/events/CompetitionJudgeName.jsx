import { useState } from "react";
import { Typography, Select, Space } from "antd";
import "./sass/events.scss";

function CompetitionType() {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (value) => {
    setInputValue(value);

    if (value) {
      const filteredOptions = [
        "Сергачев Виктор",
        "Иванов Сергей",
        "Викторов Евгений",
        "Сидоров Виктор",
        "Евтухов Кирилл",
      ]
        .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
        .map((item) => ({ value: item, label: item }));

      setOptions(filteredOptions);
    } else {
      setOptions([]);
    }
  };

  return (
    <>
      <Typography.Text className="events__competition-judge__text">
        Судья
      </Typography.Text>
       <div className="events__competition-judge__div">
      <Space>
        <Select
          className="events__competition-judge__select"
          mode="multiple"
          placeholder="Выберите судью"
          maxTagCount="responsive"
          options={options}
          onSearch={handleSearch}
        />
      </Space>
    </div>
    </>
    
  );
}

export default CompetitionType;
