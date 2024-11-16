import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@constants";
import { useTranslation } from "react-i18next";

function Unauthorized() {
  const { t } = useTranslation();
  return (
    <Result
      status="403"
      title={t("ERROR_PAGES.TITLE")}
      subTitle={
        <>
          {t("ERROR_PAGES.NEED_LOGIN")}
          <br />
          {t("ERROR_PAGES.ERROR_CODE")}: 401
        </>
      }
      extra={
        <NavLink to={ROUTES.AUTHORIZATION.PATH}>
          <Button type="primary">{t("COMMON.AUTH")}</Button>
        </NavLink>
      }
    />
  );
}
export default Unauthorized;
