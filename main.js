const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = { left: 70, right: 50, top: 50, bottom: 50 };

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME = d3
  .select("#vis")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame");

d3.csv("./data/data.csv").then((data) => {
  const X_SCALE = d3
    .scaleBand()
    .domain(data.map((row) => row["Category"]))
    .range([0, VIS_WIDTH])
    .padding(0.5);

  const MAX_Y = d3.max(data, (d) => parseInt(d["Value"]));
  const Y_SCALE = d3.scaleLinear().domain([0, MAX_Y]).range([VIS_HEIGHT, 0]);

  FRAME.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => X_SCALE(d["Category"]) + MARGINS.left)
    .attr("y", (d) => Y_SCALE(d["Value"]) + MARGINS.top)
    .attr("width", X_SCALE.bandwidth())
    .attr("height", (d) => VIS_HEIGHT - Y_SCALE(d["Value"]))
    .attr("fill", "black");

  FRAME.append("g")
    .attr("transform", `translate(${MARGINS.left},${VIS_HEIGHT + MARGINS.top})`)
    .call(d3.axisBottom(X_SCALE).ticks(10))
    .attr("font-size", "20px");

  FRAME.append("g")
    .attr("transform", `translate(${MARGINS.left},${MARGINS.top})`)
    .call(d3.axisLeft(Y_SCALE).ticks(10))
    .attr("font-size", "20px");
});
