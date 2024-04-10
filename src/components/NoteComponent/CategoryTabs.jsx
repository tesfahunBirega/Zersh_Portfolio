import React from "react";
import { Tabs } from "antd";
import { generateRandomHexColor } from "../../utils/randomColor";

const { TabPane } = Tabs;

const CategoryTabs = ({ categories, onSelectCategory }) => {
  const handleTabClick = (category) => {
    onSelectCategory(category);
  };

  return (
    <Tabs
      className={`text-[${generateRandomHexColor()}]`}
      defaultActiveKey="All"
      onTabClick={handleTabClick}
    >
      {categories.map((category, i) => (
        <TabPane
          className={`text-[${generateRandomHexColor()}]`}
          tab={category}
          key={category}
        />
      ))}
    </Tabs>
  );
};

export default CategoryTabs;
