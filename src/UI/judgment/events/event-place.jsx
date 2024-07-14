import { Typography, Input, Flex } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import './sass/events.scss'

function EventPlace({ name }) {
  return (
    <FormItem
      name={name}
      hasFeedback
      validateFirst
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите место проведения мероприятия',
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
        <Typography.Text>Место проведения мероприятия</Typography.Text>
        <Input
          allowClear
          placeholder="Введите место проведения мероприятия"
          id="event_place_input"
          maxLength={255}
          className="events__event-place__input"
        />
      </Flex>
    </FormItem>
  )
}
export default EventPlace
