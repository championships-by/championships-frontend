/* eslint-disable prettier/prettier */
import { Table, Tooltip, Flex } from 'antd'

function TableTimeMatches(){
    const columns = [
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
            title: <Tooltip title="Попытка №1">Попытка №1</Tooltip>,
            dataIndex: 'first_attempt',
            key: 'first_attempt'
        },
        {
            title: <Tooltip title="Попытка №2">Попытка №2</Tooltip>,
            dataIndex: 'second_attempt',
            key: 'second_attempt'
        },
        {
            title: <Tooltip title="Попытка №3">Попытка №3</Tooltip>,
            dataIndex: 'third_attempt',
            key: 'third_attempt'
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
            first_attempt: '2:34:12',
            second_attempt: '2:45:34',
            third_attempt: '2:47:35',
            best_attempt: '2:49:35'
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

export default TableTimeMatches