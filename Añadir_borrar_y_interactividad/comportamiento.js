			
          var aciertos = [ { key: 0, value: 20.25 },
                          { key: 1, value: 65 },
                          { key: 2, value: 36.15 },
                          { key: 3, value: 54.87 },
                          { key: 4, value: 69.75 },
                          { key: 5, value: 34.10 },
                          { key: 6, value: 38.21 },
                          { key: 7, value: 48.75 },
                          { key: 8, value: 32.25 },
                          { key: 9, value: 56.15 },
                          { key: 10, value: 29.75 },
                          { key: 11, value: 44.62 },
                          { key: 12, value: 58.21 },
                          { key: 13, value: 34.10 },
                          { key: 14, value: 36.41 },
                          { key: 15, value: 45.50 },
                          { key: 16, value: 50 },
                          { key: 17, value: 90 } ];

         
            var key = function(d) {
                          return d.key; }
 

            var vis = {
                height: 400,
                width : 900,
                suspenso : 40,
                aprobado : 50,
                maximo: 100,
                rectangulos: "null"
            }

            var svg = d3.select("body").append("svg")
                        .attr("height", vis.height)
                        .attr("width", vis.width);

            var xScale = d3.scale.ordinal()
                           .domain(d3.range(aciertos.length))
                           .rangeRoundBands([0, vis.width], 0.05);

            var yScale = d3.scale.linear()
                           .domain([0, vis.maximo]) 
                           .range([0, vis.height]);

            svg.selectAll("rect")
               .data(aciertos, key) 
               .enter()
               .append("rect")
               .attr("x", function(dato, i) {
                                              return xScale(i); })
               .attr("y", function(dato) {
                                              return vis.height - yScale(dato.value);})  
               .attr("height", function(dato) {
                                              return yScale(dato.value);})
               .attr("width", xScale.rangeBand())
               .attr("fill", "orange")

            svg.selectAll("text")
                           .data(aciertos, key)
                           .enter()
                           .append("text")
                           .text(function(dato) {
                                        return dato.value; })
                           .attr("x", function(dato, i) {
                                        return xScale(i) + xScale.rangeBand() / 2;
                           })
                           .attr("y", function(dato) {
                                        return vis.height - yScale(dato.value);
                           })
                           .attr("class", "etiquetas")
                           .attr("text-anchor", "middle");

 
            d3.selectAll("p")
                    .on("click", function() {

                      var paragraphID = d3.select(this).attr("id");

                      if (paragraphID == "add") {                                         
                          var nuevaMuestra = Math.floor(Math.random() * vis.maximo);  
                          var lastKeyValue = aciertos[aciertos.length - 1].key;
                          aciertos.push({
                              key: lastKeyValue + 1,
                              value: nuevaMuestra
                          });
                      } else {
              
                          aciertos.shift();
                      }

                      xScale.domain(d3.range(aciertos.length));  

                      var bars = svg.selectAll("rect")     
                                    .data(aciertos, key);      

                      bars.enter() 
                          .append("rect")
                          .attr("x", vis.width)
                          .attr("y", function(dato) {
                                          return vis.height - yScale(dato.value);
                          })
                          .attr("height", function(dato) {
                                          return yScale(dato.value);
                          })

                          .attr("width", xScale.rangeBand())
                          .attr("fill", "orange");
                      

                      bars.transition()
                          .ease("linear")
                          .duration(500)
                          .attr("x", function(d, i) {       
                                                return xScale(i);
                          })
                          .attr("width", xScale.rangeBand());               
                      bars.exit()
                          .transition()
                          .duration(500)
                          .ease("linear")
                          .attr("x", -xScale.rangeBand())
                          .remove(); 
              
                      var labels = svg.selectAll("text")
                                      .data(aciertos, key)

                      labels.enter()  
                            .append("text")
                            .text(function(dato) {
                                            return dato.value; })
                            .attr("x", function(dato, i) {
                                          return vis.width + xScale.rangeBand() / 2;
                            })
                            .attr("y", function(dato) {
                               return vis.height - yScale(dato.value);
                            })
                            .attr("class", "etiquetas")
                            .attr("text-anchor", "middle");
              
                      labels.transition()
                            .duration(500)
                            .ease("linear")
                            .attr("x", function(dato, i) {
                                          return xScale(i) + xScale.rangeBand() / 2;
                            });

                      labels.exit()
                            .transition()
                            .duration(500)
                            .ease("linear")
                            .attr("x", -xScale.rangeBand()) 
                            .remove()                   
                    
                    });

svg.selectAll("rect")
               .on("mouseover", function() {
                        d3.select(this)
                          .transition()
                          .duration(1)
                          .attr("fill", "yellow");
               })
               .on("mouseout", function(d) {
                        d3.select(this)
                          .transition()
                          .duration(100)
                          .attr("fill", "orange");
                });


            svg.selectAll("text")
                           .data(aciertos, key)
                           .enter()
                           .append("text")
                           .text(function(dato) {
                                        return dato.value; })
                           .attr("x", function(dato, i) {
                                        return xScale(i) + xScale.rangeBand() / 2;
                           })
                           .attr("y", function(dato) {
                                        return vis.height - yScale(dato.value);
                           })
                           .attr("class", "etiquetas")
                           .attr("text-anchor", "middle");