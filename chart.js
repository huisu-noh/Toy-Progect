// json data 가져와서 chart  만들기

async function makeChart() {
  // josn file에서 자료 가지고 옴
  let response = await fetch(
    'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f6e4d3d3-c52c-4ea8-b665-968a3b17c5ea/bank.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220510%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220510T061612Z&X-Amz-Expires=86400&X-Amz-Signature=d1e7c0d8326402906d3650796cb68dbde5ef9ef4e3c839f0334b289cad313123&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22bank.json%22&x-id=GetObject'
  );
  const obj = await response.json();
  console.log(obj);

  const bankList = obj.bankList;
  console.log(bankList);
  console.log(bankList[0]);
  console.log(bankList[0].date);
  console.log(bankList[0].price);

  let beforeDate = '';
  let sum = 0;

  for (let i = 0; i < obj.bankList.length; i++) {
    sum = bankList.reduce((accumulator, currentValue) => {
      if (beforeDate !== bankList[0].date) {
        if (currentValue.income == 'in') {
          return accumulator + currentValue.price;
        } else {
          return accumulator - currentValue.price;
        }
      } else {
        return accumulator;
      }
    }, 0);
  }

  // bar data 가져오기
  let barData = [
    80000, 90000, 70000, 90000, 75000, 73000, 99000, 77000, 95000, 75000, 62000,
    80000, 95000, 79000, 82000,
  ];

  // line data 가져오기

  let lineData = [
    60000, 70000, 70000, 80000, 65000, 63000, 70000, 67000, 85000, 65000, 52000,
    70000, 85000, 69000, 72000,
  ];

  // patten datd 가져오기

  let pattenData = [56, 80, 233, 390, 46];

  // 막대 그래프 차트 만들기
  const Days = [
    '02',
    '04',
    '06',
    '08',
    '10',
    '12',
    '14',
    '16',
    '18',
    '20',
    '22',
    '24',
    '26',
    '28',
    '30',
  ];

  const scatterDataSet = {
    labels: Days,
    datasets: [
      {
        type: 'bar',
        label: 'Bar Dataset',
        data: barData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: '#38c976',
        barThickness: '2',
        options: {
          scales: {
            xAxes: [
              {
                gridLines: {
                  offsetGridLines: true,
                },
              },
            ],
          },
        },
      },
      {
        type: 'line',
        label: 'Line Dataset',
        data: lineData,
        fill: false,
        borderColor: '#FF5F00',
        pointRadius: 0,
        borderWidth: 1,
        tension: 0.3,
        borderDash: [5, 5],
      },
    ],
  };

  const configReport = {
    type: 'scatter',
    data: scatterDataSet,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  new Chart(document.getElementById('myChart'), configReport);

  // 도넛 모양 차트 만들기

  const pattenDataSet = {
    labels: ['oiling', 'health', 'eatout', 'shopping', 'mart'],
    datasets: [
      {
        data: pattenData,
        backgroundColor: [
          '#FEC229',
          '#C4C4C4',
          '#00BDB2',
          '#BD5B00',
          '#0057BD',
        ],
        cutout: 110,
      },
    ],
  };

  const configPatten = {
    type: 'doughnut',
    data: pattenDataSet,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };

  new Chart(document.getElementById('myPatten'), configPatten);
}

makeChart();
