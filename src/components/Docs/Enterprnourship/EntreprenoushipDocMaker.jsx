import React, { useState } from 'react';
import { Button, Input, Modal, Table, Typography, Divider, Col, Row } from 'antd';
import CustomInput from '../../Commons/CustomInputs';

import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const EntrepreneurshipBusinessPlanMaker = () => {
  const [inputValues, setInputValues] = useState({
    generalTitle: '',
    generalDescription: '',
    businessIdea: '',
    businessEnvironment: '',
    marketCompetition: '',
    marketingPlan: '',
    capitalItems: [],
    workingCapitalItems: [],
    salesPlan:[],
    costPlan: [],
    businessProfile: {
      tradeName: '',
      businessOwnerName: '',
      businessAddress: '',
      phoneNumber: '',
      email: '',
    },
    totalStartupCapital: 0,
    totalWorkingCapital: 0,
  });

  console.log(inputValues ,"inputValues");
  
  const handleChange = (name, value) => {
    if (name.includes('.')) {
        const [parentKey, subKey] = name.split('.');
        setInputValues(prevInputValues => ({
            ...prevInputValues,
            [parentKey]: {
                ...prevInputValues[parentKey],
                [subKey]: value,
            },
        }));
    } else {
        setInputValues(prevInputValues => ({
            ...prevInputValues,
            [name]: value,
        }));
    }
};

const handleCapitalItemsChange = (name, value) => {
  const [parentKey, subKey, nestedKey] = name.split('.');
  
  setInputValues(prevInputValues => {
      const updatedCapitalItems = prevInputValues[parentKey].map(item => {
          if (item.key === +subKey) { 
              return {
                  ...item,
                  [nestedKey]: value
              };
          }
          return item;
      });

      return {
          ...prevInputValues,
          [parentKey]: updatedCapitalItems
      };
  });
};

const calculateTotalSum = () => {
  let totalAmount = 0;
  let totalPrice = 0;

  inputValues.capitalItems.forEach(item => {
    totalAmount += parseFloat(item.amount) || 0; 
    totalPrice += parseFloat(item.price) || 0; 
  });

  return { totalAmount, totalPrice };
};

const calculateTotalSumWorkingCapital = () => {
  let staffCosts = 0;
  let operatingExpenses = 0;

  inputValues.workingCapitalItems.forEach(item => {
    

    staffCosts += parseFloat(item.staffCosts) || 0; 
    operatingExpenses += parseFloat(item.operatingExpenses) || 0; 
  });

  return { staffCosts, operatingExpenses };
};

const calculateTotalByMonth = (type, monthIndex) => {
  let total = 0;

  // Loop through each product
  inputValues.salesPlan.forEach(product => {
    // Add the value for the specified month from the given type (price, quantity, or income)
    total += parseFloat(product.values[type].data[monthIndex]) || 0;
  });

  return total;
};

const calculateTotalSpendingCostByMonth = (inputValues, monthIndex) => {
  let totalCostByMonth = 0;
  let sumOfCosts = 0;

  // Iterate through each product
  inputValues.forEach(product => {
    // Reset sumOfCosts for each product
    sumOfCosts = 0;

    // Sum all costs for the specified month
    Object.keys(product.values).forEach(key => {
      if (key !== 'quantity' && product.values.quantity.data[monthIndex] >= 1) {
        const expenditureData = product.values[key].data;
        sumOfCosts += parseFloat(expenditureData[monthIndex]) || 0;
      }
    });

    // Multiply the sum of costs by the quantity for the current product
    const quantity = product.values.quantity.data[monthIndex] || 0;
    totalCostByMonth += sumOfCosts * quantity;
  });

  return { totalCostByMonth, sumOfCosts };
};


const calculateTotalSpendingCostProdcutQuantityByMonth = (inputValues, monthIndex) => {
  let totalQuantityByMonth = 0;

  // Iterate through each product
  inputValues.forEach(product => {
    // Get the quantity for the specified month and add it to the total
    totalQuantityByMonth += product.values.quantity.data[monthIndex] || 0;
  });

  return totalQuantityByMonth;
};


const handleWorkingCapitalChange = (name, value) => {
  const [parentKey, subKey, nestedKey] = name.split('.');
  
  setInputValues(prevInputValues => {
      const updatedCapitalItems = prevInputValues[parentKey].map(item => {
          if (item.key === +subKey) { 
              return {
                  ...item,
                  [nestedKey]: value
              };
          }
          return item;
      });

      return {
          ...prevInputValues,
          [parentKey]: updatedCapitalItems
      };
  });
};



const activeMonth = moment().month();

const handleAddSalesPlanItem = () => {
  const newItem = {
    key: Math.floor(Math.random() * 1000000),
    productName: '',
    values: {
      price: {
        type:"Price",
        data: Array(12).fill(0)},
      quantity: {
        type:"Quantity",
        data: Array(12).fill(0)},
      income:  {
        type:"Income",
        data: Array(12).fill(0)}
    }
  };

  setInputValues(prevState => ({
    ...prevState,
    salesPlan: [...prevState.salesPlan, newItem],
  }));
};


const handleAddCostPlanItem= ()=>{
  const newItem = {
    key: Math.floor(Math.random() * 1000000),
    productName: '',
    values: {
      price: {
        type:"Single Price",
        data: Array(12).fill(0)},
      quantity: {
        type:"Quantity",
        data: Array(12).fill(0)},
      material:{
        type: 'Mateirals Cost',
        data:Array(12).fill(0)
      },
      labour:{
        type: 'Lebour Cost',
        data:Array(12).fill(0)
      },
      operational:{
        type: 'Operational Costs',
        data:Array(12).fill(0)
      },
      others:{
        type: 'Others',
        data:Array(12).fill(0)
      },
      captitalExpenditure:{
        type: "Capital Expenditure",
        data:Array(12).fill(0)

      }
    }
  };

  setInputValues(prevState => ({
    ...prevState,
    costPlan: [...prevState.costPlan, newItem],
  }));
}
const handleSalesPlanChange = (name, value, index) => {
  setInputValues(prevState => {
    const updatedSalesPlan = [...prevState.salesPlan];
    console.log(updatedSalesPlan[index][name] ,'prdcutName' , name );
    updatedSalesPlan[index][name] = value;
    return {
      ...prevState,
      salesPlan: updatedSalesPlan,
    };
  });
};


const handleCostPlanChange=(name, value, index) => {
  setInputValues(prevState => {
    const updatedCostPlan = [...prevState.costPlan];
    updatedCostPlan[index][name] = value;
    return {
      ...prevState,
      costPlan: updatedCostPlan,
    };
  });
};


const monthNames = [
  'Type','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];



 const monthColumns = Array.from({ length: 13 }).map((_, index) => {
    if (index === 0) {
      return {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (_, record) => {
          return <div className='w-20'>
      <Title style={{ color: 'black' }} level={5}>Price</Title>
              <Divider />
      <Title style={{ color: 'black' }} level={5}>Quantity</Title>
              <Divider />
      <Title style={{ color: 'black' }} level={5}>Income</Title>
             
          </div>;
        },
      };
    } else {
      return {
        title: monthNames[index],
        dataIndex: `values.${index}`,
        key: index,
        render: (_, record  , rowIndex) => {
          return (
            <div>
             
              <Input
                type="number"
                value={record?.values[`price`]?.data[index - 1]}
                onChange={(e) => handleSalesPlanMonthChange(`values.price.data[${index - 1}]`, e.target.value, index , rowIndex)}
                placeholder={`Price Month ${index}`}
              />
              <Divider />
              <Input
                type="number"
                value={record?.values[`quantity`]?.data[index - 1]}
                onChange={(e) => handleSalesPlanMonthChange(`values.quantity.data[${index - 1}]`, e.target.value, index , rowIndex)}
                placeholder={`Quantity Month ${index}`}
              />
              <Divider />
              <Input
                type="number"
                value={record?.values[`income`]?.data[index - 1]}
                onChange={(e) => handleSalesPlanMonthChange(`values.income.data[${index - 1}]`, e.target.value, index , rowIndex)}
                placeholder={`Income Month ${index}`}
              />
            </div>
          );
        },
      };
    }
  });

  const monthCostPlanColumns = Array.from({ length: 13 }).map((_, index) => {
    if (index === 0) {
      return {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (_, record) => {
          return <div className='w-40'>
      <Title style={{ color: 'black' }} level={5}>Single Price</Title>
      <div className='h-2' />
      <Divider />
      <Title style={{ color: 'black' }} level={5}>Quantity</Title>
      <div className='h-2' />
      <Divider />
      <Title style={{ color: 'black' }} level={5}>Lebour Cost</Title>
      <div className='h-2' />
      <Divider />
      <Title style={{ color: 'black' }} level={5}>Material Cost</Title>
      <div className='h-2' />
      <Divider />
      <Title style={{ color: 'black' }} level={5}>Capital Expenditure</Title>
      <div className='h-2' />
      <Divider />
      <Title style={{ color: 'black' }} level={5}>Other Costs</Title>
      </div>;
        },
      };
    } else {
      return {
        title: monthNames[index],
        dataIndex: `values.${index}`,
        key: index,
        render: (_, record  , rowIndex) => {
          return (
            <div>
             
              <Input
                type="number"
                value={record?.values[`price`]?.data[index - 1]}
                onChange={(e) => handleCostPlanMonthChange(`values.price.data[${index - 1}]`, e.target.value, index , rowIndex)}
                placeholder={`Price Month ${index}`}
              />
              
              <Divider />
              <Input
                type="number"
                value={record?.values[`quantity`]?.data[index - 1]}
                onChange={(e) => handleCostPlanMonthChange(`values.quantity.data[${index - 1}]`, e.target.value, index , rowIndex)}
                placeholder={`Quantity Month ${index}`}
              />
              <Divider />

              <Input
                type="number"
                value={record?.values[`labour`]?.data[index - 1]}
                onChange={(e) => handleCostPlanMonthChange(`values.labour.data[${index - 1}]`, e.target.value, index , rowIndex)}
                placeholder={`Labour Month ${index}`}
              />
               <Divider />
              <Input
                type="number"
                value={record?.values[`material`]?.data[index - 1]}
                onChange={(e) => handleCostPlanMonthChange(`values.material.data[${index - 1}]`, e.target.value, index , rowIndex)}
                placeholder={`Material Month ${index}`}
              />
           
               <Divider />
              <Input
                type="number"
                value={record?.values[`captitalExpenditure`]?.data[index - 1]}
                onChange={(e) => handleCostPlanMonthChange(`values.captitalExpenditure.data[${index - 1}]`, e.target.value, index , rowIndex)}
                placeholder={`Quantity Month ${index}`}
              />
              <Divider />
              <Input
                type="number"
                value={record?.values[`others`]?.data[index - 1]}
                onChange={(e) => handleCostPlanMonthChange(`values.others.data[${index - 1}]`, e.target.value, index , rowIndex)}
                placeholder={`Quantity Month ${index}`}
              />
            </div>
          );
        },
      };
    }
  });

  const handleSalesPlanMonthChange = (path, value, index, rowIndex) => {
    try {
      const pathArray = path.split('.');
      if (pathArray.length !== 3) {
        throw new Error('Invalid path format');
      }
      const updatedSalesPlan = [...inputValues.salesPlan];
      const match = /\[(\d+)\]/.exec(pathArray[2]);
      if (!match) {
        throw new Error('Invalid path format');
      }
      const dataIndex = parseInt(match[1]);
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        throw new Error('Invalid value');
      }
  
      if (
        updatedSalesPlan[rowIndex] &&
        updatedSalesPlan[rowIndex][pathArray[0]] &&
        updatedSalesPlan[rowIndex][pathArray[0]][pathArray[1]] &&
        updatedSalesPlan[rowIndex][pathArray[0]][pathArray[1]].data &&
        updatedSalesPlan[rowIndex][pathArray[0]][pathArray[1]].data.length > dataIndex
      ) {
        updatedSalesPlan[rowIndex][pathArray[0]][pathArray[1]].data[dataIndex] = parsedValue;
      } else {
        throw new Error('Invalid path or index');
      }
      setInputValues(prevState => ({
        ...prevState,
        salesPlan: updatedSalesPlan
      }));

    } catch (error) {
      console.error('Error in handleSalesPlanMonthChange:', error.message);
    }
  };

  const handleCostPlanMonthChange= (path, value, index, rowIndex) => {
    try {
      const pathArray = path.split('.');
      if (pathArray.length !== 3) {
        throw new Error('Invalid path format');
      }
      const updatedCostPlan = [...inputValues.costPlan];
      const match = /\[(\d+)\]/.exec(pathArray[2]);
      if (!match) {
        throw new Error('Invalid path format');
      }
      const dataIndex = parseInt(match[1]);
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        throw new Error('Invalid value');
      }
  
      if (
        updatedCostPlan[rowIndex] &&
        updatedCostPlan[rowIndex][pathArray[0]] &&
        updatedCostPlan[rowIndex][pathArray[0]][pathArray[1]] &&
        updatedCostPlan[rowIndex][pathArray[0]][pathArray[1]].data &&
        updatedCostPlan[rowIndex][pathArray[0]][pathArray[1]].data.length > dataIndex
      ) {
        updatedCostPlan[rowIndex][pathArray[0]][pathArray[1]].data[dataIndex] = parsedValue;
      } else {
        throw new Error('Invalid path or index');
      }
      setInputValues(prevState => ({
        ...prevState,
        costPlan: updatedCostPlan
      }));

    } catch (error) {
      console.error('Error in handleCostPlanMonthChange:', error.message);
    }
  };
  
  
  

  const { Title } = Typography;

  const handleAddCapitalItem = () => {
    const newItem = {
      key: Math.floor(Math.random() * 1000000),
      name: '', 
      amount: '',
      goods: '',
      price: '',
    };
  
    setInputValues(prevState => ({
      ...prevState,
      capitalItems: [...prevState.capitalItems, newItem],
    }));
  };


  const handleAddWorkingCapitalItem = () => {
    const newItem = {
      key: Math.floor(Math.random() * 1000000),
      month:'',
      staffCosts:'',
      operatingExpenses:''
    };
  
    setInputValues(prevState => ({
      ...prevState,
      workingCapitalItems: [...prevState.workingCapitalItems, newItem],
    }));
  };
  

  const handleRemoveCapitalItem = index => {
    setInputValues(prevState => {
      const newCapitalItems = [...prevState.capitalItems];
      newCapitalItems.splice(index, 1); 
      return {
        ...prevState,
        capitalItems: newCapitalItems,
      };
    });
  };
  // Capital input form component
  const CapitalForm = ({ visible, onCancel, onCreate }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [goods, setGoods] = useState('');
    const [price, setPrice] = useState('');

    const handleCreate = () => {
      onCreate({ name, amount, goods, price });
      setName('');
      setAmount('');
      setGoods('');
      setPrice('');
    };


    return (
      <Modal open={visible} title="Add Capital Item" onCancel={onCancel} onOk={handleCreate}>
        <CustomInput
          type="text"
          value={name}
          onChange={value => setName(value)}
          placeholder="Name"
        />
        <CustomInput
          type="number"
          value={amount}
          onChange={value => setAmount(value)}
          placeholder="Estimate Amount"
        />
        <CustomInput
          type="text"
          value={goods}
          onChange={value => setGoods(value)}
          placeholder="List of Goods"
        />
        <CustomInput
          type="number"
          value={price}
          onChange={value => setPrice(value)}
          placeholder="Price in Birr"
        />
      </Modal>
    );
  };

  // Working capital input form component
  const WorkingCapitalForm = ({ visible, onCancel, onCreate }) => {
    const [month, setMonth] = useState('');
    const [staffCosts, setStaffCosts] = useState('');
    const [operatingExpenses, setOperatingExpenses] = useState('');

    const handleCreate = () => {
      onCreate({ month, staffCosts, operatingExpenses });
      setMonth('');
      setStaffCosts('');
      setOperatingExpenses('');
    };

    return (
      <Modal open={visible} title="Add Working Capital Item" onCancel={onCancel} onOk={handleCreate}>
        <CustomInput
          type="text"
          value={month}
          onChange={value => setMonth(value)}
          placeholder="Month"
        />
        <CustomInput
          type="number"
          value={staffCosts}
          onChange={value => setStaffCosts(value)}
          placeholder="Staff Costs"
        />
        <CustomInput
          type="number"
          value={operatingExpenses}
          onChange={value => setOperatingExpenses(value)}
          placeholder="Operating Expenses"
        />
      </Modal>
    );
  };

  return (
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

 

      <CapitalForm />
      <WorkingCapitalForm />
    </div>
  );
};

export default EntrepreneurshipBusinessPlanMaker;
