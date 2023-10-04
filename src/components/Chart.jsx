import React from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
);

const Chart = ({ arr = [], currency, days }) => {
    const price = [];
    const date = [];
     console.log("arr: ", arr)

      if (arr.prices && arr.prices.length > 0) {
        for (var i = 0; i < arr.prices.length; i++) {

            // if(days==="24h") date.push(new Date(arr[i][0]).toLocaleDateString());
        
             date.push(new Date(arr.prices[i][0]).toLocaleTimeString());
            price.push(arr.prices[i][1]);
           
        }
    }

    console.log(price);
    return (
        <Line options={{
            responsive: true
        }}
            data={{
                labels: date,
                datasets: [{
                    label: `price in ${currency}`,
                    data: price, borderColor: "rgb(225,99,132)",
                    backgroundColor: "rgba(225,99,132,0.5)"
                }]
            }} />
    );
}

export default Chart;
