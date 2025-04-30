import React, { useEffect } from "react";
import { notification, Space, Button, Typography, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { splitByCookies } from "@utils";
import { cookiesPolicy } from "@const";

function CookiesNotification() {
  const [api, contextHolder] = notification.useNotification();
  const { t } = useTranslation();
  const cookiesMessageParts = splitByCookies(t("COMMON.COOKIES_MESSAGE"));

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");

    if (hasAcceptedCookies) return;

    const handleAccept = () => {
      localStorage.setItem("cookiesAccepted", "true");
      api.destroy();
    };

    const btn = (
      <Button type="primary" size="small" onClick={handleAccept}>
        {t("COMMON.AGREE")}
      </Button>
    );

    api.info({
      message: (
        <Typography.Text strong>{t("COMMON.ATTENTION")}</Typography.Text>
      ),
      description: (
        <>
          <Typography.Text>{cookiesMessageParts[0]}</Typography.Text>
          <Typography.Link target="_blank" href={cookiesPolicy}>
            {cookiesMessageParts[1]}
          </Typography.Link>
          <Typography.Text>{cookiesMessageParts[2]}</Typography.Text>
        </>
      ),
      btn,
      placement: "bottomRight",
      duration: 0,
      closeIcon: null,
    });
  }, [api, t]);

  return contextHolder;
}

export default CookiesNotification;
