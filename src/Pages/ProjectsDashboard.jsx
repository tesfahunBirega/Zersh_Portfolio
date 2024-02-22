import Dashboard from "../commons/Dashboard";
import { Button, Collapse } from 'antd';
import { MonthlyGoalComponent } from "../components/Performance/MonthlyGoal";

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
  const yearlyGoal = "Increase user engagement on our website by 30% compared to last year.";

  const quarterlyGoals = [
    [
      [
        ["Improve website navigation"],
        ["Update website content and add new features"],
        ["Conduct user testing and gather feedback"]
      ],
      [
        ["Enhance social media presence"],
        ["Create engaging content"],
        ["Analyze social media metrics"]
      ],
      [
        ["Implement personalized recommendations"],
        ["Add user customization features"],
        ["Monitor user engagement metrics"]
      ],
      [
        ["Launch targeted email campaigns"],
        ["Create promotional offers"],
        ["Analyze email campaign performance"]
      ]
    ]
  ];


  return (
    <Dashboard>
       <div style={{ padding: '20px' }}>
      <HigherGoalComponent goal={yearlyGoal} />
      <QuarterlyGoalComponent goals={quarterlyGoals} />
    </div>
    </Dashboard>
  );
}

export default ProjectsDashboard;
