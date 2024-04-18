import React, { useState } from 'react'
import Dashboard from '../commons/Dashboard'

import DynamicTabs from '../components/Commons/DynamicTabs'
import IncomeTab from '../components/Finance/Income/incomTab';
import ExpenseTabPart from '../components/Finance/Expense/expence';
import PaymentTabPart from '../components/Finance/Payment/payment';




const Tab = ({ children }) => {
    return <>{children}</>;
  };

  const { TabPane } = DynamicTabs;
function Finance() {
  return (
    <Dashboard>
    <DynamicTabs>
      <Tab tabName="Income">
       <IncomeTab />
      </Tab>
      <Tab tabName="Expence">
      <ExpenseTabPart />
     
      </Tab>
      <Tab tabName="Payment">
        <PaymentTabPart />
      </Tab>
    </DynamicTabs>
    </Dashboard>

  )
}

export default Finance