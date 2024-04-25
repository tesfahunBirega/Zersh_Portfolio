import React from 'react';
import { Button } from 'antd';

const CustomButton = ({ children, style,tailWindClassName ,type, ...props }) => {
  const buttonStyles = {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: '8px 16px',
    ...style,
  };

  return (
    <Button type className={tailWindClassName} style={buttonStyles} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
