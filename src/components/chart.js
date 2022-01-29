import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
export default function Chart(props) {
  const dataSet = props.data;
  let price=[];
  let time=[];
  for(let data of dataSet) {
    price.push(data.price);
    time.push(new Date(data.date).toISOString().split("-")[1])
  }
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );

   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Montly Expenses",
      },
    },
  };
  
  const labels = time;
  
   const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: price,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      }
    ],
  };
  return (
      <div className="mr4" style={{resize:"both",overflow:"auto"}}>
          <Line options={options} data={data} />
      </div>
  )
}
