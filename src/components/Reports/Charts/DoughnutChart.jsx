// DoughnutChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, ArcElement, Title, Tooltip, Legend);

const DoughnutChart = ({ data }) => {
    const productiveTime = data.reduce((sum, task) => sum + task.productiveTime, 0);
    const wastedTime = data.reduce((sum, task) => sum + task.wastedTime, 0);

    const chartData = {
        labels: ['Productive Time', 'Wasted Time'],
        datasets: [
            {
                label: 'Time',
                data: [productiveTime, wastedTime],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)']
            }
        ]
    };

    return (
        <div>
            <h2>Productive Time vs Wasted Time</h2>
            <Doughnut data={chartData} />
        </div>
    );
};

export default DoughnutChart;
