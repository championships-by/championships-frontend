import React from "react";
import { Select as AntdSelect } from "antd";
import { useTranslation } from "react-i18next";

const Select = (props) => {
  const { t } = useTranslation();

  return (
    <AntdSelect
      {...props}
      notFoundContent={props.notFoundContent || t("COMMON.NO_DATA")}
    />
  );
};

CustomSelect.Option = AntdSelect.Option;
CustomSelect.OptGroup = AntdSelect.OptGroup;

export default Select;
