import { useState, useEffect } from "react";
import { Typography, Select, Space, Input } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { userApi } from "../../../api/user";
import { competenciesApi } from "../../../api/competencies";
import "./sass/events.scss";

function getFullName(item) {
  return `${item.first_name} ${item.second_name} ${item.third_name}`;
}

function CompetitionType() {
  const [options, setOptions] = useState([]);
  const { limit } = useParams();
  const [inputValue, setInputValue] = useState("");
  const { eventId } = useParams();
  const [dataCompetencies, setDataCompetencies] = useState([]);

  useEffect(() => {
    const fetchCompetencies = async () => {
      try {
        const response = await competenciesApi.getCompetenciesEventData(eventId);
        console.log(response); // Выводим ответ в консоль
        setDataCompetencies(response); // Сохраняем данные в состояние
      } catch (error) {
        console.error("Ошибка при получении данных о компетенциях:", error);
      }
    };

    fetchCompetencies();
  }, [eventId]);

  useEffect(() => {
    const fetchJudges = async () => {
      try {
        const response = await userApi.getJudges({ limit: 49 });
        console.log(response); // Выводим ответ в консоль
        const judgeOptions = response.data.map((item) => ({
          value: getFullName(item),
          label: getFullName(item),
        }));
        setOptions(judgeOptions);
      } catch (error) {
        console.error("Ошибка: Невозможно получить данные. Обратитесь к администратору...", error);
      }
    };

    fetchJudges();
  }, [limit]);

  const handleSearch = (value) => {
    setInputValue(value);

    if (value) {
      const filteredOptions = options.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      );
      setOptions(filteredOptions);
    } else {
      // Если поле ввода пустое, возвращаем все опции
      userApi.getJudges({ limit: 49 }).then((response) => {
        const judgeOptions = response.data.map((item) => ({
          value: getFullName(item),
          label: getFullName(item),
        }));
        setOptions(judgeOptions);
      });
    }
  };

  return (
    <>
      <Typography.Text className="events__competition-judge__text">
        Судья
      </Typography.Text>
      <div className="events__competition-judge__div">
        <Space.Compact>
          <Input
            prefix={<UsergroupAddOutlined />}
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
      </div>
    </>
  );
}

export default CompetitionType;
