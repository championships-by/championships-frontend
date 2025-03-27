import React, { useCallback } from "react";
import { Input } from "antd";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
const { Search } = Input;

import "./sass/search.scss";

function SearchInput({ onChange: onChangeBase }) {
  const { t } = useTranslation();

  const onChange = useCallback(
    debounce((value) => {
      onChangeBase(value);
    }, 300),
    []
  );

  return (
    <Search
      className="search"
      placeholder={`${t("CHECK_CERTIFICATE.SEARCH")}...`}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
export default SearchInput;
