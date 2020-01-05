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
    
  //  console.log(response.notes_female.notes)
    // console.log(female_d[0]['Notes']);
    // console.log(male_totals[0]['year']);

    var trace1 = {
        x: female_totals[0]['year'],
        y: female_totals[0]['deaths'],
        name: 'Female Deaths by Year (2007 - 2017)',
        type: "bar"
      };
      var trace2 = {
        x: male_totals[0]['year'],
        y: male_totals[0]['deaths'],
        name: 'Male Deaths by Year (2007 - 2017)',
        type: "bar"
      };
      
    
   
    var data = [trace1,trace2];
    

    // console.log(data);
    var layout = {
      title: "Male v. Female Total Deaths by Year (2007-2017)",
      xaxis: {
        title: "Deaths"
      },
      yaxis: {
        title: "Years"
      }
    };

    Plotly.newPlot("bar", data, layout);




    var trace3 = {
      x: response.age_group_f.age,
      y: response.age_group_f.deaths,
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Male Age Groups'
    };
    
    var trace4 = {
      x: response.age_group_m.age,
      y: response.age_group_m.deaths, 
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Female Age Groups'
    };
    
    var layout4 = {
      title: 'Death Rates by Age Groups (Male and Female)'
    };

    var data4 = [trace3, trace4];
    
    Plotly.newPlot('histogram', data4, layout4);






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
