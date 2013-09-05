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
  // .range([width/2-maxResponse*8, width/2+maxResponse*8]);
  .range([width/2-maxResponse*5, width/2+maxResponse*8.8]);

var centerHeight = d3.scale.linear()
  .domain([0, maxResponse/3]) //gotta be total people
  .range([0, height/2]);

var force = d3.layout.force()
    .charge(-1000)
    .linkDistance(200)
    .gravity(.2)
    .size([width, height]);

var graphView = d3.select("#bars").append("svg")
// .attr("width", width)
// .attr("height", height)
  .attr({
    "width": "100%",
    "height": "100%"
  })
  .attr("viewBox", "0 0 " + width + " " + height )
  .attr("preserveAspectRatio", "xMinYMin")
  .attr("pointer-events", "all")
  // .append("g");

var networkView = d3.select("#network").append("svg")
  .attr({
    "width": "100%",
    "height": "100%"
  })
  .attr("viewBox", "0 0 " + width + " " + height )
  .attr("preserveAspectRatio", "xMinYMin")
  .attr("pointer-events", "all")
  .append("g");

// var node = networkView.selectAll(".node")
//   .data(graph.nodes)
//   .enter().append("svg:g")
//   .attr("class", "node")
//   .call(force.drag);

doNodes();
function doNodes(){

networkView
  // .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
  .append("g");

force
  .links(graph.links)
  .nodes(graph.nodes)
  .start();

  var link = networkView.selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class", function(d) {
      if(d.type == 'visible') {
        return "vislink";
      } 
      else {
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
////////////////////////////////////////////////////////
    var node_drag = d3.behavior.drag()
        .on("dragstart", dragstart)
        .on("drag", dragmove)
        .on("dragend", dragend);

    function dragstart(d, i) {
        force.stop() // stops the force auto positioning before you start dragging
    }

    function dragmove(d, i) {
        d.px += d3.event.dx;
        d.py += d3.event.dy;
        d.x += d3.event.dx;
        d.y += d3.event.dy; 
        tick(); // this is the key to make it work together with updating both px,py,x,y on d !
    }

    function dragend(d, i) {
        d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
        tick();
        force.resume();
    }
var node = networkView.selectAll("g.node")
  .data(graph.nodes)
  .enter().append("svg:g")
  .attr("class", "node")
  .call(node_drag);

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
  node.append("svg:text")
    .attr("class", "label")
    .attr("dx", 0)
    .attr("dy", function(d) {
      return (d.score/scoreMult)  + 20;
    })
    .text(function(d) {
      return d.name;
    });

  force.on("tick", tick);
function tick(){
// force.on("tick", function() {
  link.attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });


  node.attr("transform", function(d) { 
    return "translate(" + d.x + "," + d.y + ")";
    });
};

// });

function redraw() {
  node.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
}

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

function zoom() {
  networkView.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
}

var back=0;
var rect = graphView.selectAll("rect")
function highlight(){
  // back=0;
  var rect = graphView.selectAll("rect")
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
  .attr("height",5)
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
    .style("stroke","black")
    .style("stroke-width","2")
  })
  .on('mouseout', function(d,i){
    d3.select(this)
    .style("stroke","none")
    .style("stroke-width","0")  
  })
  rect
  .transition()
  .duration(700)
  .attr("height", function(d,i){ 
    return toggleScale(d.score);
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

  $('toggleDrive').hoverIntent({
    over: function(){
      toggle("Drive");
    },
    out: function(){
      toggleBack();
    }
  })
  $('toggleHack').hoverIntent({
    over: function(){
      toggle("Hack");
    },
    out: function(){
      toggleBack();
    }
  })
  $('toggleIgnite').hoverIntent({
    over: function(){
      toggle("Ignite");
    },
    out: function(){
      toggleBack();
    }
  })
  $('toggleRoot').hoverIntent({
    over: function(){
      toggle("Root");
    },
    out: function(){
      toggleBack();
    }
  })
  $('toggleForm').hoverIntent({
    over: function(){
      toggle("Form");
    },
    out: function(){
      toggleBack();
    }
  })
  $('toggleGlobal').hoverIntent({
    over: function(){
      toggle("Global");
    },
    out: function(){
      toggleBack();
    }
  })
}

function toggle(groupis){
  graphView.selectAll("rect")
    .attr("opacity", function(d,i){
      if (d.collective==groupis){
        return ".6";
      }
      else {
        return ".1";
      }
    })
}
function toggleBack(){
  graphView.selectAll("rect")
  .transition()
  .delay(1000)
  // .duration(200)
  .attr("opacity", ".6");
}

var xAligned = width/2-150;
function switchView(groupis){
  back=1;
  var index = 0;
  graphView.selectAll("rect")
    .transition()
    .attr("y", function(d,i){
      if (d.collective==(groupis)){{
        index++;
      }
        return centerHeight(index);
      }
      else {
        return -10;
      }
    })
    .attr("x", xAligned)
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
}
d3.select('toggleHack').on('click', function(){
  switchView("Hack")
});

d3.select('toggleIgnite').on('click', function(){
  switchView("Ignite")
});

d3.select('toggleRoot').on('click', function(){
  switchView("Root")
});
 
d3.select('toggleForm').on('click', function(){
  switchView("Form")
});
 
d3.select('toggleGlobal').on('click', function(){
  switchView("Global")
});

d3.select('toggleDrive').on('click', function(){
  switchView("Drive")
});

function goBack(){
  back=0;
  graphView.selectAll("rect")
  .transition()
      .duration(700)
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
  // .attr("height",5)
  // .attr("opacity",".6")
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
    });
}

  d3.select('toggleTimeline').on('click', function(){
      console.log("toggleTimelineOn")
      // console.log(back)
      if (back==1){
        goBack();
      }
      else {
      highlight();
    }
      $("#network").hide("slow",function(){
      })
      $("#bars").show("slow",function(){
      // highlight();
      })
  })
  d3.select('toggleCluster').on('click', function(){
      console.log("toggleClusterOn")
      // doNodes();
      force.start();
      back=1;
      //show them slowly
      $("#bars").hide("slow",function(){
      })
      $("#network").show("slow",function(){
      })
  })

});