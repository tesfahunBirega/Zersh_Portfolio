import Dashboard from "../commons/Dashboard";
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, RadialBarChart, RadialBar,
  CartesianGrid, ComposedChart, Cell, ResponsiveContainer
} from 'recharts';
import Plot from "react-plotly.js";
import BubbleChart from "../components/Reports/Charts/BubbleChart";
import DoughnutChart from "../components/Reports/Charts/DoughnutChart";
import BarChartComponent from "../components/Reports/Charts/BarChart";
import LineChartComponent from "../components/Reports/Charts/LineChart";

function Reports() {
  const [tasks, setTasks] = useState([]);
    useEffect(() => {
    axios.get('https://nahom-back.onrender.com/api/v1/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);
  const taskStatusData = [
    { name: 'Completed', value: tasks.filter(task => task.status === 'completed').length },
    { name: 'Active', value: tasks.filter(task => task.status === 'active').length },
    { name: 'Paused', value: tasks.filter(task => task.status === 'paused').length },
    { name: 'Created', value: tasks.filter(task => task.status === 'created').length },
  ];

  const productiveTime = tasks.reduce((acc, task) => acc + task.productiveTime, 0);
  const wastedTime = tasks.reduce((acc, task) => acc + task.wastedTime, 0);

  const timeData = [
    { name: 'Productive Time', value: productiveTime },
    { name: 'Wasted Time', value: wastedTime },
  ];

  // Prepare data for task duration chart
  const durationData = tasks.map(task => ({
    name: task.name,
    duration: task.duration / 60,
  }));

  // Calculate tasks by day
  const tasksByDay = tasks.reduce((acc, task) => {
    acc[task.day] = (acc[task.day] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for tasks by day chart
  const tasksByDayData = Object.keys(tasksByDay).map(day => ({
    day: parseInt(day, 10),
    count: tasksByDay[day],
  }));

  // Calculate task achievement based on day
  const taskAchievementData = tasksByDayData.map(data => ({
    day: data.day,
    achievement: (data.count / tasks.length) * 100*10, // Percentage of tasks completed
  }));

  console.log(tasksByDay,tasksByDayData ,taskAchievementData ,"taskAchievementData" );

  // Prepare data for bubble chart
  const bubbleData = tasks.map(task => ({
    name: task.name,
    x: task.day,
    y: task.duration / 60,
    z: task.productiveTime + task.wastedTime,
  }));
  console.log(bubbleData,"bubbleData");

  // Prepare data for stacked bar chart
  const stackedBarData = tasks.map(task => ({
    name: task.name,
    productiveTime: task.productiveTime,
    wastedTime: task.wastedTime,
  }));

  const data = [{
    x: bubbleData.map(item => item.x),
    y: bubbleData.map(item => item.y),
    mode: 'markers',
    marker: {
      size: bubbleData.map(item => item.z), // Size based on 'z' value
      color: bubbleData.map(item => item.z), // Color based on 'z' value
      colorscale: 'Viridis', // Color scale
    },
    text: bubbleData.map(item => item.name), // Text shown on hover
  }];

  const layout = {
    title: 'Bubble Chart',
    xaxis: { title: 'Day' },
    yaxis: { title: 'Duration (hours)' },
  };


  return (
    <Dashboard>
      <div className={`container mx-auto p-4 ${  'dark:bg-gray-900 dark:text-white texhte bg-white text-black'}`}>
        <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className={`p-4 rounded shadow ${  'dark:bg-gray-800 bg-white'}`}>
            <h2 className="text-lg font-semibold mb-2">Task Status Distribution</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie data={taskStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={`p-4 rounded shadow ${  'dark:bg-gray-800 bg-white'}`}>
            <h2 className="text-lg font-semibold mb-2">Time Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={`p-4 rounded shadow ${  'dark:bg-gray-800 bg-white'}`}>
            <h2 className="text-lg font-semibold mb-2">Task Duration</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={durationData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="duration" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={`p-4 rounded shadow ${  'dark:bg-gray-800 bg-white'}`}>
            <h2 className="text-lg font-semibold mb-2">Tasks by Day</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={tasksByDayData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={`p-4 rounded shadow ${  'dark:bg-gray-800 bg-white'}`}>
            <h2 className="text-lg font-semibold mb-2">Productive vs Wasted Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart innerRadius="10%" outerRadius="80%" data={timeData}>
                <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="value" />
                <Tooltip />
                <Legend />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          <div className={`p-4 rounded shadow ${  'dark:bg-gray-800 bg-white'}`}>
            <h2 className="text-lg font-semibold mb-2">Task Achievement by Day (%)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={taskAchievementData}>
                <XAxis dataKey="day" />
                <YAxis type="number" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="achievement" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={`p-4 rounded shadow ${  'dark:bg-gray-800 bg-white'}`}>
            <h2 className="text-lg font-semibold mb-2">Stacked Bar Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={stackedBarData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="productiveTime" stackId="a" fill="#82ca9d" />
                <Bar dataKey="wastedTime" stackId="a" fill="#8884d8" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className={`p-4 rounded shadow ${  'dark:bg-gray-800 bg-white'}`}>
            <h2 className="text-lg font-semibold mb-2">Bubble Chart</h2>
            <ResponsiveContainer width="100%" height={"100%"}>
              
            <BubbleChart data={tasks} />
            </ResponsiveContainer>
          </div>

          <div className={`p-4 rounded shadow ${  'dark:bg-gray-800 bg-white'}`}>
            <h2 className="text-lg font-semibold mb-2">Bubble Chart</h2>
            <ResponsiveContainer width="100%" height={"100%"}>
              
            <BarChartComponent data={tasks} />

            </ResponsiveContainer>
          </div>

          <div className={`p-4 rounded shadow ${  'dark:bg-gray-800 bg-white'}`}>
            <h2 className="text-lg font-semibold mb-2">Bubble Chart</h2>
            <ResponsiveContainer width="100%" height={"100%"}>
              
            <LineChartComponent data={tasks} />


            </ResponsiveContainer>
          </div>

          <div className={`p-4 rounded shadow ${  'dark:bg-gray-800 bg-white'}`}>
            <h2 className="text-lg font-semibold mb-2">Bubble Chart</h2>
            <ResponsiveContainer width="100%" height={"100%"}>
              

            <DoughnutChart data={tasks} />

            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default Reports;

