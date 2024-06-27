// BubbleChart.js
import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const BubbleChart = ({ data }) => {
    const chartData = {
        datasets: data.map((task, index) => ({
            label: task.name,
            data: [{
                x: task.day || index,
                y: task.duration /60,
                r: task.batches * 5 
            }],
            backgroundColor: task.status === 'completed' ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 99, 132, 0.6)'
        }))
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Duration (seconds)'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: (${context.raw.x}, ${context.raw.y}) - Batches: ${context.raw.r / 5}`;
                    }
                }
            }
        }
    };

    return (
        <div>
            <h2>Task Bubble Chart</h2>
            <Bubble data={chartData} options={options} />
        </div>
    );
};

export default BubbleChart;
