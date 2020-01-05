var url = "/jsonData";
  

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
function creategraphs(state){
optionChanged(state);
optionChanged1(state);
};
let data;
d3.json(url).then(function(response) {
// d3.csv("weekdaydeaths_csv.csv").then(function (data1) {
    
    let data1 = response.weekday_deaths
    console.log(data1)
    let allstates = data1.map(obj => obj.State)
    let states = [];
    for (let i = 0; i < allstates.length; i++) {
        if (!states.includes(allstates[i])) {
            states.push(allstates[i]);
        }
    }
    // console.log(states);
    data = groupBy(data1, "State");
    // console.log(data);
    dropdown(states);
});

var createchart = function (state) {
    var svg = d3.select("#svg1")
    svg.html("")
    var margin = {
        top: 20,
        right: 30,
        bottom: 30,
        left: 50
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
    // console.log(ymaxdomain);
    x.domain(data[state].map(function (d) {
        return d.Weekday
    }));
    y.domain([ymaxdomain / 1.7, ymaxdomain * 1.05]);

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
    var allyears = [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]
    var legend = svg.selectAll(".legend")
        .data(allyears.map(function (d) { return d; }).reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })
        .style("opacity", "0")
        .style("font-size", 8);

    legend.append("rect")
        .attr("x", width + 40)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d) { return color(d); });

    legend.append("text")
        .attr("x", width + 55)
        .attr("y", 5)
        .attr("dy", ".20em")
        .style("text-anchor", "start")
        .text(function (d) { return d; });

    legend.transition().duration(500).delay(function (d, i) { return 1300 + 100 * i; }).style("opacity", "1");
};




function optionChanged1(state) {
    createchart1(state);
}

let data1;
d3.json(url).then(function(response2) {
// d3.csv("Book4.csv").then(function (data2) {
    let data2 = response2.book_4
    // console.log(data2);
    let allstates = data2.map(obj => obj.State)
    let states = [];
    for (let i = 0; i < allstates.length; i++) {
        if (!states.includes(allstates[i])) {
            states.push(allstates[i]);
        }
    }
    console.log(states);
    data1 = groupBy(data2, "State");
    console.log(data1);
   
});

var createchart1 = function (state) {
    var svg2 = d3.select("#svg2")
    svg2.html("")
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
        width = +svg2.attr("width") - margin.left - margin.right,
        height = +svg2.attr("height") - margin.top - margin.bottom;

    // var color = d3.scaleOrdinal(["#ca0020","#f4a582","#d5d5d5","#92c5de","#0571b0","#660000", "#ffcc7d", "#707d84", ]);
    // var color = d3.scaleOrdinal(d3.schemeCategory10);
    var color1 = d3.scaleOrdinal(d3.schemeSet3);
    var x1 = d3.scaleBand().rangeRound([0, width])
        .padding(0.1),
        y1 = d3.scaleLinear().rangeRound([height, 0]);

    var g1 = svg2.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var y1maxdomain = d3.max(data1[state], function (d) {
        return d.Deaths;

    });
    console.log(y1maxdomain);
    x1.domain(data1[state].map(function (d) {
        return d.Months
     
    }));
    y1.domain([y1maxdomain / 2, y1maxdomain * 1.05]);

    var x2 = d3.scaleBand()
        .rangeRound([0, x1.bandwidth()])
        .padding(0.05)
        .domain(data1[state].map(function (d) {
            return d.Year;
        }));

    color1.domain(data1[state].map(function (d) {
        return d.Year;
    }));

    var groups1 = g1.selectAll(null)
        .data(data1[state])
        .enter()
        .append("g")
        .attr("transform", function (d) {
            return "translate(" + x1(d.Months) + ",0)";
        })

    var bars1 = groups1.selectAll(null)
        .data(function (d) {
            return [d]
        })
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return x2(d.Year)
        })
        .attr("y", function (d) {
            return y1(d.Deaths);
        })
        .attr("width", x2.bandwidth())
        .attr("height", function (d) {
            return height - y1(d.Deaths);
        })
        .attr("fill", function (d) {
            return color1(d.Year)
        })

    g1.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x1));

    g1.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y1).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y1(y1.ticks().pop()) + 0.5)
        .attr("dy", "-2em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Number of Deaths");

};

