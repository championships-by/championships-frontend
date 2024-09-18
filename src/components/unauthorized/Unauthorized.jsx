import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@constants";

function Unauthorized() {
  return (
    <Result
      status="403"
      title="Ой!"
      subTitle={
        <>
          Извините, для входа на эту страницу надо авторизоваться
          <br />
          Код ошибки: 401
        </>
      }
      extra={
        <NavLink to={ROUTES.AUTHORIZATION.PATH}>
          <Button type="primary">Авторизация</Button>
        </NavLink>
      }
    />
  );
}
export default Unauthorized;
