			
          // datos
var seedData = [{
  "label": "Java",
  "value": 20.794,
  "link": "https://es.wikipedia.org/wiki/Java_(lenguaje_de_programaci%C3%B3n",
}, {
  "label": "C",
  "value": 12.376,
  "link": "https://es.wikipedia.org/wiki/C_(lenguaje_de_programaci%C3%B3n)"
}, {
  "label": "C++",
  "value": 6.199,
  "link": "https://es.wikipedia.org/wiki/C%2B%2B"
}, {
  "label": "Python",
  "value": 3.900,
  "link": "https://es.wikipedia.org/wiki/Python"
}, {
  "label": "C#",
  "value": 3.786,
  "link": "https://es.wikipedia.org/wiki/C_Sharp"
}, {
  "label": "PHP",
  "value": 3.227,
  "link": "https://es.wikipedia.org/wiki/PHP"
},{
  "label": "JS",
  "value": 2.583,
  "link": "https://es.wikipedia.org/wiki/JavaScript"
},{
  "label": "Perl",
  "value": 2.395,
  "link": "https://es.wikipedia.org/wiki/Perl"
},{
  "label": ".NET",
  "value": 2.353,
  "link": "https://es.wikipedia.org/wiki/Microsoft_.NET"
},{
  "label": "Ruby",
  "value": 2.336,
  "link": "https://es.wikipedia.org/wiki/Ruby"
}];

// define grandaria y radio
var width = 450,
    height = 450,
    radius = Math.min(width, height) / 2;

// define colores del arco
var colour = d3.scaleOrdinal(d3.schemeCategory10);

// define rango del arco
var arcText = d3.scaleOrdinal()
  .range([0, width]);

// determina la grandaria del arco
var arc = d3.arc()
  .innerRadius(radius - 130)
  .outerRadius(radius - 30);


// crea la capa de la grafica
var pie = d3.pie()
  .value(function (d) { return d["value"]; })
  .sort(null);

// importa svg atributos i importa g a svg
var svg = d3.select("#donut-chart")
  .attr("width", width)
  .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

// define el centro del circulo
svg.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 100)
  .attr("fill", "#fff") ;

// calcula svg caminos y rellenos del color
var g = svg.selectAll(".arc")
  .data(pie(seedData))
  .enter().append("g")
  .attr("class", "arc")
		
  // hace cada arco poder hacer click
  .on("click", function(d, i) {
    window.location = seedData[i].link;
  });

	// añade un camino a cada g
	g.append("path")
  	.attr("d", arc)
  	.attr("fill", function(d, i) {
    	return colour(i);
  	});

	// añade texto a cada arco
	g.append("text")
  	.attr("transform", function(d) {
    	return "translate(" + arc.centroid(d) + ")";
  	})
  	.attr("dy", ".35em")
  	.style("text-anchor", "middle")
  	.attr("fill", "#fff")
		.text(function(d,i) { return seedData[i].label; })
  
g.selectAll(".arc text").call(wrap, arcText.range([0, width]));


// Wrap function to handle labels with longer text
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null)
        .append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", dy + "em");
      
    console.log("tspan: " + tspan);
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > 90) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan =                     
        text.append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", ++lineNumber * lineHeight + dy + "em")
        .text(word);
      }
    }
  });
}
