import DoughnutChart from './DoughnutChart';

function Chart() {
  const chartData = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Test Dataset',
        data: [300, 50, 100, 200, 20],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        hoverOffset: 4
      }
    ]
  };

  return (
    <div>
      <DoughnutChart data={chartData} />
    </div>
  )
}

export default Chart;