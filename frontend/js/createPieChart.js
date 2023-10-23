// var d3 = require("./d3.js");

const createPieChart = (dataset) => {

var width = 365;
var height = 500;

var radius = Math.min(width, height) / 2;

var legendRectSize = 40; 
var legendSpacing = 12;

var color1 = d3.schemeCategory10;

var pieChart = d3.select("#pie-chart");

if (pieChart) {
  pieChart.html("");
}

var svg = d3.select('#pie-chart') 
  .append('svg') 
  .attr('width', width) 
  .attr('height', height)
  .append('g') 
  .attr('transform', 'translate(' + (270) + ',' + (height / 2) + ')');

var arc = d3.arc()
  .innerRadius(0) 
  .outerRadius(radius); 

var pie = d3.pie() 
  .value(function(d) { return d.amount; }) 
  .sort(null); 

var tooltip = d3.select('#pie-chart') 
  .append('div')                                   
  .attr('class', 'tooltip'); 

tooltip.append('div')                          
  .attr('class', 'label');                          

tooltip.append('div')                    
  .attr('class', 'count');                  

tooltip.append('div')  
  .attr('class', 'percent');

dataset.forEach(function(d) {
  d.amount = +d.amount; 
  d.enabled = true; 
});

var path = svg.selectAll('path')
  .data(pie(dataset)) 
  .enter() 
  .append('path') 
  .attr('d', arc) 
  .attr('fill', function(d, i) { return color1[i]; }) 
    .attr("class", "pie-slice")
  .each(function(d) { this._current - d; }); 

path.on('mouseover', function(d) {      
 var total = d3.sum(dataset.map(function(d) {  
  return (d.enabled) ? d.percentage : 0;                                      
  }));                              
                       
//  var percentage = Math.round(1000 * d.data.percentage / total) / 10;
 tooltip.select('.label').html(d.data.type);                     
//  tooltip.select('.percent').html(percentage + "%");
 tooltip.select('.count').html('$' + d.data.amount);        
 tooltip.style('display', 'block');                     
});                                                           

path.on('mouseout', function() {                    
  tooltip.style('display', 'none'); 
 });

path.on('mousemove', function(d) {                
  tooltip.style('top', (d3.event.layerY + 10) + 'px') 
    .style('left', (d3.event.layerX + 10) + 'px'); 
  });

}

export default createPieChart;