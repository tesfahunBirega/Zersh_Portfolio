import { Card } from "antd";

export const CurrentDayOfYearCard = ({currentDayOfYear}) => {

    return (
      <Card title={`Today`} style={{ width: 300 }}>
        <div className="text-sm font-bold">
        Day {currentDayOfYear} of the Year
        </div>
      </Card>
    );
  };