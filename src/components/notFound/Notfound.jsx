import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@constants";

function NotFound() {
  return (
    <Result
      status="404"
      title="Ой!"
      subTitle="Похоже, мы не можем найти нужную Вам страницу "
      extra={
        <NavLink to={ROUTES.USER_SETTINGS.PATH}>
          <Button type="primary">Вернуться в настройки пользователя</Button>
        </NavLink>
      }
    />
  );
}

export default NotFound;
