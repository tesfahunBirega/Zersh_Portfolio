import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const CategoryTabs = ({ categories, onSelectCategory }) => {
  const handleTabClick = (category) => {
    onSelectCategory(category);
  };

  return (
    <Tabs defaultActiveKey="All" onTabClick={handleTabClick}>
      {categories.map((category) => (
        <TabPane tab={category} key={category} />
      ))}
    </Tabs>
  );
};

export default CategoryTabs;
