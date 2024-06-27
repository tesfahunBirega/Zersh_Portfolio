// LineChartComponent.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const LineChartComponent = ({ data }) => {
    const averageDuration = data.reduce((sum, task) => sum + task.duration, 0) / data.length;
    const averageBatches = data.reduce((sum, task) => sum + task.batches, 0) / data.length;

    const chartData = {
        labels: ['Average Duration', 'Average Batches'],
        datasets: [
            {
                label: 'Average',
                data: [averageDuration, averageBatches],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)'
            }
        ]
    };

    return (
        <div>
            <h2>Average Duration and Batches per Task</h2>
            <Line data={chartData} />
        </div>
    );
};

export default LineChartComponent;
