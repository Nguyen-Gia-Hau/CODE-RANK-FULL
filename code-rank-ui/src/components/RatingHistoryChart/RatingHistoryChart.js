
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './RatingHistoryChart.css'
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const RatingHistoryChart = () => {
  const data = {
    labels: ['Oct 23', 'Oct 24', 'Oct 25', 'Oct 26', 'Oct 27', 'Oct 28', 'Oct 29', 'Oct 30', 'Oct 31', 'Nov 1', 'Nov 2', 'Nov 3', 'Nov 4', 'Nov 5'],
    datasets: [
      {
        label: 'Rating',
        data: [0, 900, 1100, 1500, 2100, 2500, 2900, 3100, 2100, 2500, 2900, 3100, 100, 3500, 3900, 4100, 4200],
        borderColor: '#DC143C', // Line color (Crimson)
        backgroundColor: '#DC143C', // Circle color
        fill: false,
        tension: 0.1,
        pointRadius: 5,
        pointBackgroundColor: '#DC143C',
        pointBorderColor: '#fff',
        pointHoverRadius: 7,
      },
    ],
  };

  // Define the plugin to add soft background colors for rank ranges
  const backgroundPlugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart) => {
      const { ctx, chartArea: { left, right }, scales: { y } } = chart;

      // Function to draw solid color backgrounds for y-axis ranges
      const drawSolidBackground = (startYValue, endYValue, color) => {
        const startPixel = y.getPixelForValue(startYValue);
        const endPixel = y.getPixelForValue(endYValue);
        ctx.fillStyle = color;
        ctx.fillRect(left, startPixel, right - left, endPixel - startPixel);
      };

      // Lighter colors for the rank ranges
      drawSolidBackground(0, 1000, '#D3D3D3');  // Light Gray
      drawSolidBackground(1000, 2000, '#90EE90');  // Light Green
      drawSolidBackground(2000, 3000, '#ADD8E6');  // Light Blue
      drawSolidBackground(3000, 4000, '#FFD700');  // Light Orange (Gold)
      drawSolidBackground(4000, 5000, '#FFB6C1');  // Light Red (Light Pink)
    },
  };

  // Chart options
  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 5000,
        ticks: {
          stepSize: 1000, // y-axis steps
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className='chart-container'>
      <h2>Rating History</h2>
      <Line data={data} options={options} plugins={[backgroundPlugin]} />
    </div>
  );
};

export default RatingHistoryChart;

