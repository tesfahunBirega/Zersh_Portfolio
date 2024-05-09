import { Card } from "antd";

export const WastedTimeCard = ({wastedTime}) => {

    return (
      <Card title={`Wasted Time`} style={{ width: 300 }}>
        <div className="text-sm font-bold">
         {wastedTime} seconds
        </div>
      </Card>
    );
  };