import './component.css'
import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import PropTypes from "prop-types";

const WeeklyChart = ({ journals }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (journals.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    // Group data by week and calculate average sentiment scores
    const groupDataByWeek = () => {
      const groupedData = {};

      journals.forEach(entry => {
        const week = entry.formatted_date.split(', ')[1]; // Extract the week part
        if (!groupedData[week]) {
          groupedData[week] = { count: 0, totalScore: 0 };
        }

        groupedData[week].count++;
        groupedData[week].totalScore += entry.sentiment_score;
      });

      const weeklyAverages = {};
      Object.keys(groupedData).forEach(week => {
        weeklyAverages[week] = groupedData[week].totalScore / groupedData[week].count;
      });

      return weeklyAverages;
    };

    // Get weeks and sentiment scores
    const weeklyData = groupDataByWeek();
    const weeks = Object.keys(weeklyData);
    const scores = Object.values(weeklyData);

    // Create a line chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: weeks,
        datasets: [
          {
            label: 'Weekly Sentiment Score',
            data: scores,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 1, // Assuming sentiment scores are between 0 and 1
          },
        },
      },
    });
  }, [journals]);

  return <div className="chart-container" style={{position: 'relative', height:'45vh', width:'45vw'}}><canvas ref={chartRef}></canvas></div>;
}

WeeklyChart.propTypes = {
    journals: PropTypes.any.isRequired
};

export default WeeklyChart;
