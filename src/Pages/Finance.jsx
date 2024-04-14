import React, { useState } from 'react'
import Dashboard from '../commons/Dashboard'

import DynamicTabs from '../components/Commons/DynamicTabs'

import IncomeTab from '../components/Finance/incomTab';

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