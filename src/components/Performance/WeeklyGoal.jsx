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