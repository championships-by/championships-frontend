import { useState, useEffect, useRef } from "react";
import { Typography, Space, Flex, Input } from "antd";
import Select from "@modules/customSelect/CustomSelect";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { userApi } from "@api";
import { competenciesApi } from "@api";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";

import "./sass/events.scss";

function getFullName(item) {
  return item.second_name + " " + item.first_name + " " + item.third_name;
}

function CompetitionType({ onJudgeChange, judges }) {
  const { t } = useTranslation();
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedJudges, setSelectedJudges] = useState([]);
  const [selectHeight, setSelectHeight] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const selectRef = useRef(null);

  useEffect(() => {
    if (judges) {
      const judgeOptions = judges.map((item) => ({
        value: item.id,
        label: getFullName(item),
      }));

      setOptions(judgeOptions);
      setSelectedJudges(judgeOptions);
    }
  }, [judges]);

  useEffect(() => {
    if (selectRef.current) {
      const height = selectRef.current.offsetHeight;
      setSelectHeight(height);
    }
  }, [options, selectedJudges]);

  const handleSearch = debounce((value) => {
    setSearchInput(value);

    const params = { name: value };

    if (value) {
      userApi.searchForJudges(params).then((data) => {
        const judgeOptions = data.map((item) => ({
          value: item.id,
          label: getFullName(item),
        }));
        setOptions(judgeOptions);

        if (judges && judges.length) {
          const selectedJudgesData = judgeOptions.filter((option) =>
            judges.includes(option.value)
          );

          setSelectedJudges([...selectedJudges, ...selectedJudgesData]);
        }
      });

      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  }, 300);

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
        {t("EVENTS.JUDGES_STRUCTURE")}
      </Typography.Text>
      <div className="events__competition-judge__div">
        <Flex>
          <Space.Compact className="events__competition-judge__container">
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
              placeholder={t("COMMON.START_TYPING")}
              maxTagCount={10}
              options={searchInput ? filteredOptions : []}
              onChange={handleChange}
              onSearch={handleSearch}
              value={selectedJudges}
              onDropdownVisibleChange={handleDropdownVisibleChange}
              notFoundContent={t("COMMON.COULD_NOT_FOUND")}
              filterOption={false}
            />
          </Space.Compact>
        </Flex>
      </div>
    </>
  );
}

export default CompetitionType;
