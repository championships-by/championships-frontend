import { useState, useEffect, useRef } from "react";
import { Typography, Select, Space, Flex, Input } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { userApi } from "@api";
import { competenciesApi } from "@api";
import "./sass/events.scss";

function getFullName(item) {
  return item.first_name + " " + item.third_name + " " + item.second_name;
}

function CompetitionType({ onJudgeChange }) {
  const [options, setOptions] = useState([]);
  const { limit } = useParams();
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedJudges, setSelectedJudges] = useState([]);
  const [selectHeight, setSelectHeight] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const selectRef = useRef(null);
  const { eventID } = useParams();

  useEffect(() => {
    competenciesApi.getCompetenciesEventData(eventID).then((response) => {});
  }, [eventID]);

  useEffect(() => {
    userApi
      .getJudges({ limit: 49 })
      .then((response) => {
        const judgeOptions = response.data.map((item) => ({
          value: item.id,
          label: getFullName(item),
        }));
        setOptions(judgeOptions);
      })
      .catch(() => {
        console.error(
          "Ошибка: Невозможно получить данные. Обратитесь к администратору..."
        );
      });
  }, [limit]);

  useEffect(() => {
    if (selectRef.current) {
      const height = selectRef.current.offsetHeight;
      setSelectHeight(height);
    }
  }, [options, selectedJudges]);

  const handleSearch = (value) => {
    setSearchInput(value);
    if (value) {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleDropdownVisibleChange = (open) => {
    if (!open) {
      setFilteredOptions([]);
      setSearchInput("");
    }
  };

  const handleChange = (value) => {
    setSelectedJudges(value);
    onJudgeChange(value);
  };

  return (
    <>
      <Typography.Text className="events__competition-judge__text">
        Судейский состав
      </Typography.Text>
      <div className="events__competition-judge__div">
        <Flex>
          <Space.Compact>
            <Input
              prefix={<UsergroupAddOutlined />}
              className="events__competition-judge__input"
              style={{ height: selectHeight }}
              disabled
            />
            <Select
              ref={selectRef}
              className="events__competition-judge__select"
              mode="multiple"
              placeholder="Начните вводить"
              maxTagCount={10}
              options={searchInput ? filteredOptions : []}
              onChange={handleChange}
              onSearch={handleSearch}
              value={selectedJudges}
              onDropdownVisibleChange={handleDropdownVisibleChange}
              notFoundContent={"Не удалось найти"}
              filterOption={false}
            />
          </Space.Compact>
        </Flex>
      </div>
    </>
  );
}

export default CompetitionType;
