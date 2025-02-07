import React, { useEffect } from "react";
import { notification, Space, Button } from "antd";
import { useTranslation } from "react-i18next";

function CookiesNotification() {
  const [api, contextHolder] = notification.useNotification();
  const { t } = useTranslation();

  useEffect(() => {
    const btn = (
      <Space>
        <Button type="primary" size="small" onClick={() => api.destroy()}>
          {t("COMMON.OK")}
        </Button>
      </Space>
    );

    api.info({
      message: t("COMMON.ATTENTION"),
      description: t("COMMON.COOKIES_MESSAGE"),
      btn,
      placement: "bottomRight",
    });
  }, [api, t]);

  return <>{contextHolder}</>;
}

export default CookiesNotification;
