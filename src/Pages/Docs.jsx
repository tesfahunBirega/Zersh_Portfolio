import React, { useState } from 'react'
import DynamicTabs from '../components/Commons/DynamicTabs'
import EntrepreneurshipBusinessPlanMaker from '../components/Docs/Enterprnourship/EntreprenoushipDocMaker';
import Dashboard from '../commons/Dashboard';
import MindMap from '../components/Docs/mindMap/mindMap';
import { ReactFlowProvider } from "reactflow";
import "reactflow/dist/style.css";
import ConversationPlans from '../components/Docs/ConversationPlan/ConversationPlan';

const Tab = ({ children }) => {
  return <div className='w-full h-full'>{children}</div>;
};
function Docs() {  


  return (
  
    <Dashboard>

      <DynamicTabs>
      <Tab tabName="Busisness Plan Doc"> 
      <EntrepreneurshipBusinessPlanMaker />
      </Tab>
      <Tab tabName="ConversationPlan"> 
      <ConversationPlans />
      </Tab>
      <Tab  tabName="Mind Map"> 
      <ReactFlowProvider>
      <MindMap />
      </ReactFlowProvider>
      </Tab>
      </DynamicTabs>
      </Dashboard>
  )
}

export default Docs