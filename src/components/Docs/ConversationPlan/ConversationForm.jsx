import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Divider } from 'antd';

const { TextArea } = Input;
const { Item } = Form;

const containerStyle = {
  width: '21cm', 
  height: '29.7cm',
  padding: '2cm', 
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const ConversationForm = ({ purpose, onCreate, onUpdate, data }) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState(data || {});
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const onFinish = (values) => {
      console.log('Form submitted:', values);
      if (purpose === 'create') {
        onCreate(values);
      } else if (purpose === 'update') {
        onUpdate(values);
      }
      form.resetFields();
    };
  
    return (
        <div style={containerStyle}>
            {purpose == "view" ?
            <Form
            initialValues={data}
            labelCol={{ span: 24 }} // Set label column to take up the full width
            wrapperCol={{ span: 24 }} // Set wrapper column to take up the full width
          >
            <div className="grid justify-center items-center">
              <Form.Item name="title" label="Title">
                <Input disabled />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <TextArea rows={3} disabled />
              </Form.Item>
            </div>
            <Divider />
            <Item name="q1" label="1. Why do you want/need to have this conversation? What do you hope will happen?">
              <TextArea rows={3} disabled />
            </Item>
            <Item name="q2" label="2. How will I start the conversation?">
              <TextArea rows={3} disabled />
            </Item>
            <Item name="q3" label="3. How will I share my story/feeling?">
              <TextArea rows={3} disabled />
            </Item>
            <Item name="q4" label="4. What questions can I ask them to get their perspective?">
              <TextArea rows={3} disabled />
            </Item>
            <Item name="q5" label="5. What are some simple solutions that I can suggest?">
              <TextArea rows={3} disabled />
            </Item>
            <Divider />
          </Form>:
 <Form
 form={form}
 initialValues={formData}
 onFinish={onFinish}
 labelCol={{ span: 24 }} 
 wrapperCol={{ span: 24 }} 
>
   <div className="grid justify-center items-center">
   <Form.Item name="title" label="Title">
<Input onChange={handleInputChange}  />
</Form.Item>
<Form.Item name="description" label="Description">
<TextArea rows={3} onChange={handleInputChange}  />
</Form.Item>
   </div>
   <Divider /> 
     <Item name="q1" label="1. Why do you want/need to have this conversation? What do you hope will happen?">
       <TextArea rows={3} onChange={handleInputChange} />
     </Item>
     <Item name="q2" label="2. How will I start the conversation?">
       <TextArea rows={3} onChange={handleInputChange} />
     </Item>
     <Item name="q3" label="3. How will I share my story/feeling?">
       <TextArea rows={3} onChange={handleInputChange} />
     </Item>
     <Item name="q4" label="4. What questions can I ask them to get their perspective?">
       <TextArea rows={3} onChange={handleInputChange} />
     </Item>
     <Item name="q5" label="5. What are some simple solutions that I can suggest?">
       <TextArea rows={3} onChange={handleInputChange} />
     </Item>
   <Divider /> 
     <div className="grid justify-center items-center mb-8">
     <Button 
     type="primary" 
     htmlType="submit" 
     style={{
       backgroundColor: '#001529', 
       borderColor: '#001529',
       color: '#fff', 
       '&:hover': {
         backgroundColor: '#002140',
         borderColor: '#002140', 
       }
     }}
   >
     Submit
   </Button>


     </div>

    
</Form>
        
        }
       
     
            
      </div>
    );
  };
  
export default ConversationForm;
