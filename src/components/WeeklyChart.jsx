import './component.css';
import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const WeeklyChart = ({ journals }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (journals.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    // Map sentiment labels to numeric values
    const sentimentMap = {
      POSITIVE: 1,
      NEUTRAL: 0,
      NEGATIVE: -1,
    };

    // Extract sentiment scores and dates
    const dates = journals.map((entry) => entry.formatted_date).reverse();

    // Map sentiment scores to y-axis values with a linear scaling
    const scores = journals.map((entry) => entry.sentiment_score * sentimentMap[entry.sentiment_label] || 0).reverse();

    // Remove the last 5 characters from the date string
    const formattedDates = dates.map((date) => date.substring(0, date.length - 6));

    // Create a line chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: formattedDates,
        datasets: [
          {
            label: 'Your 7 Days',
            data: scores,
            borderColor: (context) => (context.dataset.data[context.dataIndex] >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'),
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: 'white',
            },
            ticks: {
              color: 'white',
            },
          },
          y: {
            beginAtZero: true,
            min: -2.0, 
            max: 2.0,  
            stepSize: 0.2, 
            grid: {
              color: 'white',
            },
            ticks: {
              color: 'white',
              display: false, 
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'white',
            },
          },
        },
      },
    });
  }, [journals]);

  return (
    <div className="chart-container" style={{ position: 'relative', height: '50vh', width: '50vw' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

WeeklyChart.propTypes = {
  journals: PropTypes.any.isRequired,
};

export default WeeklyChart;
