import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@constants";

function Forbidden() {
  return (
    <Result
      status="403"
      title="Ой!"
      subTitle={
        <>
          У Вас нет доступа к этой странице
          <br />
          Код ошибки: 403
        </>
      }
      extra={
        <NavLink to={ROUTES.EVENTS.PATH}>
          <Button type="primary">Мероприятия</Button>
        </NavLink>
      }
    />
  );
}
export default Forbidden;
