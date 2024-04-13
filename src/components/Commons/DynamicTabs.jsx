import React, { Children } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const DynamicTabs = ({ children }) => {
  return (
    <Tabs  defaultActiveKey="0">
      {Children.map(children, (child, index) => (
        <TabPane style={{color:'white'}} tab={child.props.tabName} key={index.toString()}>
          {child.props.children}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default DynamicTabs;
