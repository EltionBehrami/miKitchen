class Recipe {
    constructor(obj) {
        this.label = obj.recipe.label 
        this.img = obj.recipe.image 
        this.calories = Math.floor(obj.recipe.calories / 1.5) + " calories"
        this.protein = Math.floor(obj.recipe.totalNutrients.PROCNT.quantity)
        this.carbs = Math.floor(obj.recipe.totalNutrients.CHOCDF.quantity)
        this.fats = Math.floor(obj.recipe.totalNutrients.FAT.quantity) 

        this.nutrients = []
        Object.keys(obj.recipe.totalNutrients).forEach((key) => {
            const nutrient = obj.recipe.totalNutrients[key];
            if (nutrient.unit === "µg") {
                this.nutrients.push({ name: key, value: nutrient.quantity / 1000 });
            } else if (nutrient.unit === "mg") {
                this.nutrients.push({ name: key, value: nutrient.quantity });
            }
        });
    }
    
    // Object.keys(obj.recipe.totalNutrients).forEach((key) => 
    // this.nutrients.push({name: key, value: obj.recipe.totalNutrients[key].quantity}))

    generatePieChart(container) {
        const data = [
            { label: "Protein", value: this.protein / 2 },
            { label: "Carbs", value: this.carbs / 2},
            { label: "Fats", value: this.fats / 2 }
        ]; 

        const width = 250;
        const height = 250;
        const radius = Math.min(width, height) / 2;

        const hoverArc = d3.arc().outerRadius(radius).innerRadius(0)
        const path = d3.arc().outerRadius(radius - 10).innerRadius(0);

        // create an SVG for the pie chart within the specified container
        const svg = d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

            // d3 preset color scheme 
        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.label))
            .range(d3.schemeCategory10);

            // construct the pie chart with the data
        const pie = d3.pie().value(d => d.value);

        const arc = svg.selectAll('arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc')

        // event listeners for animation 
        arc.append('path')
            .attr('d', path)
            .attr('fill', d => color(d.data.label))
            .style("fill-opacity", 0.8)
            .on("mouseover", function (d, i) {
                d3.select(this)
                .style('fill-opacity', 1)
                .transition().duration(500)
                .attr('d', hoverArc); 
                d3.select("#tooltip")
                .style("left", (d3.event.pageX - 100 ) + "px")
                .style("top", (d3.event.pageY - 100 ) + "px")
                .style("opacity", 1)
                .select("#value")
                .text(`${d.value} grams`)
                d3.select("#macro")
                .text(d.data.label)
            })
            .on("mouseout", function(d, i){
                d3.select("#tooltip")
                .style("opacity", 0);

                d3.select(this)
                .style('fill-opacity', 1)
                .transition().duration(500)
                .attr('d', path); 

            })

            // labels on the chart 
        arc.append('text')
            .attr('transform', d => `translate(${path.centroid(d)})`)
            .attr('dy', '0.35em')
            .text(d => d.data.label);
    }


    generateBubbleChart(container) {
        const width = 928;
        const height = width;
        const margin = 1; // to avoid clipping the root circle stroke
        const name = d => d.name.split(".").pop(); // "Strings" of "flare.util.Strings"
        const group = d => d.name.split(".")[1]; // "util" of "flare.util.Strings"
        const names = d => name(d).split(/(?=[A-Z][a-z])|\s+/g); // ["Legend", "Item"] of "flare.vis.legend.LegendItems"


    // Specify the number format for values.
        const format = d3.format(",d");

    // Create a categorical color scale.
        const color = d3.scaleOrdinal(["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"]);

    // Create the pack layout.
        const pack = d3.pack()
        .size([width - margin * 2, height - margin * 2])
        .padding(3);

    // Compute the hierarchy from the (flat) data; expose the values
    // for each node; lastly apply the pack layout.
        const root = pack(d3.hierarchy({children: this.nutrients})
            .sum(d => d.value));

    // Create the SVG container.
        const svg = d3.select(container)
                .append('svg')
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", [-margin, -margin, width, height])
                .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;")
                .attr("text-anchor", "middle");

    // Place each (leaf) node according to the layout’s x and y values.
        const node = svg.append("g")
            .selectAll()
            .data(root.leaves())
            .enter().append("g")
            .attr("transform", d => `translate(${d.x},${d.y})`);

    // Add a title.
        node.append("title")
            .text(d => `${d.data.id}\n${format(d.value)}`);

    // Add a filled circle.
        // node.append("circle")
        //     .attr("fill-opacity", 0.7)
        //     .attr("fill", d => color(group(d.data)))
        //     .attr("r", d => d.r);

        node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d, i) { return color(i); });

    // Add a label.
        const text = node.append("text")
            .attr("clip-path", d => `circle(${d.r})`);

    // Add a tspan for each CamelCase-separated word.
        text.selectAll()
        .data(d => names(d.data))
        .enter().append("tspan")
            .attr("x", 0)
            .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
            .text(d => d);

    // Add a tspan for the node’s value.
        text.append("tspan")
            .attr("x", 0)
            .attr("y", d => `${names(d.data).length / 2 + 0.35}em`)
            .attr("fill-opacity", 0.7)
            .text(d => format(d.value));

        return Object.assign(svg.node(), {scales: {color}});
}
}




export default Recipe; 