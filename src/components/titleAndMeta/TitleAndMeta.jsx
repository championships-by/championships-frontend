import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { findRouteTitle } from "@/utils";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

function TitleAndMeta() {
  const { t } = useTranslation();
  const route = useLocation();
  const [title, setTitle] = useState("");

  useLayoutEffect(() => {
    const updateTitle = async () => {
      const titleKey = await findRouteTitle(route.pathname);

      if (titleKey) {
        setTitle(t(titleKey));
      }
    };

    updateTitle();
  }, [route]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
    </Helmet>
  );
}

export default TitleAndMeta;
