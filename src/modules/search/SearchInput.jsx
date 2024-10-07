import React, { useCallback } from "react";
import { Input } from "antd";
import debounce from "lodash.debounce";
const { Search } = Input;

import "./sass/search.scss";

function SearchInput({ onChange: onChangeBase }) {
  const onChange = useCallback(
    debounce((value) => {
      onChangeBase(value);
    }, 300),
    []
  );

  return (
    <Search
      className="search"
      placeholder="Найти.."
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
export default SearchInput;
