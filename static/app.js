///Using the D3 library to read in samples.json. 
d3.json("data/samples.json").then(function(data) {
    //Creating variables that are holding the initial values for sample_values, otu_lables, and otu_ids
    var samples= data.samples[0].sample_values
    var Ids= data.samples[0].otu_ids;
    var Labels = data.samples[0].otu_labels;
  
    // Creating Bar chart using sample_values as the values.
    var trace1 = {
        // Slicing the first 10 values for the x axis
        x: samples.slice(0, 10),
        // Creating lables for chart 
        y: Ids.map(x => `OTU ${x}`),
        // Slicing the first 10 names of the otu_lables as the hovertext for the chart.
        text: Labels.slice(0, 10),
        
        type: "bar",
        // Orienting the bar chart to be horizontal 
        orientation: "h"
    };

  // Creating a data array for bar chart
  var chart = [trace1];
        
  // Defining the bar chart values
  var chartLayout = {
      title: "Top 10 Operational Taxonomic Units",
      xaxis: {
          title: "Sample Values"
      },
      yaxis: {
          categoryorder: "total ascending"
      }
  };
  // Ploting the chart to a div tag with id "bar" 
  // Include arrays: data1 and layout1
  Plotly.newPlot("bar", chart, chartLayout)

      // Creating bubble chart using sample_values as the values.
      var trace2 = {
        // Slicing the first 10 values for the x axis
        x: samples.slice(0, 25),
        // Creating lables for chart 
        y: Ids.map(x => `${x}`),

        mode:"markers",
        marker: {

        size: samples.slice(0,25),

        // Slicing the first 3000 names of the otu_lables as the hovertext for the chart.
      text: Labels.slice(0, 8),
        
        // Associate color to the OTU IDs
        color: Ids
    },
         // Slicing the first 3000 names of the otu_lables as the hovertext for the chart.
         text: Labels.slice(0, 25),
    };
   // Create data array for plot
   var Bubble = [trace2];

   // Define the plot layout
   var bubbleLayout = {
       title: "Top 25 Operational Taxonomic Units v.s Sample Values",
       showlegend: false,
   };

   // Plot the bubble chart to a div tag with id "bubble" 
   // Include arrays: data2 and layout2
   Plotly.newPlot("bubble", Bubble, bubbleLayout);
});
 // Use otu_ids for the x values.
//Use sample_values for the y values.
//Use sample_values for the marker size.
//Use otu_ids for the marker colors.
//Use otu_labels for the text values.
