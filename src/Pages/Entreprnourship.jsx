import React, { useState } from 'react';
import { Button, Input, Modal, Form, Table , Typography, Divider } from 'antd';
import Dashboard from '../commons/Dashboard';


const EntrepreneurshipBusinessPlanMaker = () => {
  const [generalTitle, setGeneralTitle] = useState('');
  const [generalDescription, setGeneralDescription] = useState('');
  const [businessIdea, setBusinessIdea] = useState('');
  const [businessEnvironment, setBusinessEnvironment] = useState('');
  const [marketCompetition, setMarketCompetition] = useState('');
  const [marketingPlan, setMarketingPlan] = useState('');
  const [capitalItems, setCapitalItems] = useState([]);
  const [workingCapitalItems, setWorkingCapitalItems] = useState([]);
  const [totalStartupCapital, setTotalStartupCapital] = useState(0);
  const [totalWorkingCapital, setTotalWorkingCapital] = useState(0);
  const [showCapitalModal, setShowCapitalModal] = useState(false);
  const [showWorkingCapitalModal, setShowWorkingCapitalModal] = useState(false);


  const { Title, Paragraph } = Typography;
  // Function to handle adding a capital item
  const handleCapitalItemAdd = values => {
    setCapitalItems([...capitalItems, values]);
    setShowCapitalModal(false);
  };

    // State for business profile
    const [businessProfile, setBusinessProfile] = useState({
      tradeName: '',
      businessOwnerName: '',
      businessAddress: '',
      phoneNumber: '',
      email: '',
    });

    const handleBusinessProfileChange = (key, value) => {
      setBusinessProfile({ ...businessProfile, [key]: value });
    };
  // Function to handle adding a working capital item
  const handleWorkingCapitalItemAdd = values => {
    setWorkingCapitalItems([...workingCapitalItems, values]);
    setShowWorkingCapitalModal(false);
  };

  // Function to handle general description change
  const handleGeneralDescriptionChange = (e) => {
    setGeneralDescription(e.target.value);
  };

  // Function to handle business idea and market change
  const handleBusinessIdeaChange = (e) => {
    setBusinessIdea(e.target.value);
  };

  const handleBusinessEnvironmentChange = (e) => {
    setBusinessEnvironment(e.target.value);
  };
  // Capital input form component
  const CapitalForm = ({ visible, onCancel, onCreate }) => {
    const [form] = Form.useForm();
    return (
      <Modal open={visible} title="Add Capital Item" onCancel={onCancel} onOk={() => {
        form.validateFields().then(values => {
          form.resetFields();
          onCreate(values);
        });
      }}>
        <Form form={form} layout="vertical" name="capital_form">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="Estimate Amount" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="goods" label="List of Goods" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price in Birr" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  // Working capital input form component
  const WorkingCapitalForm = ({ visible, onCancel, onCreate }) => {
    const [form] = Form.useForm();
    return (
      <Modal open={visible} title="Add Working Capital Item" onCancel={onCancel} onOk={() => {
        form.validateFields().then(values => {
          form.resetFields();
          onCreate(values);
        });
      }}>
        <Form form={form} layout="vertical" name="working_capital_form">
          <Form.Item name="month" label="Month" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="staffCosts" label="Staff Costs" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="operatingExpenses" label="Operating Expenses" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <Dashboard>
      <div className="container mx-auto">
      <Title level={2} style={{ color: 'white' }}>Entrepreneurship Business Plan Maker</Title>
        <div className="flex justify-between items-center">
          <div className="grid">
          <h2 className="text-2xl font-bold my-4">1. General Title</h2>

        <Input
          value={generalTitle}
          onChange={e => setGeneralTitle(e.target.value)}
          placeholder="Enter your General title here..." 
        />
          </div>
        <p>{new Date().toDateString()}</p>

        </div>

        <Divider />
        <Title style={{ color: 'white' }} level={3}>2 General Description</Title>
        <Input.TextArea 
          rows={4} 
          value={generalDescription} 
          onChange={handleGeneralDescriptionChange} 
          placeholder="Enter your general description here..." 
        />
         <Divider />
        <Title style={{ color: 'white' }} level={3}>Business Profile</Title>
        <div className="grid col-span-3  items-center gap-3">
        <Input 
          value={businessProfile.tradeName} 
          onChange={(e) => handleBusinessProfileChange('tradeName', e.target.value)} 
          placeholder="Trade Name" 
          className='col-span-1 col-start-1'

        />
        <Input 
          value={businessProfile.businessOwnerName} 
          onChange={(e) => handleBusinessProfileChange('businessOwnerName', e.target.value)} 
          placeholder="Business Owner's Name" 
          className='col-span col-start-2'

        />
        <Input 
          value={businessProfile.businessAddress} 
          onChange={(e) => handleBusinessProfileChange('businessAddress', e.target.value)} 
          placeholder="Business Address" 
          className='col-span'

        />
        <Input 
          value={businessProfile.phoneNumber} 
          onChange={(e) => handleBusinessProfileChange('phoneNumber', e.target.value)} 
          placeholder="Phone Number" 
          type='number'
          className='col-span'

        />
        <Input 
          value={businessProfile.email} 
          onChange={(e) => handleBusinessProfileChange('email', e.target.value)} 
          placeholder="Email" 
          className='col-span'
        />

        </div>

        <Divider />
        <Title  style={{ color: 'white' }} level={3}>Business Idea and Market</Title>
        <Input.TextArea 
          rows={4} 
          value={businessIdea} 
          onChange={handleBusinessIdeaChange} 
          placeholder="Enter your business idea and market description here..." 
        />

        <Divider />
        <Title  style={{ color: 'white' }}  level={3}>Business Environment</Title>
        <Input.TextArea 
          rows={4} 
          value={businessEnvironment} 
          onChange={handleBusinessEnvironmentChange} 
          placeholder="Describe how environmental impacts can affect your business..." 
        />
        {/* Market competition */}
        <h2 className="text-2xl font-bold my-4">6. Market competition</h2>
        <Input.TextArea
          rows={4}
          value={marketCompetition}
          onChange={e => setMarketCompetition(e.target.value)}
        />

        {/* Marketing plan */}
        <h2 className="text-2xl font-bold my-4">7. Marketing plan</h2>
        <Input.TextArea
          rows={4}
          value={marketingPlan}
          onChange={e => setMarketingPlan(e.target.value)}
        />

        {/* Starting capital */}
        <h2 className="text-2xl font-bold my-4">8. Starting capital</h2>
        <Table
          dataSource={capitalItems}
          columns={[
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Estimate Amount', dataIndex: 'amount', key: 'amount' },
            { title: 'List of Goods', dataIndex: 'goods', key: 'goods' },
            { title: 'Price in Birr', dataIndex: 'price', key: 'price' },
          ]}
          footer={() => (
            <Button onClick={() => setShowCapitalModal(true)} type="primary">Add Item</Button>
          )}
        />
        {/* Display total investment */}
        <p>Total Investment: {totalStartupCapital} Birr</p>

        {/* Working Capital */}
        <h2 className="text-2xl font-bold my-4">9. Working Capital</h2>
        <Table
          dataSource={workingCapitalItems}
          columns={[
            { title: 'Month', dataIndex: 'month', key: 'month' },
            { title: 'Staff Costs', dataIndex: 'staffCosts', key: 'staffCosts' },
            { title: 'Operating Expenses', dataIndex: 'operatingExpenses', key: 'operatingExpenses' },
          ]}
          footer={() => (
            <Button onClick={() => setShowWorkingCapitalModal(true)} type="primary">Add Item</Button>
          )}
        />
        {/* Display total working capital */}
        <p>Total Working Capital: {totalWorkingCapital} Birr</p>
        {/* Display total startup capital */}
        <p>Total Startup Capital: {totalStartupCapital} Birr</p>

        {/* Modals for adding capital and working capital items */}
        <CapitalForm
          visible={showCapitalModal}
          onCancel={() => setShowCapitalModal(false)}
          onCreate={handleCapitalItemAdd}
        />
        <WorkingCapitalForm
          visible={showWorkingCapitalModal}
          onCancel={() => setShowWorkingCapitalModal(false)}
          onCreate={handleWorkingCapitalItemAdd}
        />
      </div>
    </Dashboard>
  );
};

export default EntrepreneurshipBusinessPlanMaker;
