import React from 'react';
import { Input, InputNumber, Select } from 'antd';

const { Option } = Select;

const CustomInput = ({ type, value, onChange, options, ...rest }) => {
  const handleChange = (newValue) => {
    onChange(newValue);
  };

  switch (type) {
    case 'text':
      return <Input className='w-full' value={value} onChange={handleChange} {...rest} />;
    case 'textarea':
      return <Input.TextArea  className='w-full' value={value} onChange={handleChange} {...rest} />;
    case 'number':
      return <InputNumber  className='w-full' value={value} onChange={handleChange} {...rest} />;
    case 'select':
      return (
        <Select   className='w-full' value={value} onChange={handleChange} {...rest}>
          {options.map((opt) => (
            <Option key={opt.value} value={opt.value}>
              {opt.label}
            </Option>
          ))}
        </Select>
      );
    default:
      return null;
  }
};

export default CustomInput;
