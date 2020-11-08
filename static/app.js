// Fetching the data, and appending the dropdown menu with all of the data-set names by using d3.
function dropDownMenu() {
    // FETCH the JSON data
    d3.json("data/samples.json").then(function(data) {
        // Creating a variable that references the list values of an object with the key "names"
        var idName = data.names;
        // The .forEach() is iterating through the list of values to append the menu items
        idName.forEach(name => {
            d3.select("#selDataset")
            .append("option")
            .attr("value", name)
            .text(name);
        })
    });
}

//  Initializing the page with the first subject's data 
init()
dropDownMenu() ;
///Using the D3 library to read in samples.json and creating init function to handle all of the initial plots.
function init() {
d3.json("data/samples.json").then(function(data) {
    var subject = Object.entries(data.metadata[0]);
    var samples = Object.values(data.samples);
    console.log(subject);
    console.log(samples);
    //Creating variables that hold the initial values for sample_values, otu_lables, and otu_ids.
    var samples= data.samples[0].sample_values
    var Ids= data.samples[0].otu_ids;
    var Labels = data.samples[0].otu_labels;
    
// Creating a Bar chart using sample_values as the values.
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
// Plotting the chart to a div tag with id "bar" and including the chart and chartLayout arrays.
  Plotly.newPlot("bar", chart, chartLayout)

// Creating a bubble chart using sample_values as the values.
      var trace2 = {
        // Slicing the first 25 values for the x axis
        x: samples.slice(0, 25),
        // Creating lables for chart 
        y: Ids.map(x => `${x}`),

        mode:"markers",
        marker: {

        size: samples.slice(0,25),

        // Slicing the first 8 names of the otu_lables as the hovertext for the chart.
        text: Labels.slice(0, 8),
        
        // Associate color to the OTU IDs
        color: Ids
    },
         // Slicing the first 25 names of the otu_lables as the hovertext for the chart.
         text: Labels.slice(0, 25),
    };
// Creating data array for plot
   var Bubble = [trace2];

   // Defining the plot layout
   var bubbleLayout = {
       title: "Top 25 Operational Taxonomic Units v.s Sample Values",
       showlegend: false,
   };

   // Plotting the bubble chart to a div tag with "bubble" id and include the Bubble and bubbleLayout arrays.
   Plotly.newPlot("bubble", Bubble, bubbleLayout);

//Creating demographics function for the demographic info card.   
var demographics = function () {
    d3.json('data/samples.json').then(function(data) {
        Object.entries(data.metadata[0]).forEach(function([key, value]) {
            d3.select('#sample-metadata').append('p')
            .text(`${key}: ${value}`)
        })
    })
};
demographics();

 //Creating a gauge chart plot.
 var data3 = [
    {
        domain: { x: [0, 1], y: [0, 1] },
        value: data.metadata[6].wfreq,
        title: { text: "Belly Button Washing frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            // Setting axis at a 0 to 10 range of washes per week.
            axis: {range: [0, 10] },
        }
    }
];

console.log(data.metadata[6].wfreq)

var layout3 = { width: 500, height: 500, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', data3);
});
}
// Define the optionChanged() function
// We do not need to create an EVENT LISTENER because it's already in the HTML <select> node as 'onchange="optionChanged, this.value"'
// This will act as an aggregator function that will call 4 different functions define below
function optionChanged(newSelection) {
    // Fetch data from server
    d3.json('data/samples.json').then(function(data) {
        // Print out the id number chosen in console
        console.log(`selected ID num: ${newSelection}`)
        // Call all the functions to be updated when new selection is chosen
        updateBar(newSelection);
        updateBubble(newSelection);
        updateDemographics(newSelection);
        updateGauge(newSelection);

        // Bar plot update function
        function updateBar() {
            // Use .filter() function to pull data and asign to a variable the newly chosen Subject ID from dropdown menu
            var newSubject = data.samples.filter(x => x.id == newSelection);
            console.log(newSubject);
            console.log(newSubject[0].sample_values);
            
            // Define the updated x, y, and text values
            var x = newSubject[0].sample_values.slice(0, 10);
            var y = newSubject[0].otu_ids.map(x => `OTU ${x}`);
            var text = newSubject[0]. otu_labels.slice(0, 10);
            
            // Use .restyle() to save computer resources instead of newPlot()
            // define the chart to update "bar", the value name 'x', and the array[x]
            Plotly.restyle("bar", 'x', [x]);
            Plotly.restyle("bar", 'y', [y]);
            Plotly.restyle("bar", 'text', [text])
        }
        // Bubble plot update function similar to above
        function updateBubble() {
            var newSubject = data.samples.filter(x => x.id == newSelection);
            var x = newSubject[0].otu_ids.slice(0, 30);
            var y = newSubject[0].sample_values.slice(0, 30);
            var text = newSubject[0]. otu_labels.slice(0, 30);

            Plotly.restyle("bubble", 'x', [x]);
            Plotly.restyle("bubble", 'y', [y]);
            Plotly.restyle("bubble", 'text', [text])
        };

        // Gauge plot update function similar to above
        function updateGauge() {
            var newSubject = data.metadata.filter(x => x.id == newSelection);
            console.log(newSubject[0].wfreq);
            var value = newSubject[0].wfreq;
            Plotly.restyle("gauge", "value", [value])
        }
        // Metadata card update function
        function updateDemographics() {
            // Use .filter() function to pull data and asign to a variable the newly chosen Subject ID from dropdown menu
            var newSubject = data.metadata.filter(x => x.id == newSelection);
            console.log(newSubject);
            // Select the HTML element to update and CLEAR the text with .html("") to prevent text from compiling
            var card = d3.select("#sample-metadata").html("");
            // Use object.entries and a forEach.() iteration to append the paragraph of the HTML node with text of keys and values
            Object.entries(newSubject[0]).forEach(([key, value]) => 
            card.append("p").text(`${key} : ${value}`)
            )
        }
    });
}; 
 // Use otu_ids for the x values.
//Use sample_values for the y values.
//Use sample_values for the marker size.
//Use otu_ids for the marker colors.
//Use otu_labels for the text values.
