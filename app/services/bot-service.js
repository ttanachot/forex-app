let api_url = 'https://iapi.bot.or.th/Stat/Stat-ExchangeRate/DAILY_AVG_EXG_RATE_V1/';

api_url += '?start_period=2017-06-01';
api_url += '&end_period=2017-06-30';
api_url += '&currency=USD';

let config = {
    'api-key': 'U9G1L457H6DCugT7VmBaEacbHV9RX0PySO05cYaGsm'
};

let headers = new Headers(config);

let reqObj = { 
    method: 'GET',
    headers: headers
};

fetch(api_url, reqObj).then(res => {
  return res.json();
}).then(res => {
    // console.log(res.result);
    let result = res.result;
    let success = (result && result.success) ? result.success : false;
    let chart_result = null;
    if (success) {
        chart_result = result.data.data_detail.reverse();
        let mid_rate = chart_result.map(c => +c.mid_rate);
        let period = chart_result.map(c => c.period);
        console.log(mid_rate, period);

        let ctx = document.getElementById('forexChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: period,
                datasets: [{
                    label: "THB/USD in June 2017",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: mid_rate,
                }]
            },

            // Configuration options go here
            options: {
                legend: {
                    display: true,
                    labels: {
                        boxWidth: 12,
                        fontColor: 'rgb(0, 0, 0)'
                    }
                }
            }
        });
    }
});