import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input } from "antd";
import Dashboard from "../commons/Dashboard";
import { fetchNotes } from "../store/note/noteAction";
import { fetchGoals } from "../store/okr/goalAction";
import { connect } from "react-redux";

const { Column } = Table;

const Okr = ({fetchedgoals,
  fetchNotes}) => {
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch goals data from backend API and set it to goals state
    // Example:
    // fetchGoalsData().then(data => setGoals(data));
    fetchNotes()
  }, []); // Empty dependency array to run the effect only once on mount


  console.log(fetchedgoals , "goalsssss");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Submit form data to backend API to create new goal
      // Example:
      // createGoal(values).then(newGoal => {
      //   setGoals([...goals, newGoal]);
      // });
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  return (
    <Dashboard>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Goals Management</h1>
        <Button type="primary" onClick={showModal} className=" mb-4">
          Add Goal
        </Button>
        <Modal
          title="Add Goal"
          width={'40%'}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Goal Name"
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
        <Table dataSource={goals} rowKey="_id">
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
          />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Button type="danger" onClick={() => handleDelete(record._id)}>
                Delete
              </Button>
            )}
          />
        </Table>
      </div>
    </Dashboard>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchedgoals: state.goal.goals,
    goal: state.goal.goal,
    loading: state.notes.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: () => dispatch(fetchGoals()),
    createGoal: (data) => dispatch(createGoal(data)),
    // updateNote: (data) => dispatch(updateNote(data)),
    // deleteNote: (noteId) => dispatch(deleteNote(noteId)),
    // fetchCatagory: () => dispatch(fetchCatagories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Okr);