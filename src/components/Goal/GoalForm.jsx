// GoalForm.js
import React from "react";
import { Modal, Form, Input, Button } from "antd";
import moment from "moment";
import CustomButton from "../Commons/CustomButton";
import { EditOutlined } from '@ant-design/icons';

const GoalForm = ({ visible, onCreate, onUpdate, onCancel, initialValues }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (initialValues) {
        onUpdate(initialValues._id, values);
      } else {
        values.year = moment().format("YYYY")
        onCreate(values);
        console.log(values);
      }
      form.resetFields();
    });
  };

  return (
    <Modal
      open={visible}
      width={'40%'}
      title={initialValues ? "Update Goal" : "Add Goal"}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
            <CustomButton
              style={{
                color: '#001529',
                border: '1px solid #001529',
                transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
                '&:hover': {
                  backgroundColor: '#001529',
                  borderColor: '#001529',
                  color: '#ffffff',
                }
              }}
              danger
              tailWindClassName={""}
              icon={<EditOutlined />}
              key="submit"
              type="primary"
              onClick={handleOk}
            >
      {initialValues ? "Update" : "Add"}
    </CustomButton>
          ]}
        >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item
          name="title"
          label="Goal Title"
          rules={[{ required: true, message: "Please enter goal name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GoalForm;
