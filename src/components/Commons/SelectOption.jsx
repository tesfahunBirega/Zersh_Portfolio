import React from "react";
import { Select } from "antd";

const { Option } = Select;

const CustomSelect = ({ options, placeholder, value, onChange, style }) => {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={style}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
