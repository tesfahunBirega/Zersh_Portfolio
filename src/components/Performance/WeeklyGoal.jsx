import { Collapse } from "antd";
import { DailyGoalComponent } from "./DailyGoal";


const { Panel } = Collapse;

export const WeeklyGoalComponent = ({ goals }) => {
    return (
      <Collapse accordion>
        {goals.map((goal, index) => (
          <Panel header={`Week ${index + 1}`} key={index}>
            {goal.map((dailyGoal, dailyIndex) => (
              <DailyGoalComponent key={dailyIndex} goal={dailyGoal} />
            ))}
          </Panel>
        ))}
      </Collapse>
    );
  };