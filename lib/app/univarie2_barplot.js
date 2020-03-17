/*global console,d3 */

/* Diagramme en barres 
    valeurs : tableau de réels
    id      : identifiant de la div où placer le graphique
*/
function afficheBarplot ( valeurs, id ) {
    var pars = parametres_graphe(id);

    var svg = d3.select(id)
        .append("svg")
            .attr("id", "monsvg")
            .attr("width", pars.largeur + pars.marges.gauche + pars.marges.droit)
            .attr("height", pars.hauteur + pars.marges.haut + pars.marges.bas)
        .append("g")
            .attr("transform", "translate(" + pars.marges.gauche + "," + pars.marges.haut + ")");

    var x = d3.scaleBand()
        .domain(valeurs.map(function(e) { return e.key; }))
        .range([0, pars.largeur])
        .paddingInner(0.5)
        .paddingOuter(0.5);
    svg.append("g")
        .attr("transform", "translate(0," + pars.hauteur + ")")
        .call(d3.axisBottom(x));
    
    var y = d3.scaleLinear()
      .domain([0, d3.max(valeurs, function(e) { return e.value; }) * 1.2])
      .range([pars.hauteur, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));
    console.log(y(0));

    svg.selectAll(".bar")
        .data(valeurs)
        .enter()
        .append("rect")
        .attr("x", function(d){ return(x(d.key)); } )
        .attr("width", x.bandwidth() )
        .attr("y", function(d) { return(y(d.value)); })
        .attr("height", function(d) { return(pars.hauteur - y(d.value)); })
        .attr("fill", couleur.univarie);
    
    svg.selectAll(".info")
        .data(valeurs)
        .enter()
        .append("text")
        .attr("x", function(d){ return(x(d.key) + (x.bandwidth() / 2)); } )
        .attr("y", function(d) { return(y(d.value) - 5); })
        .attr("text-anchor", "middle")
        .html(function(d) { return (d.value); })
        .attr("fill", couleur.univarie);

}