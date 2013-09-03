d3.json("https://dl.dropboxusercontent.com/u/97059/fitbit/fitbit.json", function(error, graph) {
// console.log(graph.nodes[0]);

var width = "1980",
    height = "1000";

var toggleVieww = 150; //svg toggle boxes height
var toggleViewh = 40; //svg toggle boxes height

var togglewidth = 100; //svg toggle boxes height
var toggleheight = 20; //svg toggle boxes height
var margin = width/2;
var wscale = height/5;
var scale = height/5;
var hescale = height/150;
// var x1 = scale*2;
// var y1 = h/2; 
var narrow = 1.5; //normal rect width
var thick = 4; //thickness for highlighting, mouseovers
var lmargin = 15; //left margin
textmargin = 5; //text justifications

igniteC = "#F16531";
igniteC2 = "#d14511";
rootC = "#EC008B";
rootC2 = "#cC006B";
formC = "#00B159";
formC2 = "#009139";
hackC = "#46C3D2";
hackC2 = "#26a3b2";
driveC = "#FFCE00";
driveC2 = "#dFaE00";
global = "#2A329B";

var scoreMult = 3000;

var color = d3.scale.category20();

console.log(graph);
var maxResponse = d3.max(graph.nodes, function(d,i) { return i;} );
console.log(maxResponse);

var maxScore = d3.max(graph.nodes, function(d) { return d.score;} );
console.log(maxScore);

var heightScale = d3.scale.linear()
  .domain([0, maxScore]) //maxScore
  .range([10, height/8]);

var toggleScale = d3.scale.linear()
  .domain([0, maxScore]) //maxScore
  .range([0, height/1.5]);

var alongWidth = d3.scale.linear()
  .domain([0, maxResponse]) //gotta be total people
  .range([10, width-10]);

var centerWidth = d3.scale.linear()
  .domain([0, maxResponse/3]) //gotta be total people
  .range([width/3, width*2/3]);

var centerHeight = d3.scale.linear()
  .domain([0, maxResponse/3]) //gotta be total people
  .range([0, height/2]);

var alongHeight = d3.scale.linear()
  .domain([0, maxResponse]) //gotta be total people
  .range([10, 100]);

var force = d3.layout.force()
    .charge(-1000)
    .linkDistance(200)
    .gravity(.2)
    .size([width, height]);


var sectionview = d3.select("#clicked").append("svg")
.attr("width", width)
.attr("height", height)



var rect = sectionview.selectAll("rect")
function highlight(){
  b = 1; //for toggle

  var rect = sectionview.selectAll("rect")
  .data(function(d){ 
    return graph.nodes;
    console.log(d3.ascending(d.score, d.score));
  })
  .enter().append("rect")
   .attr("x", function(d,i){
    return alongWidth(i);
    })
  .attr("y", function(d,i){ 
return 0;
    })     
  .attr("width", function(d,i){
    if (d.score>0){
      return 15;
    }
  else {
    return 0;
  }
})
  .attr("height", function(d,i){ 
 return toggleScale(d.score);
    })
  .attr("opacity",".6")

 .attr("fill", function(d){
      if(d.collective == 'Ignite') {
        return igniteC;
      } else if(d.collective == 'Root') {
        return rootC;
      } else if(d.collective == 'Form') {
        return formC;
      } else if(d.collective == 'Hack') {
        return hackC;
      } else if(d.collective == 'Drive') {
        return driveC;
      } else if (d.collective == 'Global'){
        return global;
      }
    })
  .on('mouseover', function(d,i){
    d3.select(this)
    .attr("stroke","gray")
    })
    .on('mouseout', function(d,i){
    d3.select(this)
    .attr("stroke", "white")
    })

  $('rect').tipsy({ 
        gravity: 'nw', 
        html: true, 
        //fade: true,
        title: function() {
          var d = this.__data__;
          var intit = parseInt(d.score);
          return d.name+" - "+(intit)+" pts";
        }
      });
      var groupis;
      console.log(b);

  d3.select('toggleDrive').on('click', function(){
    console.log("toggleDRIVE")
    var groupis = "Drive";
    var indexDrive = 0;
    rect
    .transition()
    // .attr("opacity", function(d,i){
    //   if (d.collective==(groupis)){
    //     return "1";
    //   }
    //   else {
    //     return 0;
    //   }
    // })
      .attr("y", function(d,i){
      if (d.collective==(groupis)){{
        indexDrive++;
      }
      return centerHeight(indexDrive);
      // return centerWidth(indexDrive)+100;
    }
          else {
        return -10;
      }
    })
          .attr("x", width/3)
.attr("height", function(d,i){
    if (d.score>0){
      return 15;
    }
  else {
    return 0;
  }
})
  .attr("width", function(d,i){ 
 return toggleScale(d.score);
    })


  });
  d3.select('toggleHack').on('click', function(){
    console.log("toggleHACK")
    var groupis = "Hack";
        var indexHack= 0;
    rect
    .transition()
    .attr("opacity", function(d,i){
      if (d.collective==(groupis)){
        return "1";
      }
      else {
        return 0;
      }
    })
    .attr("x", function(d,i){
      if (d.collective==(groupis)){{
        indexHack++;
      }
      return indexHack*20;
    }
          else {
        return -10;
      }
    })
  });
  d3.select('toggleIgnite').on('click', function(){
      console.log("toggleIGNITE")
      var groupis = "Ignite";
      var indexIgnite = 0;
  rect
  .transition()
  .attr("opacity", function(d,i){
    if (d.collective==(groupis)){
      return "1";
    }
    else {
      return 0;
    }
  })
      .attr("x", function(d,i){
      if (d.collective==(groupis)){{
        indexIgnite++;
      }
      return indexIgnite*20;
      }
      else {        
        return -10;
      }
    })
});
 d3.select('toggleRoot').on('click', function(){
      console.log("toggleROOT")
      var groupis = "Root";
      var indexRoot = 0;
    rect
    .transition()
    .attr("opacity", function(d,i){
      if (d.collective==(groupis)){
      return "1";
      }
      else {
      return 0;
      }
    })
    .attr("x", function(d,i){
      if (d.collective==(groupis)){{
        indexRoot++;
      }
      return indexRoot*20;
    }
    else {
        return -10;
      }
    })
  });
 d3.select('toggleForm').on('click', function(){
      console.log("toggleFORM")
      var groupis = "Form";
      var indexForm = 0;
    rect
    .transition()
    .attr("opacity", function(d,i){
      if (d.collective==(groupis)){
      return "1";
      }
      else {
      return 0;
      }
    })
        .attr("x", function(d,i){
      if (d.collective==(groupis)){{
        indexForm++;
      }
      return indexForm*20;
    } else {
        return -10;
      }
    })
  });
 d3.select('toggleGlobal').on('click', function(){
      console.log("toggleGLOBAL")
      var groupis = "Global";
      var indexGlobal = 0;
    rect
    .transition()
    .attr("opacity", function(d,i){
      if (d.collective==(groupis)){
      return "1";
      }
      else {
      return 0;
      }
    })
    .attr("x", function(d,i){
      if (d.collective==(groupis)){{
        indexGlobal++;
      }
      return indexGlobal*20;
    } else {
        return -10;
      }
    })
  });

  d3.select('toggleTimeline').on('click', function(){
    rect
    .transition()
   .attr("x", function(d,i){
    return alongWidth(i);
    }) 
  .attr("opacity", .8);
})

rect.on('click', function(d,i){
  console.log("callout");
  console.log(d.collective);
  var groupis = d.collective;
  rect
  .transition()
  .attr("opacity", function(d,i){
    if (d.collective==(groupis)){
      return ".6";
    }
    else {
      return 0;
    }
  })
   .ease("elastic", 10, .3);
});
}



var svg = d3.select("#small_multiples").append("svg")
    .attr({
        "width": "100%",
        "height": "100%"
      })
    .attr("viewBox", "0 0 " + width + " " + height )
    .attr("preserveAspectRatio", "xMinYMin")
    .attr("pointer-events", "all")
     ///////////will this work
     .append("g");



  var node = svg.selectAll(".node")
    .data(graph.nodes)
    .enter().append("svg:g")
    .attr("class", "node")
    .call(force.drag);

doNodes();

function doNodes(){
svg
    .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
.append("g");

force
  .links(graph.links)
    .nodes(graph.nodes)
    .start();

force.on("tick", function() {
  link.attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });


  node.attr("transform", function(d) { 
    return "translate(" + d.x + "," + d.y + ")";
    });
});

function redraw() {
  node.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
}

  node.append("svg:circle")
    .attr("r", function(d) {
   return heightScale(d.score);
    })
    .attr("fill", function(d){
      if(d.collective == 'Ignite') {
        return igniteC;
      } else if(d.collective == 'Root') {
        return rootC;
      } else if(d.collective == 'Form') {
        return formC;
      } else if(d.collective == 'Hack') {
        return hackC;
      } else if(d.collective == 'Drive') {
        return driveC;
      } else if (d.collective == 'Global'){
        return global;
      }
    })
    .attr("opacity",".3")
    .on('mouseover', function(d,i){
    d3.select(this)
    .attr("stroke","gray")
    })
    .on('mouseout', function(d,i){
    d3.select(this)
    .attr("stroke", "white")
    });

function zoom() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
}





var b=0;
var a=0;


  d3.select('toggleTimeline').on('click', function(){
      console.log("toggleTimelineOn")
      highlight();
      $("#small_multiples").hide("slow",function(){
      })
      $("#clicked").show("slow",function(){
      })
  })
  d3.select('toggleCluster').on('click', function(){
      console.log("toggleClusterOn")
      doNodes();
      //show them slowly
      $("#clicked").hide("slow",function(){
      })
      $("#small_multiples").show("slow",function(){
      })
  })
function goBack(){
  b=0;
}
//special jquery library for a nice mouseover headline / title per rectangle
 $('circle').tipsy({ 
        gravity: 'nw', 
        html: true, 
        //fade: true,
        title: function() {
          var d = this.__data__;
          // return d.score+" ("+d.section+")";
          var intit = parseInt(d.score);
          return (intit)+" pts";
        }
      });

  node.append("svg:text")
    .attr("class", "label")
    .attr("dx", 0)
    .attr("dy", function(d) {
      return (d.score/scoreMult)  + 20;
    })
    .text(function(d) {
      return d.name;
    });
  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", function(d) {
        if(d.type == 'visible') {
          return "vislink";
        } else {
          return "invislink";
        }
      })
      .style("stroke-width", function(d) { return Math.sqrt(d.value); })
       .on('mouseover', function(d,i){
    d3.select(this)
    .attr("stroke","black")
    })
    .on('mouseout', function(d,i){
    d3.select(this)
    .attr("stroke", "gray")
    });











});