import { Button, Result } from 'antd'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '@src/components/enums'

const Forbidden = () => (
  <Result
    status="403"
    title="401"
    subTitle="Извините, для входа на эту страницу надо авторизоваться"
    extra={
      <NavLink to={ROUTES.AUTHORIZATION.PATH}>
        <Button type="primary">Вернуться к авторизации</Button>
      </NavLink>
    }
  />
)
export default Forbidden
