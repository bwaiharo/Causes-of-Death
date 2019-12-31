// // Plot the default route once the page loads

function buildPlot() {
    /* data route */
  var url = "/jsonData";
  d3.json(url).then(function(response) {

    let female_totals = [response.female_by_year]
    let male_totals = [response.male_by_year]
    let female_d = [response.female]
    let f_population = []
    let f_death = []
    let f_notes = []
   female_d.forEach(e => e.forEach(f => f_population.push(f.Population)))
   female_d.forEach(e => e.forEach(f => f_death.push(f.Deaths)))
   female_d.forEach(e => e.forEach(f => f_notes.push(f.Notes)))
    
   console.log(response.notes_female.notes)
    // console.log(female_d[0]['Notes']);
    // console.log(male_totals[0]['year']);

    var trace1 = {
        x: female_totals[0]['year'],
        y: female_totals[0]['deaths'],
        name: 'Female Deaths by Year (1999 - 2017)',
        type: "bar"
      };
      var trace2 = {
        x: male_totals[0]['year'],
        y: male_totals[0]['deaths'],
        name: 'Male Deaths by Year (1999 - 2017)',
        type: "bar"
      };
      
    
   
    var data = [trace1,trace2];
    

    // console.log(data);
    var layout = {
      title: "Male v. Female Total Deaths by Year (1999-2017)",
      xaxis: {
        title: "Deaths"
      },
      yaxis: {
        title: "Years"
      }
    };

    Plotly.newPlot("bar", data, layout);



    var trace3 = {
      x: f_death.slice(0,100),
      y: f_population.slice(0,100),
      text: f_notes.slice(0,100),
      mode: 'markers',
      marker: {
        color: f_population.slice(0,100),
        size: f_death.slice(0,100)
      }
    };
    
    var data2 = [trace3];
    
    var layout2 = {
      title: 'Bubble Chart Hover Text',
      showlegend: false,
      height: 600,
      // width: 600
    };
    
    Plotly.newPlot('bubble', data2, layout2);






    var data3 = [{
      values: response.notes_female.deaths,
      labels: response.notes_female.notes,
      domain: {column: 0},
      name: 'Female Causes of Death %',
      hoverinfo: 'label+percent+name',
      hole: .5,
      type: 'pie'
    },{
      values: response.notes_male.deaths,
      labels: response.notes_male.notes,
      text: 'Causes of Death',
      textposition: 'inside',
      domain: {column: 1},
      name: 'Male Causes of Death %',
      hoverinfo: 'label+percent+name',
      hole: .5,
      type: 'pie'
    }];
    
    var layout3 = {
      title: 'Total Deaths in NY 2007 - 2017',
      annotations: [
        {
          font: {
            size: 20
          },
          showarrow: false,
          text: 'FEMALE',
          x: 0.17,
          y: 0.5
        },
        {
          font: {
            size: 20
          },
          showarrow: false,
          text: 'MALE',
          x: 0.82,
          y: 0.5
        }
      ],
      height: 700,
      
      showlegend: false,
      grid: {rows: 1, columns: 2}
    };
    
    Plotly.newPlot('pie', data3, layout3);

  });
}

buildPlot();
