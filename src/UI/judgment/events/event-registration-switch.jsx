import { Typography, Switch, Flex } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import './sass/events.scss'

function EventName({ name }) {
  return (
    <FormItem name={name} hasFeedback validateFirst>
      <Flex vertical>
        <Typography.Text>Регистрация открыта/закрыта</Typography.Text>
        <Switch
          className="events__event-registration-switch__switch"
        />
      </Flex>
    </FormItem>
  )
}
export default EventName
