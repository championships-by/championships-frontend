/* eslint-disable prettier/prettier */
import { Flex, Tooltip, Table } from "antd"

let columns = [
    {
        title: <Tooltip title="Компетенции"></Tooltip>,
        dataIndex: 'competencies',
        key: 'competencies'
    },
    {
        title: <Tooltip title="Первый участник">Иванов</Tooltip>,
        dataIndex: 'first_participant',
        key: 'first_participant'
    },
    {
        title: <Tooltip title="Второй участник">Петров</Tooltip>,
        dataIndex: 'second_participant',
        key: 'second_participant'
    },
    {
        title: <Tooltip title="Третий участник">Сидоров</Tooltip>,
        dataIndex: 'third_participant',
        key: 'third_participant'
    }
    
]

let data = [
    {
        competencies: 'Компетенция №1',
        first_participant: '5/10',
        second_participant: '6/10',
        third_participant: '7/10',
    },
    {
        competencies: 'Компетенция №2',
        first_participant: '7/10',
        second_participant: '8/10',
        third_participant: '3/10',
    },
    {
        competencies: 'Компетенция №3',
        first_participant: '4/10',
        second_participant: '2/10',
        third_participant: '9/10',
    },
    {
        competencies: 'Сумма баллов',
        first_participant: '12',
        second_participant: '13',
        third_participant: '15',
    }
]
function CompetenciesTable(){
    return (
        <Flex vertical gap="large">
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </Flex>
    )
}

export default CompetenciesTable