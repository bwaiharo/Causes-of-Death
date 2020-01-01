// var margin = { top: 10, right: 30, bottom: 30, left: 60 },
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;
// // append the svg object to the body of the page
// var svg = d3.select("#my_dataviz")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");
// var request = new XMLHttpRequest()
// request.open('GET', 'https://data.cityofnewyork.us/resource/jb7j-dtam.json', true)
// request.onload = function (d) {
//     return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value }
// },

//     // Now I can use this dataset:
//     function (data) {

//         var x = d3.scaleTime()
//             .domain(d3.extent(data, function (d) { return d.date; }))
//             .range([0, width]);
//         svg.append("g")
//             .attr("transform", "translate(0," + height + ")")
//             .call(d3.axisBottom(x));
//         // Add Y axis
//         var y = d3.scaleLinear()
//             .domain([0, d3.max(data, function (d) { return +d.value; })])
//             .range([height, 0]);
//         svg.append("g")
//             .call(d3.axisLeft(y));
//         // Add the line
//         svg.append("path")
//             .datum(data)
//             .attr("fill", "none")
//             .attr("stroke", "steelblue")
//             .attr("stroke-width", 1.5)
//             .attr("d", d3.line()
//                 .x(function (d) { return x(d.date) })
//                 .y(function (d) { return y(d.value) })
//             )
//         if (this.status === 200) {
//             //return server response as an object with JSON.parse
//             console.log(JSON.parse(this.responseText));
//         }
//         // Begin accessing JSON data here
//     }
//     request.send()
var svgWidth = 960;
var svgHeight = 500;
// Define the chart's margins as an object
var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
};
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;
// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
let request = new XMLHttpRequest;
request.open('GET', 'https://data.cityofnewyork.us/resource/jb7j-dtam.json', true)
request.onload = function () {
    let data = JSON.parse(this.response);
    console.log(data);
    if (this.status === 200) {
        data.forEach(function (d) {
            year = (d.year);
            deaths = d.deaths;
            console.log(d.deaths);
        //     var xTimeScale = d3.scaleTime()
        //     .range([0, chartWidth])
        //     .domain(d3.extent(d.year));
        // var yLinearScale = d3.scaleLinear()
        //     .range([chartHeight, 0])
        //     .domain([0, d3.max(d.race_ethnicity)]);
        // var bottomAxis = d3.axisBottom(xTimeScale);
        // var leftAxis = d3.axisLeft(yLinearScale);
        // var drawLine = d3
        //     .line()
        //     .x(data => xTimeScale(d.year))
        //     .y(data => yLinearScale(d.race_ethnicity));
        // chartGroup.append("path")
        //     // The drawLine function returns the instructions for creating the line for milesData
        //     .attr("d", drawLine(data))
        //     .classed("line", true);
        // chartGroup.append("g")
        //     .classed("axis", true)
        //     .call(leftAxis);
        // chartGroup.append("g")
        //     .classed("axis", true)
        //     .attr("transform", "translate(0, " + chartHeight + ")")
        //     .call(bottomAxis);
          
        });
    };
};
    request.send();



