import React from 'react';
import { Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined, CheckOutlined } from '@ant-design/icons';

const Digit = ({ value }) => (
  <span style={{
    position: 'relative',
    flex: '0 0 25px',
    backgroundColor: '#404549',
    borderRadius: '5px',
    padding: '12px 16px',
    color: 'white',
    marginRight: '2px'
  }}>
    {value}
  </span>
);

const TimeButton = ({ status, start, pause, resume, reset, complete, hours, minutes, seconds, isRunning }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: '12px',
        marginBottom: '5px',
        display: 'flex'
      }}>
        <Digit value={hours} />
        <span className='flex justify-center items-center text-white px-1' style={{  fontSize: '24px',}} >:</span>
        <Digit value={minutes} />
        <span className='flex justify-center items-center text-white px-1' style={{  fontSize: '24px',}} >:</span>
        <Digit value={seconds} />
      </div>

      <Button
        type="primary"
        icon={<PlayCircleOutlined />}
        className="mr-2"
        onClick={start}
        disabled={isRunning || status !== 4}
        style={{ marginRight: '8px' }}
      >
        Start
      </Button>
      <Button
        type="primary"
        icon={<PauseCircleOutlined />}
        className="mr-2"
        onClick={pause}
        disabled={!isRunning || status !== 0}
        style={{ marginRight: '8px' }}
      >
        Pause
      </Button>
      <Button
        type="primary"
        icon={<PlayCircleOutlined />}
        className="mr-2"
        onClick={resume}
        disabled={isRunning || status !== 1}
        style={{ marginRight: '8px' }}
      >
        Resume
      </Button>
      <Button
        type="primary"
        icon={<ReloadOutlined />}
        className="mr-2"
        onClick={reset}
        disabled={status === 0 || status === 4}
        style={{ marginRight: '8px' }}
      >
        Reset
      </Button>
      <Button
        type="primary"
        icon={<CheckOutlined />}
        onClick={complete}
        disabled={status === 'completed'}
      >
        Complete
      </Button>
    </div>
  );
};

export default TimeButton;
