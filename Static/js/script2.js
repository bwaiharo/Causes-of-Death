

function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
        let key = obj[property]
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(obj)
        return acc
    }, {})
}
var dropdown = function (states) {
    var selector = d3.select("#selDataset")
    states.forEach(state => {
        selector.append("option")
            .text(state)
            .property("value", state);
    });
    optionChanged(states[1])
}
function optionChanged(state) {
    createchart(state);
}
let data;
d3.csv("../weekdaydeaths_csv.csv").then(function (data1) {
    console.log(data1);
    let allstates = data1.map(obj => obj.State)
    let states = [];
    for (let i = 0; i < allstates.length; i++) {
        if (!states.includes(allstates[i])) {
            states.push(allstates[i]);
        }
    }
    console.log(states);
    data = groupBy(data1, "State");
    console.log(data);
    dropdown(states);
});

var createchart = function (state) {
    var svg = d3.select("svg")
    svg.html("")
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    // var color = d3.scaleOrdinal(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0","#660000", "#ffcc7d", "#707d84", ]);
    // var color = d3.scaleOrdinal(d3.schemeCategory10);
    var color = d3.scaleOrdinal(d3.schemeSet3);
    var x = d3.scaleBand().rangeRound([0, width])
        .padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var ymaxdomain = d3.max(data[state], function (d) {
        return d.Deaths;

    });
    console.log(ymaxdomain);
    x.domain(data[state].map(function (d) {
        return d.Weekday
    }));
    y.domain([ymaxdomain / 2, ymaxdomain * 1.05]);

    var x1 = d3.scaleBand()
        .rangeRound([0, x.bandwidth()])
        .padding(0.05)
        .domain(data[state].map(function (d) {
            return d.Year;
        }));

    color.domain(data[state].map(function (d) {
        return d.Year;
    }));

    var groups = g.selectAll(null)
        .data(data[state])
        .enter()
        .append("g")
        .attr("transform", function (d) {
            return "translate(" + x(d.Weekday) + ",0)";
        })

    var bars = groups.selectAll(null)
        .data(function (d) {
            return [d]
        })
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return x1(d.Year)
        })
        .attr("y", function (d) {
            return y(d.Deaths);
        })
        .attr("width", x1.bandwidth())
        .attr("height", function (d) {
            return height - y(d.Deaths);
        })
        .attr("fill", function (d) {
            return color(d.Year)
        })

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "-2em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Number of Deaths");
    //Legend
  var legend = svg.selectAll(".legend")
  .data(data[Weekday].map(function(d) { return d.Year; }).reverse())
.enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
  .style("opacity","0");

legend.append("rect")
  .attr("x", width + 40)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", function(d) { return color(d); });

legend.append("text")
  .attr("x", width + 36)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .text(function(d) {return d; });

legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");
};

