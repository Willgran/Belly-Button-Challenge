var data;
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((resp) => {
    console.log(resp)
    data = resp
    let dropDown = d3.select("#selDataset")
    resp.names.forEach((name) => {
        dropDown.append("option").text(name)
    })
    buildChart(resp.names[0])
})

function optionChanged(selectedID) {
    buildChart(selectedID)
}
//Create DropDown
let buildChart = (selectedID) => {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((resp) => {
        console.log(resp)
        data = resp
        let dropDown = d3.select("#selDataset")
        resp.names.forEach((name) => {
            dropDown.append("option").text(name)
        })
        if (!data) {
            return
        }
        var filteredData = data.samples.filter(row => row.id == selectedID)[0]
        let x = filteredData.sample_values.slice(0, 10).reverse()
        let y = filteredData.otu_ids.slice(0, 10).map(id => "OTU " + id).reverse()
        let hoverText = filteredData.otu_labels.slice(0, 10).reverse()
//Create Bart Chart
        let barData = [
            {
                x: x,
                y: y,
                text: hoverText,
                type: "bar",
                orientation: "h"
            }
        ]
        //Create Layout
        let layout = {
            title: "UTO"
        }
        let config = {
            responsive: true
        }

        Plotly.newPlot("bar", barData, layout, config)

            //Create bubble chart
            
        let trace1 = {
            x: filteredData.otu_ids,
            y: filteredData.sample_values,
            text: filteredData.otu_labels,
            mode: 'markers',
            marker: {
                color: filteredData.otu_ids,
                size: filteredData.sample_values,
                colorscale: "Earth"
            }
        };

        var data = [trace1];

        var layout1 = {
            title: 'Marker Size',
            showlegend: false
        };

        let config1 = {
            responsive: true
        }

        Plotly.newPlot('bubble', data, layout1, config1)
    });

}
 // Get the first ID to display on page on load
  var firstID = data.metadata[0]// first id
  var sampleMetadata1 = d3.select("#sample-metadata").selectAll('h1')
  
  //-------------------------------------------------
  // Display the first ID's demographic information
  var sampleMetadata = sampleMetadata1.data(d3.entries(firstID))
  sampleMetadata.enter()
                .append('h1')
                .merge(sampleMetadata)
                .text(d => `${d.key} : ${d.value}`)
                .style('font-size','100%')


// var mydata = {'Ram':'100 points','Shyam':'200 points','Fred-ii':'800 points'};

let buildBubble = (selectID) => {
    var filteredData1 = data.samples.filter(row => row.id == selectID)[0]
    let y1 = filteredData1.sample_values
    let x1 = filteredData1.otu_ids
    let hoverText1 = filteredData1.otu_labels
}

