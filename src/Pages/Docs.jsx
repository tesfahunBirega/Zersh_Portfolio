import React from 'react'
import DynamicTabs from '../components/Commons/DynamicTabs'
import EntrepreneurshipBusinessPlanMaker from '../components/Docs/Enterprnourship/EntreprenoushipDocMaker';
import Dashboard from '../commons/Dashboard';

const Tab = ({ children }) => {
  return <>{children}</>;
};
function Docs() {  
  return (
  
    <Dashboard>

      <DynamicTabs>
      <Tab tabName="Busisness Plan Doc"> 
      <EntrepreneurshipBusinessPlanMaker />
      </Tab>
      <Tab tabName="Strategy"> 
      Strategy
      </Tab>
      <Tab tabName="Mind Map"> 
      Mind Map
      </Tab>
      <Tab tabName="Marketing"> 
      Marketing
      </Tab>
      <Tab tabName="Opportunity"> 
      Opportunity
      </Tab>
      <Tab tabName="Investment"> 
      Investment
      </Tab>
      </DynamicTabs>
      </Dashboard>
  )
}

export default Docs