import { Collapse } from "antd";
import { WeeklyGoalComponent } from "./WeeklyGoal";

const { Panel } = Collapse;


export const MonthlyGoalComponent = ({ goals }) => {
    return (
      <Collapse accordion>
        {goals.map((goal, index) => (
          <Panel header={`Month ${index + 1}`} key={index}>
            <WeeklyGoalComponent goals={goal} />
          </Panel>
        ))}
      </Collapse>
    );
  };
  