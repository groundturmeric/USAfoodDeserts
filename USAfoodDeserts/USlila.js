

const promises2 = [
    d3.json("./geojson/gz_2010_us_040_00_20m.json"),
    d3.json("./geojson/uslilalight.geojson")
];



Promise.all(promises2).then(function(data) {

   




    const world = data[0];

    const lila = data[1];

    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;
    const svg = d3.select("#chart")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + window.innerWidth + " " + window.innerHeight)
        // .attr("width", width)
        // .attr("height", height);


        // const projection = d3.geoMercator()
        // const projection = d3.geoConicConformal()
        // const projection =d3.geoLagrange()
        //  const projection = d3.geoAlbers()
        const projection = d3.geoAlbersUsa()
        .translate([width/2, height/2])
        .scale(900);
        // .rotate([0,-90])
        // .center([0.821001, 41.9])
       

    const path = d3.geoPath()
        .projection(projection);


//DRAW MAP
const UStractColorScale = d3.scaleOrdinal(d3.schemeCategory10)
.domain([0,1])
// .range(["rgb(27, 27, 27)", "rgb(111, 111, 111)"])
.range(["#FF00FF", "#FF0000"])
// .range(["#212529", "#495057"])




    svg.selectAll("path")
        .data(world.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "state");


 
        const tooltip = d3.select("#chart")
        .append("div")
        .attr("class", "tooltip");
  


        console.log(lila);
console.log(lila.features);

const mapvalues = lila.features;





        svg.selectAll("path")
        .data(lila.features) 
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "LILA")
        .on("mouseover",function(event, d) {
            // console.log("just had a mouseover", d3.select(d));

            // console.log(this);
    
      

            d3.select(this)
              .classed("active",true);

              let ttx = d3.pointer(event)[0] * k + tX;
              let tty = d3.pointer(event)[1] * k + tY;


            tooltip.style("visibility", "visible") 
     

        

          })
          .on('mousemove', function (e, d) {
            let x = e.offsetX;
            let y = e.offsetY;

            tooltip.style("left", (x) + "px")
            .style("top", (y) + "px")
            .html(`<b>State:</b> ${d.properties.STATE_NAME}<br>
            <b>County Name:</b> ${d.properties.NAMELSADCO} <br>
                  <b>Tract Geoid:</b> ${d.properties.GEOID}<br>`);
        })
          .on("mouseout",function(d){
            d3.select(this)
              .classed("active",false);

              tooltip.style("visibility", "hidden");
        });


      ;




//><><><><><><TOOLTIP>><><><><><><><><><><>//


 


            // console.log(this.GEOID);
            // let cx = +d3.select(this).attr("cx")*k + tX + 20;
            // let cy = +d3.select(this).attr("cy")*k + tY - 10;

     

         

            // d3.select(this)
            //     .attr("r", 10 / k)
            //     .attr("stroke", "white")
            //     .attr("stroke-width", 2 / k);

    

            
            // d3.select(this)
            //     .attr("r", 3 / k)
            //     .attr("stroke", "none");


  




        /*
        ADDING ZOOM

        Maps are great candidates for zooming. But zooming is actually
        a very complex task -- made especially complex in SVG!

        D3 has a built-in module, d3.zoom() for handling zoom events.

        */

        const zoom = d3.zoom()
            .scaleExtent([1, 10])
            .on('zoom', zoomed);

        svg.call(zoom);

        let k = 1;
        let tX = 0;
        let tY = 0;

        function zoomed(e) {

            console.log(e);

            k = e.transform.k;
            tX = e.transform.x;
            tY = e.transform.y;

            svg.selectAll("*").attr("transform", e.transform);

            // svg.selectAll("circle").attr("r", 3 / k);
        }




        


});