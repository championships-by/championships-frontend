import { Typography, Input, Flex } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import TextArea from 'antd/es/input/TextArea'
import './sass/events.scss'

function EventDescription({ name }) {
  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите описание мероприятия',
        },
        {
          max: 500,
          message: 'Максимальное значение 500',
        },
        {
          min: 5,
          message: 'Минимальное значение 5',
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>Описание мероприятия</Typography.Text>
        <TextArea
          rows={6}
          allowClear
          placeholder="Введите описание мероприятия"
          id="event_description_input"
          maxLength={255}
          className="events__event-description__textarea"
        />
      </Flex>
    </FormItem>
  )
}
export default EventDescription
