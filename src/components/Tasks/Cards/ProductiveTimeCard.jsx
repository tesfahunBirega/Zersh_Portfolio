import { Card } from "antd";

export const ProductiveTimeCard = ({productiveTime}) => {

    return (
      <Card title={`Productive Time`} style={{ width: 300 }}>
        <div className="text-sm font-bold">
         {productiveTime} seconds
        </div>
      </Card>
    );
  };