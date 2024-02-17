import './component.css';
import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const WeeklyChart = ({ journals }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (journals.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    // Extract sentiment scores and dates
    const dates = journals.map((entry) => entry.formatted_date).reverse();
    const scores = journals.map((entry) => entry.sentiment_score).reverse();

    // Create a line chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Sentiment Score',
            data: scores,
            borderColor: 'white',
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
            max: 1,
            grid: {
              color: 'white',
            },
            ticks: {
              color: 'white',
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
