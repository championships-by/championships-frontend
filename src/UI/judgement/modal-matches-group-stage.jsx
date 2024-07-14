/* eslint-disable prettier/prettier */
import { Modal, Button, Flex, Table, InputNumber } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { sendMatchResult } from './api/get-group-stage-queries'


function ModalGroupStage(match) {
  const [visible, setVisible] = useState(false)

  const data = [
    {
        key: '1',
        participants: match.match?.team1,
        result: 0,
    },
    {
        key: '2',
        participants: match.match?.team2,
        result: 1,
    }
  ]
  const columns = [
    {
        title: 'Участники',
        key: 'participants',
        dataIndex: 'participants',
    },
    {
        title: 'Счёт',
        key: 'result',
        dataIndex: 'result',
        render:(result) => (
            <div>
                <InputNumber 
                onChange={(e) => setScore(result, e)}
                min={0}
                defaultValue={0}
                ></InputNumber>
            </div>
        )
    }
  ]

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    sendMatchResult(team1Score,team2Score,match)
    setVisible(false)
  }
  const handleCancel = () => {
    setVisible(false)
  }

  const [team1Score, setTeam1Score] = useState()
  const [team2Score, setTeam2Score] = useState()

  const setScore = (key, score) => {
    if (key === 0)
      setTeam1Score(score)

    if (key === 1)
      setTeam2Score(score)
  }

  return (
    <>
      <Flex>
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={showModal}
        ></Button>
        <Modal
          title={'Сообщить счёт'}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={'Отправить оценки'}
          cancelButtonProps={{
            style: {
                display: 'none'
            }
          }}
        >
            <Table
                columns={columns}
                pagination={false}
                dataSource={data}
            />
        </Modal>
      </Flex>
    </>
  )
}

export default ModalGroupStage
