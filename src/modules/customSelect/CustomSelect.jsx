import React from "react";
import { Select as AntdSelect } from "antd";
import { useTranslation } from "react-i18next";

const CustomSelect = (props) => {
  const { t } = useTranslation();
  const defaultText = t("COMMON.NO_DATA");

  return (
    <AntdSelect
      {...props}
      notFoundContent={props.notFoundContent || defaultText}
    />
  );
};

CustomSelect.Option = AntdSelect.Option;
CustomSelect.OptGroup = AntdSelect.OptGroup;

export default CustomSelect;
