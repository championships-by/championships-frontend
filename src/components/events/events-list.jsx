import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, List, Tooltip, Typography } from 'antd'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { ROUTES } from '@components/enums'

const EventsList = ({ events }) => {
  const data = events.map((event, index) => {
    const navigate = useNavigate()
    return (
      <Card
        key={index}
        size="default"
        cover={
          <img
            alt="test"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <Tooltip title={ROUTES.EVENTS_REGISTRATION.TITLE}>
            <EditOutlined
              key="edit"
              onClick={() =>
                navigate(ROUTES.EVENTS_REGISTRATION.PATH(event.id))
              }
            />
          </Tooltip>,
          <Tooltip title={ROUTES.EVENTS_DESCRIPTION.TITLE}>
            <EllipsisOutlined
              key="description"
              onClick={() => navigate(ROUTES.EVENTS_DESCRIPTION.PATH(event.id))}
            />
          </Tooltip>,
        ]}
        title={<Typography.Title level={2}>{event.name}</Typography.Title>}
        extra={
          <Typography.Text type="secondary">
            {dayjs(event.date).format('DD-MM-YYYY')}
          </Typography.Text>
        }
      >
        <List
          locale={{
            emptyText: 'Компетенции пока отсутствуют',
          }}
          size="small"
          header={<Typography.Text>Компетенции: </Typography.Text>}
          footer={
            <Typography.Text type="secondary">
              Регистрация открыта
            </Typography.Text>
          }
          dataSource={event.nominations}
          renderItem={(item) => <List.Item>{item.name}</List.Item>}
        />
      </Card>
    )
  })

  return (
    <List
      grid={{ gutter: 5, column: 3 }}
      pagination={{
        hideOnSinglePage: true,
        pageSize: 3,
        position: 'bottom',
        align: 'center',
      }}
      dataSource={data}
      renderItem={(item) => <List.Item>{item}</List.Item>}
      locale={{
        emptyText: 'Мероприятия отсутствуют',
      }}
      className="events__list"
    />
  )
}

export default EventsList
