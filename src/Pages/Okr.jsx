import React, { useState, useEffect } from "react";
import { Button, Card, Popconfirm, Popover } from "antd";
import Dashboard from "../commons/Dashboard";
import { connect } from "react-redux";
import GoalForm from "../components/Goal/GoalForm";
import { createGoal, deleteGoal, fetchGoals, updateGoal } from "../store/okr/goalAction";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CustomButton from "../components/Commons/CustomButton";

const Okr = ({ fetchedGoals, fetchGoals, createGoal, updateGoal , deleteGoal }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  console.log(fetchedGoals );

  useEffect(() => {
    fetchGoals();
  }, []);

  const showModal = () => {
    setSelectedGoal(null);
    setIsModalVisible(true);
  };

  const showEditModal = (goal) => {
    setSelectedGoal(goal);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateGoal = (values) => {
    createGoal(values);
    setIsModalVisible(false);
  };

  const handleUpdateGoal = (id, values) => {
    updateGoal({id, values});
    setIsModalVisible(false);
  };

  

  return (
    <Dashboard>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Goals Management</h1>
        <Button type="primary" onClick={showModal} className="mb-4">
          Add Goal
        </Button>
        <GoalForm
          visible={isModalVisible}
          initialValues={selectedGoal}
          onCreate={handleCreateGoal}
          onUpdate={handleUpdateGoal}
          onCancel={handleCancel}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fetchedGoals?.map((goal) => (
          <Card
          key={goal._id}
          title={goal.title}
          actions={[
         
            <CustomButton 
            style={{ color: '#001529'  }}
            type="text"
            danger
            tailWindClassName={""}
            icon={<EditOutlined />}
            onClick={() => showEditModal(goal)}
           />,
            <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => deleteGoal(goal._id)}
            okText="Yes"
            cancelText="No"
            placement="topRight"
            okButtonProps={{ style: { background: 'red', borderColor: 'red' } }}
          >
            <CustomButton 
             style={{ color: 'red'  }}
             type="danger"
             danger
             tailWindClassName={""}
             icon={<DeleteOutlined />}
            />
          </Popconfirm>
          ]}
          style={{ width: 500 }}
        >
          <p className="max-w-full break-words">{goal.description}</p>
        </Card>
          ))}
        </div>
      </div>
    </Dashboard>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchedGoals: state.goal.goals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGoals: () => dispatch(fetchGoals()),
    createGoal: (data) => dispatch(createGoal(data)),
    updateGoal: (data) => dispatch(updateGoal(data)),
    deleteGoal: (goalId) => dispatch(deleteGoal(goalId)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Okr);
