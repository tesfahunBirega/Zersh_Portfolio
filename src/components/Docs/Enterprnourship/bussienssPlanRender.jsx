import React from 'react';
import { Table, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const BusinessProposal = ({ proposal }) => {
  const { generalTitle, generalDescription, businessIdea, businessEnvironment, marketCompetition, marketingPlan, capitalItems, workingCapitalItems, salesPlan, costPlan, businessProfile } = proposal;

  // Define columns for capital items table
  const capitalColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Goods', dataIndex: 'goods', key: 'goods' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
  ];

  // Define columns for working capital items table
  const workingCapitalColumns = [
    { title: 'Month', dataIndex: 'month', key: 'month' },
    { title: 'Staff Costs', dataIndex: 'staffCosts', key: 'staffCosts' },
    { title: 'Operating Expenses', dataIndex: 'operatingExpenses', key: 'operatingExpenses' },
  ];

  // Define columns for sales plan table
  const salesPlanColumns = [
    { title: 'Product Name', dataIndex: 'productName', key: 'productName' },
    { title: 'Price', dataIndex: ['values', 'price', 'data'], key: 'price', render: price => <Text>{price}</Text> },
    { title: 'Quantity', dataIndex: ['values', 'quantity', 'data'], key: 'quantity', render: quantity => <Text>{quantity}</Text> },
    { title: 'Income', dataIndex: ['values', 'income', 'data'], key: 'income', render: income => <Text>{income}</Text> },
  ];

  // Define columns for cost plan table
  const costPlanColumns = [
    { title: 'Product Name', dataIndex: 'productName', key: 'productName' },
    { 
        title: 'Price', dataIndex: ['values', 'price', 'data'], key: 'price',
        render: price => <Text>{price}</Text> },
    { title: 'Quantity', dataIndex: ['values', 'quantity', 'data'], key: 'quantity', render: quantity => <Text>{quantity}</Text> },
    { title: 'Material Cost', dataIndex: ['values', 'material', 'data'], key: 'material', render: material => <Text>{material}</Text> },
    { title: 'Labour Cost', dataIndex: ['values', 'labour', 'data'], key: 'labour', render: labour => <Text>{labour}</Text> },
    { title: 'Operational Costs', dataIndex: ['values', 'operational', 'data'], key: 'operational', render: operational => <Text>{operational}</Text> },
    { title: 'Others', dataIndex: ['values', 'others', 'data'], key: 'others', render: others => <Text>{others}</Text> },
    { title: 'Capital Expenditure', dataIndex: ['values', 'capitalExpenditure', 'data'], key: 'capitalExpenditure', render: capitalExpenditure => <Text>{capitalExpenditure}</Text> },
  ];

  return (
    <Card className='my-4'>
      <Title level={4}>{generalTitle}</Title>
      <Text>{generalDescription}</Text>
      <Title level={4}>Business Idea</Title>
      <Text>{businessIdea}</Text>
      <Title level={4}>Business Environment</Title>
      <Text>{businessEnvironment}</Text>
      <Title level={4}>Market Competition</Title>
      <Text>{marketCompetition}</Text>
      <Title level={4}>Marketing Plan</Title>
      <Text>{marketingPlan}</Text>

      {/* Render capital items table */}
      <Title level={4}>Capital Items</Title>
      <Table dataSource={capitalItems} columns={capitalColumns} pagination={false} />

      {/* Render working capital items table */}
      <Title level={4}>Working Capital Items</Title>
      <Table dataSource={workingCapitalItems} columns={workingCapitalColumns} pagination={false} />

      {/* Render sales plan table */}
      <Title level={4}>Sales Plan</Title>
      <Table dataSource={salesPlan} columns={salesPlanColumns} pagination={false} />

      {/* Render cost plan table */}
      <Title level={4}>Cost Plan</Title>
      <Table dataSource={costPlan} columns={costPlanColumns} pagination={false} />

      {/* Render business profile information */}
      <Title level={4}>Business Profile</Title>
      <Text>Trade Name: {businessProfile?.tradeName}</Text>
      <Text>Business Owner Name: {businessProfile?.businessOwnerName}</Text>
      <Text>Business Address: {businessProfile?.businessAddress}</Text>
      <Text>Phone Number: {businessProfile?.phoneNumber}</Text>
      <Text>Email: {businessProfile?.email}</Text>
    </Card>
  );
};

export default BusinessProposal;
