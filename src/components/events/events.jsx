import { Typography, message, Card, Calendar, Flex } from 'antd'
import { useState } from 'react'
import EventsList from '@components/events/events-list'
import Loader from '@components/loader/loader'
import { Locale } from '@src/components/enums'
import './sass/events.scss'

function Events() {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState([])

  if (isLoading) {
    fetch(`${API_PATH}/event/events_with_nominations?offset=0&limit=10`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
      redirect: 'follow',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch(() =>
        message.error('Невозможно получить данные. Обратитесь к администратору')
      )
      .finally(() => setTimeout(() => setIsLoading(false), 300))
  }

  return (
    <>
      <Loader show={isLoading} />
      <Typography.Title level={2}>Мероприятия</Typography.Title>
      <Flex vertical gap={500}>
        <Flex gap="small">
          <EventsList events={events} />
          <Card className="events__card">
            <Calendar fullscreen={false} locale={Locale} />
          </Card>
        </Flex>
      </Flex>
    </>
  )
}

export default Events
