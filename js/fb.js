d3.json("https://dl.dropboxusercontent.com/u/97059/fitbit/fitbit.json", function(error, graph) {
// console.log(graph.nodes[0]);

var width = "1980",
    height = "1050";

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

var scoreMult = 3000;

var color = d3.scale.category20();

// var vis = d3.select("body").append("svg:svg")
//     .attr("viewBox", "0 0 " + w + " " + h )
//     .attr("preserveAspectRatio", "xMinYMin")

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

var alongHeight = d3.scale.linear()
  .domain([0, maxResponse]) //gotta be total people
  .range([10, 100]);

var force = d3.layout.force()
    .charge(-1000)
    .linkDistance(200)
    .gravity(.2)
    .size([width, height]);

var max = d3.max(graph.nodes, function(d,i){
  // return 
})

var sortview = d3.select("#click").append("svg")
.attr("width", toggleVieww)
.attr("height", toggleViewh);

var sortToggle = sortview.append("text")
.attr("x", lmargin)
.attr("y", toggleheight-textmargin)
.attr('fill','grey')
.attr('class','toggle')
.text("TOGGLE VIEW");

var sectionview = d3.select("#clicked").append("svg")
.attr("width", width)
.attr("height", height)

var svg = d3.select("#small_multiples").append("svg")
    // .attr("width", width)
    // .attr("height", height);
         .attr({
        "width": "100%",
        "height": "100%"
      })
    .attr("viewBox", "0 0 " + width + " " + height )
    .attr("preserveAspectRatio", "xMinYMin")
     .attr("pointer-events", "all")
     ///////////will this work
     .append("g")
    .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
.append("g");

var rect = sectionview.selectAll("rect")
function highlight(){
  b = 1; //for toggle
  var rect = sectionview.selectAll("rect")
 // .attr("class", "rollout")
  .data(function(d){ 
    return graph.nodes;
    console.log(d3.ascending(d.score, d.score));
  })
  .enter().append("rect")
  // .transition()
    // .delay(100)
    // .duration(1000) 
      .attr("x", function(d,i){
    return alongWidth(i);
    })
  .attr("y", function(d,i){ 
return 0;
    })     
  .attr("width", function(d,i){
    if (d.score>0){
      return 8;
    }
  else {
    return 0;
  }
})
  // .sort(function(a,b){
  //   return toggleScale(d.score)-toggleScale(d.score)
  // })
  .attr("height", function(d,i){ 
    // var disis= toggleScale(d.score);
    // return d3.ascending(d.score, d.score);
 // return toggleScale(disis);
 return toggleScale(d.score);
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
      } else {
        return "#cccccc";
      }
    })
      .attr("opacity",".8")

      // .attr("opacity", ".3")
      .on('mouseover', function(d,i){
    d3.select(this)
    .attr("stroke","gray")
    })
    .on('mouseout', function(d,i){
    d3.select(this)
    .attr("stroke", "white")
    })
    // });
  // .attr("fill", "#EC1162");
    // .ease("elastic", 10, .3)
      $('rect').tipsy({ 
        gravity: 'nw', 
        html: true, 
        //fade: true,
        title: function() {
          var d = this.__data__;
          // return d.score+" ("+d.section+")";
          var intit = parseInt(d.score);
          return d.name+" - "+(intit)+" pts";
        }
      });
      var groupis;
      console.log(b);
rect.on('click', function(d,i){
      // var name = d.collective;
  // callout(d.collective);
  // if (b=1){}
    console.log("callout");
  console.log(d.collective);
  // node
  var groupis = d.collective;
  // if (c=0){
  rect
// .attr("opacity", "1")
  .transition()
  .attr("opacity", function(d,i){
    if (d.collective==(groupis)){
      return "1";
    }
    else {
      return 0;
    }
  })
      .ease("elastic", 10, .3);
    // }
});


// rect.on('click', function(d,i){
//       console.log(d.collective);
//       rect
//       .transition()
//       .attr("opacity", function(d,i){
//       if (rect.attr("opacity")==1){
//         return 1;
//       }
//       else {
//         return 1;
//       }
//       })
//     })










    //   var againis = d.collective;
    //     rect
    //     .transition()
    //     .attr("opacity", function(d,i){
    //        if (againis == groupis){
    //       return 1;
    //       }
    //   })
    //           .ease("elastic", 10, .3);
    // });
}












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

  var node = svg.selectAll(".node")
    .data(graph.nodes)
    .enter().append("svg:g")
    .attr("class", "node")
    .call(force.drag);

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
      } else {
        return "#cccccc";
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
// .on('click', function(d,i){
//   highlight()
//   // .transition()
//   d3.selectAll('circle')
//   .attr("fill", "white");
// });



function zoom() {
  svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}







var b=0;
var a=0;

//not node.on
sortToggle.on('click', function(d,i) {
  console.log("sectiontoggleOn")
  if (b===0){
    //call the section names up
    highlight();
    //show them slowly
        $("#clicked").show("slow",function(){
        })
      $("#small_multiples").hide("slow",function(){
      })
    }
  else if (b===1){
    //if you click the section toggle button go back to the original visual
     goBack();
    //and hide the section spread
    $("#small_multiples").show("slow",function(){
      })
      $("#clicked").hide("slow",function(){
      })
    }
});
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




// function callout(groupis){
//   console.log("callout");
//   console.log(groupis);
//   // node
// rect
// // .attr("opacity", "1")
//   .transition()
//   .attr("opacity", function(d,i){
//     if (d.collective==(groupis)){
//       return "1";
//     }
//     else {
//       return 0;
//     }
//   })
//       .ease("elastic", 10, .3);
// }

//   .attr("width", function(d,i){
//    if(d.collective===groupis){
//     return 10;
//   } else { 
//     return 0;
//   }
// })
  // .attr("height", function(d,i){ 
  //   // var word = (d3.values(d.word_count).join(""))
  //   // var wordis = parseInt(word)
  //      if(d.collective==(groupis)){
  //   return heightScale(d.score);
  // }
  // else {
  //   return 0;
  // }
  //   })






});

