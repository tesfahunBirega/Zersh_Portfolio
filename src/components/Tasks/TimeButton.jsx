import React from 'react';
import { Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined, CheckOutlined } from '@ant-design/icons';

const TimeButton = ({ status, start, pause, resume, reset, complete, hours, minutes, seconds, isRunning }) => {
  return (
    <div>
      <div>{`${hours}:${minutes}:${seconds}`}</div>
      <Button type="primary" className="mr-2" onClick={start} disabled={isRunning || status !== 4}>
        Start
      </Button>
      <Button type="primary" className="mr-2" onClick={pause} disabled={!isRunning || status !== 0}>
        Pause
      </Button>
      <Button type="primary" className="mr-2" onClick={resume} disabled={isRunning || status !== 1}>
        Resume
      </Button>
      <Button type="primary" className="mr-2" onClick={reset} disabled={status === 0 || status === 4}>
        Reset
      </Button>
      <Button type="primary" onClick={complete} disabled={status === 'completed'}>
        <CheckOutlined /> Complete
      </Button>
    </div>
  );
};

export default TimeButton;
