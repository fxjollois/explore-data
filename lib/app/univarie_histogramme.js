function afficheHistogramme ( valeurs, id, bins, densite = false ) {
    var largeur_div = Math.ceil(d3.select(id).style("width").replace("px", "")),
        marges = {haut: 10, droit: 30, bas: 30, gauche: 40},
        largeur = largeur_div - marges.gauche - marges.droit,
        hauteur = Math.ceil(largeur_div / 3) - marges.haut - marges.bas,
        min = d3.min(valeurs),
        max = d3.max(valeurs);

    var svg = d3.select(id)
        .append("svg")
            .attr("id", "monsvg")
            .attr("width", largeur + marges.gauche + marges.droit)
            .attr("height", hauteur + marges.haut + marges.bas)
        .append("g")
            .attr("transform", "translate(" + marges.gauche + "," + marges.haut + ")");

    var histogramme = d3.histogram().thresholds(bins);
    var intervales = histogramme(valeurs).map(function(e) {
        e.valeur = e.length;
        return e;
    });
    // gestion si nombre de valeurs : intervales extrêmes remis à la même taille que les autres
    if (typeof(bins) === "number") {
        intervales[0].x0 = intervales[0].x1 - (intervales[1].x1 - intervales[1].x0);
        min = intervales[0].x0;
        intervales[intervales.length - 1].x1 = intervales[intervales.length - 1].x0 +
            (intervales[1].x1 - intervales[1].x0);
        max = intervales[intervales.length - 1].x1;
    } else {
        densite = true;
    }

    if (densite) {
        intervales = intervales.map(function(e) {
            e.valeur = (e.valeur / valeurs.length) / (e.x1 - e.x0);
            return e;
        })
    }

    var x = d3.scaleLinear()
      .domain([min, max])
      .range([0, largeur]);
    svg.append("g")
        .attr("transform", "translate(0," + hauteur + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain([0, d3.max(intervales, function(d) { return d.valeur; })])
        .range([hauteur, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll(".hist_bins")
        .data(intervales)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.x0) + 1; })
        .attr("y", function(d) { return y(d.valeur); })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) - 1 ; })
        .attr("height", function(d) { return hauteur - y(d.valeur); })
        .style("fill", couleur.univarie);                
}