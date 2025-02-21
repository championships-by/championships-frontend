import React from "react";
import { Typography, Flex } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@constants";

function ReturnButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { eventId } = useParams();

  const onClick = () => {
    navigate(ROUTES.EVENTS_DESCRIPTION.PATH(eventId));
  };

  return (
    <Typography.Link onClick={onClick}>
      <Flex gap="small" align="center">
        <LeftOutlined />
        {t("COMMON.RETURN")}
      </Flex>
    </Typography.Link>
  );
}

export default ReturnButton;
