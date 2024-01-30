import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

const TextInput = ({ placeholder, value, onChange, rows, style }) => {
  return (
    <TextArea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      style={style}
    />
  );
};

export default TextInput;
