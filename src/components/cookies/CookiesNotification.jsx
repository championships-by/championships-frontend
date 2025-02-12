import React, { useEffect } from "react";
import { notification, Space, Button } from "antd";
import { useTranslation } from "react-i18next";

function CookiesNotification() {
  const [api, contextHolder] = notification.useNotification();
  const { t } = useTranslation();

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");

    if (hasAcceptedCookies) return;

    const handleAccept = () => {
      localStorage.setItem("cookiesAccepted", "true");
      api.destroy();
    };

    const btn = (
      <Space>
        <Button type="primary" size="small" onClick={handleAccept}>
          {t("COMMON.OK")}
        </Button>
      </Space>
    );

    api.info({
      message: t("COMMON.ATTENTION"),
      description: t("COMMON.COOKIES_MESSAGE"),
      btn,
      placement: "bottomRight",
      closeIcon: null,
    });
  }, [api, t]);

  return contextHolder;
}

export default CookiesNotification;
