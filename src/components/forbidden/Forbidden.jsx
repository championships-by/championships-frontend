import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@constants";
import { useTranslation } from "react-i18next";

function Forbidden() {
  const { t } = useTranslation();
  return (
    <Result
      status="403"
      title={t("ERROR_PAGES.TITLE")}
      subTitle={
        <>
          {t("ERROR_PAGES.YOU_DONT_HAVE_ACCESS")}
          <br />
          {t("ERROR_PAGES.ERROR_CODE")}: 403
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
export default Forbidden;
