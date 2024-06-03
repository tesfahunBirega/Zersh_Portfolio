import React from 'react';
import { Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined } from '@ant-design/icons';

const TimeButton1 = ({ status, start, pause, resume, reset }) => {
  console.log(status ,"status");
  return (
    <div>
      {status === 0 ? (
        <Button type="primary" className="mr-2" onClick={pause} icon={<PauseCircleOutlined size={24} />}>
          Pause
        </Button>
      ) : (
        ""
      )}

      {status === 1 ? (
        <div>
          <Button type="primary" className="mr-2" onClick={resume} icon={<PlayCircleOutlined size={24} />}>
            Resume
          </Button>
          <Button type="primary" className="mr-2" onClick={reset} icon={<ReloadOutlined size={24} />}>
            Reset
          </Button>
        </div>
      ) : (
        ""
      )}

      {(status === 2 || status === 3 || status === 4) ? (
        <Button type="primary" className="mr-2" onClick={start} icon={<PlayCircleOutlined size={24} />}>
          Start
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default TimeButton1;
