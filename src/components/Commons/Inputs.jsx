import React from "react";
import { Input } from "antd";

const { Search } = Input;
function Inputs({ placeholder, onSearch, style, ...rest }) {
  return (
    <Search
      placeholder={placeholder}
      onSearch={onSearch}
      style={style}
      {...rest}
    />
  );
}

export default Inputs;
