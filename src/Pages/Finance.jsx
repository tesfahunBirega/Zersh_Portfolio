import React, { useState } from 'react'
import Dashboard from '../commons/Dashboard'
import { Calendar, Card, Form, Input, Button  } from 'antd'; 
import DynamicTabs from '../components/Commons/DynamicTabs'
import moment from 'moment';

const Tab = ({ children }) => {
    return <>{children}</>;
  };

  const { TabPane } = DynamicTabs;
function Finance() {
  // State for managing income
  const [income, setIncome] = useState([]);
  const [budgets, setBudgets] = useState([]); // State for managing budgets
  const [incomeAmount, setIncomeAmount] = useState('');
  const [budgetAmount, setBudgetAmount] = useState(''); // State for managing budget amount
  const [selectedMonth, setSelectedMonth] = useState(moment());

  // Function to handle income submission
  const handleIncomeSubmission = (values) => {
    const newIncome = { month: selectedMonth.format('MMMM YYYY'), amount: values.incomeAmount };
    setIncome([...income, newIncome]);
    setIncomeAmount('');
  };

  // Function to handle budget submission
  const handleBudgetSubmission = (values) => {
    const newBudget = { month: selectedMonth.format('MMMM YYYY'), amount: values.budgetAmount };
    setBudgets([...budgets, newBudget]);
    setBudgetAmount('');
  };

  // Calculate total income for the selected month
  const totalIncomeForMonth = income.reduce((total, item) => {
    if (item.month === selectedMonth.format('MMMM YYYY')) {
      return total + parseFloat(item.amount);
    }
    return total;
  }, 0);

  // Calculate total budget for the selected month
  const totalBudgetForMonth = budgets.reduce((total, item) => {
    if (item.month === selectedMonth.format('MMMM YYYY')) {
      return total + parseFloat(item.amount);
    }
    return total;
  }, 0);

  // Calculate remaining budget for the selected month
  const remainingBudgetForMonth = totalBudgetForMonth - totalIncomeForMonth;
  return (
    <Dashboard>

    <div>Finance</div>
    <DynamicTabs>
      <Tab tabName="Income">
        <div className="flex flex-cols-2 w-full">
            <div className="col-span-1 col-start-1 w-full">
                 <h2>Income</h2>
          <Form onFinish={handleIncomeSubmission}>
            <Form.Item label="Enter Income Amount" name="incomeAmount" rules={[{ required: true, message: 'Please enter income amount!' }]}>
              <Input type="number" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Add Income</Button>
            </Form.Item>
          </Form>
            </div>
            <div className="col-span-1 col-start-2 w-full">
            <h2>Income Summary</h2>
          <Calendar 
            fullscreen={false}
            value={selectedMonth}
            onSelect={(value) => setSelectedMonth(value)}
          />
          <Card title={`Income for ${selectedMonth.format('MMMM YYYY')}`}>
            <p>Total Income: ${totalIncomeForMonth.toFixed(2)}</p>
            <p>Remaining Income: ${remainingIncomeForMonth.toFixed(2)}</p>
          </Card>
            </div>

        </div>
     
      </Tab>
      <Tab tabName="Expence">
      <DynamicTabs>
            <Tab tabName="Food">Food Expence</Tab>
            <Tab tabName="Transport">Transport Payment</Tab>
        </DynamicTabs>
      </Tab>
      <Tab tabName="Payment">
        <DynamicTabs>
            <Tab tabName="Recuring payment">Recuring Payment</Tab>
            <Tab tabName="One Time payment">One Time Payment</Tab>
        </DynamicTabs>
      </Tab>
    </DynamicTabs>
    </Dashboard>

  )
}

export default Finance