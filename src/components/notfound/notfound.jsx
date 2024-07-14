import { Button, Result } from 'antd'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '@components/enums'

function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, страница, которую вы посетили, не существует."
      extra={
        <NavLink to={ROUTES.USER_SETTINGS.PATH}>
          <Button type="primary">Вернуться на главную</Button>
        </NavLink>
      }
    />
  )
}

export default NotFound
