
var url = "/jsonData";


d3.json(url).then(function(response) {

    let data = [response.race_f]
    let data2 = [response.race_m]
    let rd = []
    let md = []
    let fd = []

    data.forEach(e => rd.push(e.race))
    data2.forEach(e => md.push(e.deaths_m))
    data.forEach(e => fd.push(e.deaths_f))
    console.log(rd[0])
  
      var options = {
        series: md[0],
        chart: {
          width: 1000,
          type: 'pie',
        },
        labels: rd[0],
        responsive: [{
          breakpoint: 1000,
          options: {
            chart: {
              width: 1000
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };

      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    });

      d3.json(url).then(function(response) {

        let data = [response.race_f]
        let data2 = [response.race_m]
        let rd = []
        let md = []
        let fd = []
    
        data.forEach(e => rd.push(e.race))
        data2.forEach(e => md.push(e.deaths_m))
        data.forEach(e => fd.push(e.deaths_f))
        console.log(rd[0])




      var options2 = {
        series: fd[0],
        chart: {
          width: 600,
          type: 'pie',
        },
        labels: rd[0],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 600
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };

      var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
      
      chart2.render();




});
