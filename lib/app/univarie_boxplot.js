/*global console,d3 */
function afficheBoxplot ( valeurs, id ) {
    var largeur_div = Math.ceil(d3.select(id).style("width").replace("px", "")),
        marges = {haut: 10, droit: 30, bas: 30, gauche: 40},
        largeur = largeur_div - marges.gauche - marges.droit,
        hauteur = Math.ceil(largeur_div / 3) - marges.haut - marges.bas;

    var valeurs_tri = valeurs.slice().sort(d3.ascending),
        min = d3.min(valeurs_tri),
        q1 = d3.quantile(valeurs_tri, .25),
        median = d3.quantile(valeurs_tri, .5),
        q3 = d3.quantile(valeurs_tri, .75),
        max = d3.max(valeurs_tri),
        interQuantileRange = q3 - q1,
        lim_min = q1 - 1.5 * interQuantileRange,
        lim_max = q3 + 1.5 * interQuantileRange,
        box_min = min < lim_min ? lim_min : min,
        box_max = max > lim_max ? lim_max : max;

    var svg = d3.select(id)
        .append("svg")
            .attr("id", "monsvg")
            .attr("width", largeur + marges.gauche + marges.droit)
            .attr("height", hauteur + marges.haut + marges.bas)
        .append("g")
            .attr("transform", "translate(" + marges.gauche + "," + marges.haut + ")");

    var x = d3.scaleLinear()
      .domain([min, max])
      .range([0, largeur]);
    svg.append("g")
        .attr("transform", "translate(0," + hauteur + ")")
        .call(d3.axisBottom(x))

    var centre = hauteur / 2 + marges.haut;

    svg.append("line")
      .attr("x1", x(box_min) )
      .attr("x2", x(box_max) )
      .attr("y1", centre)
      .attr("y2", centre)
      .attr("stroke", "black")

    svg.append("rect")
      .attr("x", x(q1) )
      .attr("y", centre - hauteur / 4)
      .attr("width", (x(q3)-x(q1)) )
      .attr("height", hauteur / 2)
      .attr("stroke", "black")
      .style("fill", couleur.univarie);

    svg.selectAll(".box_bar")
        .data([box_min, median, box_max])
        .enter()
        .append("line")
        .attr("x1", function(d){ return(x(d))} )
        .attr("x2", function(d){ return(x(d))} )
        .attr("y1", centre - hauteur / 4)
        .attr("y2", centre + hauteur / 4)
        .attr("stroke", "black");

    svg.selectAll(".box_outlier")
        .data(valeurs.filter(function(e) {
            return (e < box_min) | (e > box_max)
    }))
        .enter()
        .append("circle")
        .attr("cx", function(d) { return(x(d))})
        .attr("cy", centre)
        .attr("r", hauteur / 100)
}