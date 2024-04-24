import React, { useState } from 'react';
import { Button, Input, Modal, Table, Typography, Divider, Col, Row } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';


function AddBussinessPlan({
    visible,
    handleOk,
    handleCancel,
    inputValues,
    handleChange,
    handleCapitalItemsChange,
    calculateTotalSum,
    handleAddCapitalItem,
    handleWorkingCapitalChange,
    calculateTotalSumWorkingCapital,
    handleAddWorkingCapitalItem,
    handleSalesPlanChange,
    calculateTotalByMonth,
    handleAddSalesPlanItem,
    handleCostPlanChange,
    monthColumns,
    monthCostPlanColumns,
    calculateTotalSpendingCostByMonth,
    calculateTotalSpendingCostProdcutQuantityByMonth,
    handleAddCostPlanItem,
    width="60%"

}) {
  const { Title } = Typography;

  return (
    <Modal
    title="Add Bussiness Plan"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={width}
    >
          <div className="container mx-auto">
      <Title level={2} style={{ color: 'white' }}>Business Plan Maker</Title>
      <div className="flex justify-between items-center">
        <div className="grid">
          <h2 className="text-2xl font-bold my-4">1. General Title</h2>
          <Input
            value={inputValues.generalTitle}
            onChange={e => handleChange('generalTitle', e.target.value)}
            placeholder="Enter your General title here..." 
          />
        </div>
        <p>{new Date().toDateString()}</p>
      </div>

      <Divider />
      <Title style={{ color: 'white' }} level={3}>2 General Description</Title>
      <Input.TextArea 
        rows={4} 
        value={inputValues.generalDescription} 
        onChange={e => handleChange('generalDescription', e.target.value)} 
        placeholder="Enter your general description here..." 
      />

      <Divider />
      <Title style={{ color: 'white' }} level={3}>Business Profile</Title>
      <div className="grid col-span-3  items-center gap-3">
        <Input 
          value={inputValues.businessProfile.tradeName} 
          onChange={e => handleChange('businessProfile.tradeName', e.target.value)} 
          placeholder="Trade Name" 
          className='col-span-1 col-start-1'
        />
        <Input 
          value={inputValues.businessProfile.businessOwnerName} 
          onChange={e => handleChange('businessProfile.businessOwnerName', e.target.value)} 
          placeholder="Business Owner's Name" 
          className='col-span col-start-2'
        />
        <Input 
          value={inputValues.businessProfile.businessAddress} 
          onChange={e => handleChange('businessProfile.businessAddress', e.target.value)} 
          placeholder="Business Address" 
          className='col-span'
        />
        <Input 
          value={inputValues.businessProfile.phoneNumber} 
          onChange={e => handleChange('businessProfile.phoneNumber', e.target.value)} 
          placeholder="Phone Number" 
          type='number'
          className='col-span'
        />
        <Input 
          value={inputValues.businessProfile.email} 
          onChange={e => handleChange('businessProfile.email', e.target.value)} 
          placeholder="Email" 
          className='col-span'
        />
      </div>

      <Divider />
      <Title  style={{ color: 'white' }} level={3}>Business Idea and Market</Title>
      <Input.TextArea 
        rows={4} 
        value={inputValues.businessIdea} 
        onChange={e => handleChange('businessIdea', e.target.value)} 
        placeholder="Enter your business idea and market description here..." 
      />

      <Divider />
      <Title  style={{ color: 'white' }}  level={3}>Business Environment</Title>
      <Input.TextArea 
        rows={4} 
        value={inputValues.businessEnvironment} 
        onChange={e => handleChange('businessEnvironment', e.target.value)} 
        placeholder="Describe how environmental impacts can affect your business..." 
      />

      <h2 className="text-2xl font-bold my-4">6. Market competition</h2>
      <Input.TextArea
        rows={4}
        value={inputValues.marketCompetition}
        onChange={e => handleChange('marketCompetition', e.target.value)}
        placeholder="Describe the market competition..." 

      />

      <h2 className="text-2xl font-bold my-4">7. Marketing plan</h2>
      <Input.TextArea
        rows={4}
        value={inputValues.marketingPlan}
        onChange={e => handleChange('marketingPlan', e.target.value)}
        placeholder="Describe the marketing plan..." 

      />

<div>
  <h2 className="text-2xl font-bold my-4">8. Starting capital</h2>
  <Table
    dataSource={inputValues.capitalItems}
    columns={[
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) => (
          <Input
            value={record.name}
            onChange={e => handleCapitalItemsChange(`capitalItems.${record?.key}.name`, e.target.value)}
          />
        ),
      },
      {
        title: 'Estimate Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (_, record) => (
          <Input
            value={record.amount}
            type='number'
            onChange={e => handleCapitalItemsChange(`capitalItems.${record.key}.amount`, e.target.value)}
          />
        ),
      },
      {
        title: 'List of Goods',
        dataIndex: 'goods',
        key: 'goods',
        render: (_, record) => (
          <Input.TextArea
            value={record.goods}
            onChange={e => handleCapitalItemsChange(`capitalItems.${record.key}.goods`, e.target.value)}
          />
        ),
      },
      {
        title: 'Price in Birr',
        dataIndex: 'price',
        key: 'price',
        render: (_, record) => (
          <Input
            value={record.price}
            type='number'
            onChange={e => handleCapitalItemsChange(`capitalItems.${record.key}.price`, e.target.value)}
          />
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record, index) => (
          <Button danger onClick={() => handleRemoveCapitalItem(index)} icon={<DeleteOutlined />} />
        ),
      },
    ]}
    summary={() => (
      <Table.Summary.Row>
        <Table.Summary.Cell>Total:</Table.Summary.Cell>
        <Table.Summary.Cell>{calculateTotalSum().totalAmount.toLocaleString()}</Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
        <Table.Summary.Cell>{calculateTotalSum().totalPrice.toLocaleString()}</Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
      </Table.Summary.Row>
    )}
    footer={() => {
      return (
        <Button 
        onClick={handleAddCapitalItem}
        style={{
          backgroundColor: '#1976d2',
          color: 'white',
          borderColor: '#2196f3',
          transition: 'background-color 0.3s',
          '&:hover': {
            backgroundColor: '#1976d2', 
          },
        }}
      >
        Add Item
      </Button>
      );
    }}
  />
</div>


<div>
  <h2 className="text-2xl font-bold my-4">9. Working Capital</h2>
  <Table
    dataSource={inputValues.workingCapitalItems}
    columns={[
      {
        title: 'Month',
        dataIndex: 'month',
        key: 'month',
        render: (_, record) => (
          <Input
            value={record.month}
            onChange={e => handleWorkingCapitalChange(`workingCapitalItems.${record.key}.month`, e.target.value)}
          />
        ),
      },
      {
        title: 'Staff Costs',
        dataIndex: 'staffCosts',
        key: 'staffCosts',
        render: (_, record) => (
          <Input
            value={record.staffCosts}
            type='number'
            onChange={e => handleWorkingCapitalChange(`workingCapitalItems.${record.key}.staffCosts`, e.target.value)}
          />
        ),
      },
      {
        title: 'Operating Expenses',
        dataIndex: 'operatingExpenses',
        key: 'operatingExpenses',
        render: (_, record) => (
          <Input
            value={record.operatingExpenses}
            type='number'
            onChange={e => handleWorkingCapitalChange(`workingCapitalItems.${record.key}.operatingExpenses`, e.target.value)}
          />
        ),
      },
    ]}
    summary={() => (
      <Table.Summary.Row>
        <Table.Summary.Cell>Total:</Table.Summary.Cell>
        <Table.Summary.Cell>{calculateTotalSumWorkingCapital().staffCosts.toLocaleString()}</Table.Summary.Cell>
        <Table.Summary.Cell>{calculateTotalSumWorkingCapital().operatingExpenses.toLocaleString()}</Table.Summary.Cell>
        <Table.Summary.Cell></Table.Summary.Cell>
      </Table.Summary.Row>
    )}
    footer={() => (
      <Button 
        onClick={handleAddWorkingCapitalItem}
        style={{
          backgroundColor: '#1976d2',
          color: 'white',
          borderColor: '#2196f3',
          transition: 'background-color 0.3s',
        }}
      >
        Add Item
      </Button>
    )}
  />
</div>

<Divider />
      <Typography.Title level={3} style={{ color: 'white' }}>Sales Planning</Typography.Title>
     
      <Table
        dataSource={inputValues.salesPlan}
        columns={[
          {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            render: (_, record, index) => (
              <Input.TextArea
              className='w-32 h-full'
                value={record.productName}
                onChange={(e) => handleSalesPlanChange('productName', e.target.value, index)}
                placeholder="Enter Product Name"
              />
            ),
          },
          ...monthColumns,
        ]}
        pagination={false}
        bordered
        summary={() => (
          <>
        <Table.Summary.Row>
  <Table.Summary.Cell>All Products:</Table.Summary.Cell>
  <Table.Summary.Cell>Total Price:</Table.Summary.Cell>
  {Array.from({ length: 12 }, (_, index) => (
    <Table.Summary.Cell key={`price_${index}`}>{calculateTotalByMonth('price', index).toLocaleString()}</Table.Summary.Cell>
  ))}
</Table.Summary.Row>
<Table.Summary.Row>
  <Table.Summary.Cell>All Products:</Table.Summary.Cell>
  <Table.Summary.Cell>Total Quantity:</Table.Summary.Cell>
  {Array.from({ length: 12 }, (_, index) => (
    <Table.Summary.Cell key={`quantity_${index}`}>{calculateTotalByMonth('quantity', index).toLocaleString()}</Table.Summary.Cell>
  ))}
</Table.Summary.Row>
<Table.Summary.Row>
  <Table.Summary.Cell>All Products:</Table.Summary.Cell>
  <Table.Summary.Cell>Total Income:</Table.Summary.Cell>
  {Array.from({ length: 12 }, (_, index) => (
    <Table.Summary.Cell key={`income_${index}`}>{calculateTotalByMonth('income', index).toLocaleString()}</Table.Summary.Cell>
  ))}
</Table.Summary.Row>
          </>
         
        )}
        footer={() => (
          <Button 
            onClick={handleAddSalesPlanItem}
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              borderColor: '#2196f3',
              transition: 'background-color 0.3s',
            }}
          >
            Add Prodcut
          </Button>
        )}
      />



<Divider />
      <Typography.Title level={3} style={{ color: 'white' }}>Cost Plan</Typography.Title>
      <Typography.Title level={5} style={{ color: 'white' }}>Monthly spending plan</Typography.Title>
     
      <Table
        dataSource={inputValues.costPlan}
        columns={[
          {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            render: (_, record, index) => (
              <Input.TextArea
              className='w-32 h-full'
                value={record.productName}
                onChange={(e) => handleCostPlanChange('productName', e.target.value, index)}
                placeholder="Enter Product Name"
              />
            ),
          },
          ...monthCostPlanColumns,
        ]}
        pagination={false}
        bordered
        summary={() => (
          <>
        <Table.Summary.Row>
  <Table.Summary.Cell></Table.Summary.Cell>
  <Table.Summary.Cell>Sum of Cost</Table.Summary.Cell>
  {Array.from({ length: 12 }, (_, index) => (
    <Table.Summary.Cell key={`price_${index}`}>{calculateTotalSpendingCostByMonth(inputValues.costPlan, index).sumOfCosts.toLocaleString()}</Table.Summary.Cell>
  ))}
</Table.Summary.Row>
<Table.Summary.Row>
  <Table.Summary.Cell>All Products:</Table.Summary.Cell>
  <Table.Summary.Cell>Total Quantity:</Table.Summary.Cell>
  {Array.from({ length: 12 }, (_, index) => (
    <Table.Summary.Cell key={`quantity_${index}`}>
      {calculateTotalSpendingCostProdcutQuantityByMonth(inputValues.costPlan, index).toLocaleString()}
      </Table.Summary.Cell>
  ))}
</Table.Summary.Row>
<Table.Summary.Row>
  <Table.Summary.Cell></Table.Summary.Cell>
  <Table.Summary.Cell>Overall Cost</Table.Summary.Cell>
  {Array.from({ length: 12 }, (_, index) => (
    <Table.Summary.Cell key={`income_${index}`}>{calculateTotalSpendingCostByMonth(inputValues.costPlan, index).totalCostByMonth.toLocaleString()}</Table.Summary.Cell>
  ))}
</Table.Summary.Row>
          </>
         
        )}
        footer={() => (
          <Button 
            onClick={handleAddCostPlanItem}
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              borderColor: '#2196f3',
              transition: 'background-color 0.3s',
            }}
          >
            Add Prodcut
          </Button>
        )}
      />
      <Divider />
      <Typography.Title level={3} style={{ color: 'white' }}>Profit Plan</Typography.Title>
      <Typography.Title level={5} style={{ color: 'white' }}>Net Monthly Profit Estimate</Typography.Title>
     
      <Table
        dataSource={inputValues.costPlan}
        columns={[
          {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            render: (_, record, index) => (
              <Input.TextArea
              className='w-32 h-full'
                value={record.productName}
                onChange={(e) => handleCostPlanChange('productName', e.target.value, index)}
                placeholder="Enter Product Name"
              />
            ),
          },
          ...monthCostPlanColumns,
        ]}
        pagination={false}
        bordered
        summary={() => (
          <>
        <Table.Summary.Row>
  <Table.Summary.Cell></Table.Summary.Cell>
  <Table.Summary.Cell>Sum of Cost</Table.Summary.Cell>
  {Array.from({ length: 12 }, (_, index) => (
    <Table.Summary.Cell key={`price_${index}`}>{calculateTotalSpendingCostByMonth(inputValues.costPlan, index).sumOfCosts.toLocaleString()}</Table.Summary.Cell>
  ))}
</Table.Summary.Row>
<Table.Summary.Row>
  <Table.Summary.Cell>All Products:</Table.Summary.Cell>
  <Table.Summary.Cell>Total Quantity:</Table.Summary.Cell>
  {Array.from({ length: 12 }, (_, index) => (
    <Table.Summary.Cell key={`quantity_${index}`}>
      {calculateTotalSpendingCostProdcutQuantityByMonth(inputValues.costPlan, index).toLocaleString()}
      </Table.Summary.Cell>
  ))}
</Table.Summary.Row>
<Table.Summary.Row>
  <Table.Summary.Cell></Table.Summary.Cell>
  <Table.Summary.Cell>Overall Cost</Table.Summary.Cell>
  {Array.from({ length: 12 }, (_, index) => (
    <Table.Summary.Cell key={`income_${index}`}>{calculateTotalSpendingCostByMonth(inputValues.costPlan, index).totalCostByMonth.toLocaleString()}</Table.Summary.Cell>
  ))}
</Table.Summary.Row>
          </>
         
        )}
        footer={() => (
          <Button 
            onClick={handleAddCostPlanItem}
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              borderColor: '#2196f3',
              transition: 'background-color 0.3s',
            }}
          >
            Add Prodcut
          </Button>
        )}
      />

 

      {/* <CapitalForm />
      <WorkingCapitalForm /> */}
    </div>
    </Modal>
  )
}

export default AddBussinessPlan