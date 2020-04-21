/*global console,d3 */

/* Diagramme en barres 
    valeurs : tableau de réels
    id      : identifiant de la div où placer le graphique
*/
function affichePieplot ( valeurs, id ) {
    var pars = parametres_graphe(id),
        largeur = pars.largeur + pars.marges.gauche + pars.marges.droit,
        hauteur = pars.hauteur + pars.marges.haut + pars.marges.bas;

    var svg = d3.select(id)
        .append("svg")
            .attr("id", "monsvg")
            .attr("width", pars.largeur + pars.marges.gauche + pars.marges.droit)
            .attr("height", pars.hauteur + pars.marges.haut + pars.marges.bas)
        .append("g")
            .attr("transform", "translate(" + (pars.marges.gauche + pars.largeur / 2) + "," + (pars.marges.haut + pars.hauteur / 2) + ")");

    var couleur = d3.scaleOrdinal()
        .domain(valeurs.map(function(e) { return e.key; }))
        .range(d3.schemeDark2);
    
    var radius = Math.min(pars.largeur, pars.hauteur) / 2,
        arc = d3.arc()
            .outerRadius(radius - pars.marges.haut)
            .innerRadius(0),
        labelArc = d3.arc()
            .outerRadius(radius + pars.marges.haut)
            .innerRadius(radius - pars.marges.haut);
    
    var pie = d3.pie()
        .sort(function(a, b) { return a.key.localeCompare(b.key); })
        .value(function(d) { return d.value; });
    
    var g = svg.selectAll(".arc")
        .data(pie(valeurs))
        .enter().append("g")
        .attr("class", "arc");
    
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return couleur(d.data.key); });
    
    g.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .attr("text-anchor", function(d) { 
            var point = labelArc.centroid(d);
            if (point[0] > 0)
                return "start";
            else
                return "end";
        })
        .text(function(d) { return d.data.key; });

}