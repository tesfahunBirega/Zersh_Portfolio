import Dashboard from "../commons/Dashboard";
import { Button, Collapse, Form, Input } from 'antd';
import { MonthlyGoalComponent } from "../components/Performance/MonthlyGoal";
import { useState } from "react";

const { Panel } = Collapse;

const QuarterlyGoalComponent = ({ goals }) => {
  return (
    <Collapse accordion>
      {goals.map((goal, index) => (
        <Panel header={`Quarter ${index + 1}`} key={index}>
          <MonthlyGoalComponent goals={goal} />
        </Panel>
      ))}
    </Collapse>
  );
};

const HigherGoalComponent = ({ goal }) => {
  return (
    <div>
      <h2>Yearly Higher Goal: {goal}</h2>
    </div>
  );
};

function ProjectsDashboard() {
  
  const [dailyGoal, setDailyGoal] = useState("");
  const [weeklyGoals, setWeeklyGoals] = useState([["", "", "", ""]]);
  const [monthlyGoals, setMonthlyGoals] = useState([weeklyGoals]);
  const [quarterlyGoals, setQuarterlyGoals] = useState([monthlyGoals]);
  const [yearlyGoal, setYearlyGoal] = useState("Increase user engagement on our website by 30% compared to last year.");

  const handleAddDailyGoal = (weekIndex) => {
    const newWeeklyGoals = weeklyGoals.map((week, wIndex) => {
      if (wIndex === weekIndex) {
        return [...week, ""];
      }
      return week;
    });
    setWeeklyGoals(newWeeklyGoals);
  };

  const handleAddWeeklyGoal = (monthIndex) => {
    const newMonthlyGoals = monthlyGoals.map((month, mIndex) => {
      if (mIndex === monthIndex) {
        return [...month, [...weeklyGoals[0]]];
      }
      return month;
    });
    setMonthlyGoals(newMonthlyGoals);
  };

  const handleAddMonthlyGoal = (quarterIndex) => {
    const newQuarterlyGoals = quarterlyGoals.map((quarter, qIndex) => {
      if (qIndex === quarterIndex) {
        return [...quarter, [...monthlyGoals[0]]];
      }
      return quarter;
    });
    setQuarterlyGoals(newQuarterlyGoals);
  };

  const handleAddQuarterlyGoal = () => {
    setQuarterlyGoals([...quarterlyGoals, [...quarterlyGoals[0]]]);
  };

  const handleRemoveDailyGoal = (weekIndex, dayIndex) => {
    const updatedWeeklyGoals = weeklyGoals.map((week, wIndex) => {
      if (wIndex === weekIndex) {
        return week.filter((_, dIndex) => dIndex !== dayIndex);
      }
      return week;
    });
    setWeeklyGoals(updatedWeeklyGoals);
  };

  const handleSaveDailyGoal = (weekIndex, dayIndex, value) => {
    const updatedWeeklyGoals = weeklyGoals.map((week, wIndex) => {
      if (wIndex === weekIndex) {
        return week.map((day, dIndex) => {
          if (dIndex === dayIndex) {
            return value;
          }
          return day;
        });
      }
      return week;
    });
    setWeeklyGoals(updatedWeeklyGoals);
  };

  const handleYearlyGoalChange = (e) => {
    setYearlyGoal(e.target.value);
  };


  return (
    <Dashboard>

<div className="flex justify-end">
<Button styles={{className:"bg-gray-400"}} className="" type="primary" onClick={handleAddQuarterlyGoal}>Add Quarterly Goal</Button>

</div>

<div style={{ padding: '20px' }}>
      <HigherGoalComponent goal={yearlyGoal} />
      <QuarterlyGoalComponent
        goals={quarterlyGoals}
        onAddMonthly={handleAddMonthlyGoal}
        onRemoveMonthly={() => setQuarterlyGoals(quarterlyGoals.slice(0, -1))}
        onAddWeeklyMonthly={handleAddWeeklyGoal}
        onRemoveWeeklyMonthly={(monthIndex) => setMonthlyGoals(monthlyGoals.filter((_, index) => index !== monthIndex))}
        onAddDailyMonthly={handleAddDailyGoal}
        onRemoveDailyMonthly={handleRemoveDailyGoal}
        onSaveDailyMonthly={handleSaveDailyGoal}
      />
      <Form>
        <Form.Item label="Yearly Higher Goal">
          <Input value={yearlyGoal} onChange={handleYearlyGoalChange} />
        </Form.Item>
      </Form>
    </div>
    </Dashboard>
  );
}

export default ProjectsDashboard;
