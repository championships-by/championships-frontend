import { Button, Flex, Table, Tooltip } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { timeMatchesApi } from './api/time-matches-api'
import { CustomTimePicker } from './components'
import './sass/time-matches.scss'

function TableTimeMatches() {
  const { eventId, nominationId } = useParams()

  const columns = [
    {
      title: <Tooltip title="Место">Место</Tooltip>,
      dataIndex: 'place',
      key: 'place',
    },
    {
      title: <Tooltip title="Участник">Участники</Tooltip>,
      dataIndex: 'participants',
      key: 'participants',
    },
    {
      title: <Tooltip title="Попытка №1">Попытка №1</Tooltip>,
      dataIndex: 'first_attempt',
      key: 'first_attempt',
    },
    {
      title: <Tooltip title="Попытка №2">Попытка №2</Tooltip>,
      dataIndex: 'second_attempt',
      key: 'second_attempt',
    },
    {
      title: <Tooltip title="Попытка №3">Попытка №3</Tooltip>,
      dataIndex: 'third_attempt',
      key: 'third_attempt',
    },
    {
      title: <Tooltip title="Лучшее время">Лучшее время</Tooltip>,
      dataIndex: 'best_attempt',
      key: 'best_attempt',
    },
  ]

  const data = [
    {
      place: '1',
      participants: 'Иванов Иван Иванович',
      first_attempt: <CustomTimePicker />,
      second_attempt: <CustomTimePicker />,
      third_attempt: <CustomTimePicker />,
      best_attempt: '2:49:35',
    },
  ]

  useEffect(() => {
    timeMatchesApi
      .getTimeMatches({ eventId, nominationId })
      .then(console.log)
      .catch(console.error)
  }, [eventId, nominationId])

  return (
    <>
      <Flex vertical gap="large">
        <Table pagination={false} columns={columns} dataSource={data} />
      </Flex>
      <Button
        style={{ margin: '10px 0px 10px 0px' }}
        className="endStage"
        type="primary"
      >
        Завершить этап
      </Button>
    </>
  )
}

export default TableTimeMatches
