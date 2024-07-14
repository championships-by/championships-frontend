import { Typography, Input, Flex } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import './sass/events.scss'

function EventName({ name }) {
  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: 'Пожалуйста введите название мероприятия',
        },
        {
          max: 255,
          message: 'Максимальное значение 255',
        },
        {
          min: 5,
          message: 'Минимальное значение 5',
        },
      ]}
    >
      <Flex vertical>
        <Typography.Text>Название мероприятия</Typography.Text>
        <Input
          allowClear
          placeholder="Введите название мероприятия"
          id="event_name_input"
          maxLength={255}
          className="events__event-name__input"
        />
      </Flex>
    </FormItem>
  )
}
export default EventName
