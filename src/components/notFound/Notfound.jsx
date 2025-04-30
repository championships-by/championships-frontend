import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@const";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();
  return (
    <Result
      status="404"
      title={t("ERROR_PAGES.TITLE")}
      subTitle={
        <>
          {t("ERROR_PAGES.PAGE_NOT_FOUND")}
          <br />
          {t("ERROR_PAGES.ERROR_CODE")}: 404
        </>
      }
      extra={
        <NavLink to={ROUTES.EVENTS.PATH}>
          <Button type="primary">{t("EVENTS.EVENTS")}</Button>
        </NavLink>
      }
    />
  );
}

export default NotFound;
