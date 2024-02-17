import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import PropTypes from "prop-types";

const PieChart = ({ keywords }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (keywords.length === 0) return;
    console.log('', keywords);

    const ctx = chartRef.current.getContext('2d');

    // Calculate sizes for the pie chart
    const sizes = keywords.map(() => 100 / keywords.length);

    // Create a pie chart
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: keywords,
        datasets: [{
          data: sizes,
          backgroundColor: ['#ff9999', '#66b3ff', '#99ff99'], // Customize colors as needed
        }],
      },
    });
  }, [keywords]);

  return <div className="chart-container" style={{position: 'relative', height:'45vh', width:'45vw'}}><canvas ref={chartRef}></canvas></div>;
}

PieChart.propTypes = {
    keywords: PropTypes.any.isRequired,
};
export default PieChart;
