import React from "react";
import { Empty, Typography } from "antd";
import { useTranslation } from "react-i18next";

function NoData({ customText }) {
  const { t } = useTranslation();
  const defaultText = t("COMMON.NO_DATA");

  return (
    <Empty
      description={
        <Typography.Text type="secondary">
          {customText || defaultText}
        </Typography.Text>
      }
    />
  );
}

export default NoData;

export const NO_DATA_COMPONENT = <NoData />;
