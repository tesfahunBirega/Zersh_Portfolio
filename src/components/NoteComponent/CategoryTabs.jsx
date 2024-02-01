import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const CategoryTabs = ({ categories, onSelectCategory }) => {
  return (
    <Tabs defaultActiveKey="all" onChange={onSelectCategory}>
      <TabPane tab="All" key="all"></TabPane>
      {categories.map((category) => (
        <TabPane tab={category} key={category}></TabPane>
      ))}
    </Tabs>
  );
};

export default CategoryTabs;
