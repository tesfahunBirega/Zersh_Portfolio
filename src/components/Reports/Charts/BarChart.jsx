// BarChartComponent.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = ({ data }) => {
    const totalTasks = data.length;
    const completedTasks = data.filter(task => task.status === 'completed').length;

    const chartData = {
        labels: ['Total Tasks', 'Completed Tasks'],
        datasets: [
            {
                label: 'Tasks',
                data: [totalTasks, completedTasks],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)']
            }
        ]
    };

    return (
        <div>
            <h2>Total vs Completed Tasks</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default BarChartComponent;
