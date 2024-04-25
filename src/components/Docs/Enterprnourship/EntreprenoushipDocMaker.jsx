import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Table, Typography, Divider, Col, Row } from 'antd';
import CustomInput from '../../Commons/CustomInputs';

import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import AddBussinessPlan from './AddBussinessPlan';
import BusinessProposal from './bussienssPlanRender';
import { connect } from 'react-redux';
import { createBusinessPlan, deleteBusinessPlan, fetchBusinessPlans, updateBusinessPlan } from '../../../store/bussinessPlan/bussinessPlanAction';

const EntrepreneurshipBusinessPlanMaker = ({
  bussinessPlan,
fetchBusinessPlans,
createBusinessPlan,
updateBusinessPlan,
deleteBusinessPlan,
}) => {
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
  
  useEffect(()=>{
    fetchBusinessPlans()
  },[])
  console.log(bussinessPlan,"bussinessPlan");
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

  const handleCreate =()=>{
    createBusinessPlan(inputValues)
  }
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

  const [openAddBussinessPlanModal , setOpenAddBussinessPlanModal] = useState(false)
  return (
  <div>
    <div className="flex justify-end items-center">
    <Button
        style={{ background: '#1f2d3d', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px' }}
        onClick={() => setOpenAddBussinessPlanModal(!openAddBussinessPlanModal)}
        className='flex justify-center items-center'
      >
        Add Business Plan
      </Button>
    </div>
    {bussinessPlan?.map((proposal, index) =>(
      <BusinessProposal key={index} proposal={proposal} />
    ))}
    <AddBussinessPlan
     calculateTotalByMonth={calculateTotalByMonth}
     calculateTotalSpendingCostByMonth={calculateTotalSpendingCostByMonth}
     calculateTotalSpendingCostProdcutQuantityByMonth={calculateTotalSpendingCostProdcutQuantityByMonth}
     calculateTotalSum={calculateTotalSum}
     calculateTotalSumWorkingCapital={calculateTotalSumWorkingCapital}
     handleAddCapitalItem={handleAddCapitalItem}
     handleAddCostPlanItem={handleAddCostPlanItem}
     handleAddSalesPlanItem={handleAddSalesPlanItem}
     handleAddWorkingCapitalItem={handleAddWorkingCapitalItem}
     handleCancel={()=>setOpenAddBussinessPlanModal(false)}
     handleCapitalItemsChange={handleCapitalItemsChange}
     handleChange={handleChange}
     handleCostPlanChange={handleCostPlanChange}
     handleOk={handleCreate}
     handleSalesPlanChange={handleSalesPlanChange}
     handleWorkingCapitalChange={handleWorkingCapitalChange}
     inputValues={inputValues}
     monthColumns={monthColumns}
     monthCostPlanColumns={monthCostPlanColumns}
     visible={openAddBussinessPlanModal}
     width={'80%'}
    />
  </div>
  );
};


const mapStateToProps = (state) => {
  return {
    bussinessPlan: state.bussinessPlan.businessPlans,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBusinessPlans: () => dispatch(fetchBusinessPlans()),
    createBusinessPlan: (data) => dispatch(createBusinessPlan(data)),
    updateBusinessPlan: (data) => dispatch(updateBusinessPlan(data)),
    deleteBusinessPlan: (goalId) => dispatch(deleteBusinessPlan(goalId)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntrepreneurshipBusinessPlanMaker);