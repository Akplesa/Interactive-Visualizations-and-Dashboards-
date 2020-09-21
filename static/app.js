///Using the D3 library to read in samples.json.
   
d3.json("samples.json").then(function(data) {
    console.log(data)
});

///Creating a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
 //Using D3 to select the dropdown menu

var dropdownMenu = d3.select("#selDataset");
 //Using sample_values as the values for the bar chart, otu_ids as the labels for the bar chart, and otu_labels as the hovertext for the chart.
 // Assigning the dropdown menu item ID to a variable
 
 var samples = dropdownMenu.property("value");
 function init() {
    displayData(samples);
}

function displayData(samples) {
    d3.json("samples.json").then((data) => {
        var names = data.names;
        var metadata = data.metadata;
        var ids = data.samples.[0].otu_ids;
        var sample_values = data.samples[0].sample_values;
        var otu_labels = data.samples[0].otu_labels;
        var otu_ids = data.samples.map(d => d.otu_ids.slice(0,10));
  //Seting up bar chart
        bar_chart(otu_ids, sample_values, otu_labels)
  
var bar_chart= function(ids, sampleV, hover_text ) {
    var trace1 = {
        type: 'bar',
        x: sample_values.slice(0, 10).reverse(),
        y: ids.slice(0, 10).reverse(),
        text: hovText.slice(0, 10).reverse(),
        marker: {
            orientation: 'h',
            color: 'rgb(100, 200, 182)',
            opacity: 0.5,
            line: {
                color: 'rgb(10,10,10)',
                width: 1.5
            }
        }
};
  
var data = [trace1];
var layout = {
    title: 'THE TOP 10 OTUs',
    xaxis: { 
        title: 'Sample Count'
    },
    yaxis: {
        categoryorder: 'Ascending'
    }
};

Plotly.newPlot("bar", data, layout)

};

//Creating a bubble chart that displays each sample.
//Using otu_ids for the x values, sample_values for the y values, sample_values for the marker size, otu_ids for the marker colors, and
//otu_labels for the text values.
ids, sampleV, hover_text 

var Bubbleplot = function(ids, sample_values, hovText) {
    var trace1 = {
        x: ids,
        y: sampleV,
        mode: 'markers',
        marker: {
            opacity: 0.9,
            size: sampleV,
            color: ids
        },
        text: hover_text
    };

var data = [trace1];

var layout = {
    title: "Bubble chart of OTU IDs",
    showlegend: false,
    xaxis: {
        title: "OTUs"
    }
};

Plotly.newPlot('bubble', data, layout)

};

//Display the sample metadata, i.e., an individual's demographic information.

var index = meta.indexOf(samples);
console.log(index);

var demographics = Object.entries(metadata[index]);
var selection = d3.select("#sample-metadata").selectAll("p")   
            .data(demographics)

 selection.enter()
    .append("p")
    .merge(selection)
    .text(function(d) {
    return `${d[0]}: ${d[1]}`;
            });

init();