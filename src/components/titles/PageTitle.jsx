import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { findRouteTitle } from "@utils";
import { useTranslation } from "react-i18next";

const PageTitle = () => {
  const { t } = useTranslation();
  const route = useLocation();

  useLayoutEffect(() => {
    const titleKey = findRouteTitle(route.pathname);
    if (titleKey) {
      document.title = t(titleKey);
    }
  }, [route]);
};

export default PageTitle;
