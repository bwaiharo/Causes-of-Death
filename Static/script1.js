// d3.csv("../weekdaydeaths_csv.csv").then(function(data){
//     console.log(data);

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
    .select("body")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from weekdaydeaths_csv.csv
d3.csv("../Alabama_2007.csv").then(function (deathData) {

    // Print the Data
    console.log(deathData);
    // const groupBy = key => array =>
    //     array.reduce((objectsByKeyValue, obj) => {
    //         const value = obj[key];
    //         objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    //         return objectsByKeyValue;
    //     }, {});
    // const state = groupBy('State')
    // let databystate = JSON.stringify({
    //         stategroup: state(deathData)
    //     }, null, 2);
    //     console.log(databystate)
        


        // Cast value to a number for each piece of Data
       deathData.forEach(function (data) {
            data.Weekday = data.Weekday;
            data.State = data.State;
            data.Deaths = data.Deaths;
           

            });
            var xBandScale = d3.scaleBand()
                .domain(deathData.map(d => d.Weekday))
                .range([0, chartWidth])
                .padding(0.1);

            // Create a linear scale for the vertical axis.
            var yLinearScale = d3.scaleLinear()
                .domain([2800, d3.max(deathData, d => d.Deaths)])
                .range([chartHeight, 0]);

            var bottomAxis = d3.axisBottom(xBandScale);
            var leftAxis = d3.axisLeft(yLinearScale).ticks(7);

            // Append two SVG group elements to the chartGroup area,
            // and create the bottom and left axes inside of them
            chartGroup.append("g")
                .call(leftAxis);

            chartGroup.append("g")
                .attr("transform", `translate(0, ${chartHeight})`)
                .call(bottomAxis);

            // Create one SVG rectangle per piece of tvData
            // Use the linear and band scales to position each rectangle within the chart
            chartGroup.selectAll(".bar")
                .data(deathData)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", d => xBandScale(d.Weekday))
                .attr("y", d => yLinearScale(d.Deaths))
                .attr("width", xBandScale.bandwidth())
                .attr("height", d => chartHeight - yLinearScale(d.Deaths));

        }).catch(function (error) {
            console.log(error);
        });