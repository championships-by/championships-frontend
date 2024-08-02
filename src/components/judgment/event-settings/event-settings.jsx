import {
  Button,
  Typography,
  Breadcrumb,
  Table,
  Flex,
  message,
  Form,
  Space,
} from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '@components/loader/loader'
import CompitationModal from './event-settings-modal'
import EventName from '@src/UI/judgment/events/event-name'
import EventDate from '@src/UI/judgment/events/event-date'
import EventDescription from '@src/UI/judgment/events/event-description'
import EventEmail from '@src/UI/judgment/events/event-email'
import EventPlace from '@src/UI/judgment/events/event-place'
import EventRegistrationSwitch from '@src/UI/judgment/events/event-registration-switch'
import EventRegulation from '@src/UI/judgment/events/event-regulation'
import EventLogo from '@src/UI/judgment/events/event-logo'
import './sass/event-settings.scss'

function EventSettings() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadings, setLoadings] = useState([])
  const [isAddCompitationModalOpen, setIsAddCompitationModalOpen] =
    useState(false)
  const [dataEvent, setEvent] = useState({})
  const { eventID } = useParams()
  const [form] = Form.useForm()

  useEffect(() => {
    if(eventID != undefined){
      try {
        fetch(`${API_PATH}/event/event/get_by_id?event_id=${eventID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          credentials: 'include',
        })
        .then((response) => response.json())
        .then((data) => setEvent(data))
        .then((dataEvent) => {
            form.setFieldsValue({
              event_name: dataEvent?.event_data?.name,
              event_date: dataEvent?.event_data?.date,
            })//#TODO
  
            setTimeout(() => setIsLoading(false), 300)
          })
      } catch (error) {
        message.error(
          'Ошибка: Невозможно получить данные. Обратитесь к администратору...'
        )
      }
    }else{
      setTimeout(() => setIsLoading(false), 300)
          
    }
  }, [eventID])

  const update_event_request = async () => {
    const myHeaders = new Headers()
    myHeaders.append('accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      id: eventID,
      new_name: form.getFieldValue('event_name'),
      new_date: dayjs(form.getFieldValue('event_date')).format('YYYY-MM-DD'),
    }) 
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      credentials: 'include',
    }
    await fetch(`${API_PATH}/event/event`, requestOptions)
  }

  const create_event_request = async () => {
    const myHeaders = new Headers()
    myHeaders.append('accept', 'application/json')
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      name: form.getFieldValue('event_name'),
      date: dayjs(form.getFieldValue('event_date')).format('YYYY-MM-DD'),
    }) //#TODO
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      credentials: 'include',
    }
    await fetch(`${API_PATH}/event/event`, requestOptions)
  }

  const columns = [
    {
      title: 'Название компетенции',
      dataIndex: 'name_compitation',
      key: 'name_nomination',
    },
    {
      title: 'Количество зарегестрированных участников',
      dataIndex: 'porticipants_count',
      key: 'porticipants_count',
    },
    {
      title: 'Действия',
      key: 'action',
      render: () => (
        <Flex>
          <Button type="text" icon={<EditOutlined />}></Button>
          <Button type="text" icon={<DeleteOutlined />}></Button>
        </Flex>
      ),
    },
  ]

  const onFinish = () => {
    message.success('Всё в порядке!')
  }

  const onFinishFailed = () => {
    message.error('Проверьте поля для ввода!')
  }

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[index] = false
        return newLoadings
      })
    }, 6000)
  }

  return (
    <Flex vertical gap="middle">
      <div>
        <Loader show={isLoading} />
        <Typography.Title level={2}>
          Редактирование мероприятия
        </Typography.Title>
        <Breadcrumb
          items={[
            {
              title: 'Мероприятия',
              href: './',
            },
            {
              title: 'Hастройка мероприятия',
            },
          ]}
        />
      </div>
      <Form
        form={form}
        layout="vertical"
        variant="filled"
        requiredMark="Default"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Flex vertical align="center">
          <Typography.Title level={2}>Данные мероприятия</Typography.Title>
        </Flex>
        <Flex vertical className="event-settings__form-flex">
          <EventName name="event_name" />
          <EventEmail name="event_email" />
          <EventPlace name="event_place" />
          <EventLogo name="event_logo" />
          <EventDate name="event_date" />
          <EventRegistrationSwitch name="event_registartion" />
          <EventRegulation name="event_regulation" />
          <EventDescription name="event_description" />
        </Flex>
        <Button
          type="primary"
          htmlType="submit"
          loading={loadings[0]}
          onClick={() => {
            enterLoading(0)
            if (eventID === undefined){
              create_event_request()
            }else{
            update_event_request()
            }
          }}
        >
          Сохранить данные
        </Button>
      </Form>
      <Space direction="vertical" size="middle">
        <Flex vertical align="center">
          <Typography.Title level={2}>Компетенции</Typography.Title>
        </Flex>
        <Flex vertical align="flex-end">
          <Button
            onClick={() => setIsAddCompitationModalOpen(true)}
            type="primary"
          >
            {' '}
            Добавить компетенцию{' '}
          </Button>
        </Flex>
        <Table
          columns={columns}
        />
      </Space>
      <CompitationModal
        name={'Добавить компетенцию'}
        isOpen={isAddCompitationModalOpen}
        onOk={() => setIsAddCompitationModalOpen(false)}
        onCancel={() => setIsAddCompitationModalOpen(false)}
      />
    </Flex>
  )
}

export default EventSettings
