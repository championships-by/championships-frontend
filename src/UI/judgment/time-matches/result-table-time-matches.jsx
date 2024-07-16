/* eslint-disable prettier/prettier */
import { Table, Tooltip, Flex } from 'antd'

function ResultTableTimeMatches(){
    const columns = [
        {
            title: <Tooltip title="Место"></Tooltip>,
            dataIndex: 'medal',
            key: 'medal'
        },
        {
            title: <Tooltip title="Место">Место</Tooltip>,
            dataIndex: 'place',
            key: 'place'
        },
        {
            title: <Tooltip title="Участник">Участники</Tooltip>,
            dataIndex: 'participants',
            key: 'participants'
        },
        {
            title: <Tooltip title="Лучшее время">Лучшее время</Tooltip>,
            dataIndex: 'best_attempt',
            key: 'best_attempt'
        },
        
    ]

    const data = [
        {
            place: '1',
            participants: 'Иванов Иван Иванович',
            best_attempt: '2:49:35'
        },
        {
            place: '2',
            participants: 'Егоров Егор Егорович',
            best_attempt: '2:41:30'
        },
        {
            place: '3',
            participants: 'Кириллов Кирилл Кириллович',
            best_attempt: '2:40:12'
        }
    ]

    return (
        <Flex vertical gap="large">
            <Table
            pagination={false}
            columns={columns}
            dataSource={data}
            />
        </Flex>
    )
}

export default ResultTableTimeMatches