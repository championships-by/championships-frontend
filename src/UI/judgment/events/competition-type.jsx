import { useState } from 'react';
import { Typography, Space, Select } from "antd";
import GroupStageParametrs from "./competition-group-stage-parametrs";

const options = [
    {
        value: 'time', // Уникальные значения для выбора
        label: 'Соревнования по времени',
    },
    {
        value: 'criteria',
        label: 'Соревнования по критериям',
    },
    {
        value: 'groupStage',
        label: 'Групповой этап',
    },
    {
        value: 'playoffs',
        label: 'Плей-офф',
    }   
];

function CompetitionType() {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (value) => {
        setSelectedValue(value);
    };

    const settingsComponents = {
        groupStage: <GroupStageParametrs />, // Убедитесь, что этот компонент импортирован правильно
        criteria: <div>Настройки для соревнований по критериям</div>,
        time: <div>Настройки для соревнований по времени</div>,
        playoffs: <GroupStageParametrs/>,
    };

    return (
        <div>
            <Typography.Text>Тип соревнований</Typography.Text>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                    placeholder={'Выберите тип соревнования'}
                    options={options}
                    className="events__competition-type__name"
                    onChange={handleChange}
                    style={{ width: 300 }} // Установите ширину, если необходимо
                />
                {selectedValue && settingsComponents[selectedValue]}
            </Space>
        </div>
    );
}

export default CompetitionType;