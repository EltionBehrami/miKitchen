class Recipe {
    constructor(obj) {
        this.label = obj.recipe.label 
        this.img = obj.recipe.image 
        this.calories = Math.floor(obj.recipe.calories) + " calories"
        this.protein = Math.floor(obj.recipe.totalNutrients.PROCNT.quantity)
        this.carbs = Math.floor(obj.recipe.totalNutrients.CHOCDF.quantity)
        this.fats = Math.floor(obj.recipe.totalNutrients.FAT.quantity) 
    }


    generatePieChart(container) {
        const data = [
            { label: "Protein", value: this.protein },
            { label: "Carbs", value: this.carbs },
            { label: "Fats", value: this.fats }
        ]; 

        const width = 250;
        const height = 250;
        const radius = Math.min(width, height) / 2;

        const hoverArc = d3.arc().outerRadius(radius + 10).innerRadius(0)
        const path = d3.arc().outerRadius(radius - 10).innerRadius(0);

        // create an SVG for the pie chart within the specified container
        const svg = d3.select(container)
            .append('svg')
            .attr('width', width + 100)
            .attr('height', height + 100)
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
            // .on("mouseover", function(d){
            //     d3.select("#tooltip")
            //     .style("left", d3.event.pageX + "px")
            //     .style("top", d3.event.pageY + "px")
            //     .style("opacity", 1)
            //     .select("#value")
            //     .text(d.value)
            // })
            // .on("mouseout", function () {
            //     // Hide the tooltip
            //     d3.select("#tooltip")
            //         .style("opacity", 0);
            // });

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
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px")
                .style("opacity", 1)
                .select("#value")
                .text(d.value)
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


}

export default Recipe; 