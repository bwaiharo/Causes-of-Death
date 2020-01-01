// Plot the default route once the page loads
function buildPlot() {
  /* data route */
var url = "/jsonData";
d3.json(url).then(function(response) {
  console.log(response);
  let female_totals = [response.female_by_year]
  console.log(female_totals[0]['year']);
  var trace1 = {
      x: female_totals[0]['year'],
      y: female_totals[0]['deaths'],
      type: "bar"
    };
    
  
 
  var data = [trace1];
  // console.log(data);
  var layout = {
    title: "Female: Number of Deaths",
    xaxis: {
      title: "Years"
    },
    yaxis: {
      title: "Deaths"
    }
  };
  Plotly.newPlot("bar", data, layout);
});
}
buildPlot();