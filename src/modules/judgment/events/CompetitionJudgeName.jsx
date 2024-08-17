import { useState, useEffect } from "react";
import { Typography, Select, Space, Flex, Input } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { useSearchParams, useParams } from "react-router-dom"
import { userApi }  from "../../../api/user";
import { competenciesApi } from "../../../api/competencies";
import "./sass/events.scss";

function getFullName(item){
    
    return item.first_name + ' ' + item.second_name + ' ' + item.third_name
}

function CompetitionType() {
  const [options, setOptions] = useState([]);
  const { limit } = useParams()
  const [inputValue, setInputValue] = useState("");
  const [dataCompetencies, setDataCompetencies] = useState([])

  const { eventID } = useParams()



  useEffect(() => {
    competenciesApi
      .getCompetenciesEventData(eventID)
        .then(response => {
          console.log(response.data)
        })
  },[eventID])

  useEffect(() => {
    userApi
      .getJudges({ limit: 49 })
        .then((response) => {
            const judgeOptions = response.data.map((item) => ({
              value: getFullName(item),
              label: getFullName(item),
            }));
            setOptions(judgeOptions)
          })
        .catch(() => {
          console.error("Ошибка: Невозможно получить данные. Обратитесь к администратору...")
        })
  },[limit])
 
  const handleSearch = (value) => {
    setInputValue(value);

    if (value) {
      const filteredOptions = options.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      );
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
        <Flex>
          <Space.Compact>
            <Input
              prefix={<UsergroupAddOutlined/>}
              className="events__competition-judge__input"
              disabled
            />
            <Select
              className="events__competition-judge__select"
              mode="multiple"
              placeholder="Выберите судью"
              maxTagCount="responsive"
              options={options}
              onSearch={handleSearch}
              notFoundContent={"Не удалось найти"}
            />
          </Space.Compact>
        </Flex>
      
    </div>
    </>
  );
}

export default CompetitionType;
