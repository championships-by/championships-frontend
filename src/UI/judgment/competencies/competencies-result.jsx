import GoldMedal from '@src/assets/img/gold-medal.png'
import SilverMedal from '@src/assets/img/silver-medal.png'
import BronzeMedal from '@src/assets/img/bronze-medal.png'
import { Table, Tooltip, Flex } from 'antd'

function CompetenciesResult() {
  const columns = [
    {
      title: <Tooltip></Tooltip>,
      key: 'medal',
      render: (record) => (
        <div>
          <img
            className="competencies__result__img"
            src={
              record.place === '1'
                ? GoldMedal
                : record.place === '2'
                  ? SilverMedal
                  : record.place === '3'
                    ? BronzeMedal
                    : ''
            }
          />
        </div>
      ),
    },
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
      title: <Tooltip title="Сумма баллов">Сумма баллов</Tooltip>,
      dataIndex: 'points_sum',
      key: 'points_sum',
    },
  ]

  const data = [
    {
      place: '1',
      participants: 'Иванов Иван Иванович',
      points_sum: '90',
    },
    {
      place: '2',
      participants: 'Егоров Егор Егорович',
      points_sum: '78',
    },
    {
      place: '3',
      participants: 'Кириллов Кирилл Кириллович',
      points_sum: '80',
    },
  ]

  return (
    <>
      <Flex vertical gap="large">
        <Table pagination={false} columns={columns} dataSource={data} />
      </Flex>
    </>
  )
}
export default CompetenciesResult
