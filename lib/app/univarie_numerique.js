/*global $,d3*/
/*global ajoutLigneDescTableauQt*/
function afficheNumerique(valeurs) {
    var tableau = $("<table>").addClass("table").addClass("table-stripped").appendTo("#univarie_quanti_desc"),
        tbody = $("<tbody>").appendTo(tableau);
    
    $("<thead>").html("<tr><th>Information</th><th>Valeur</th></tr>").appendTo(tableau);
    ajoutLigneDescTableauQt(tbody, "Nombre de valeurs", valeurs.length);
    ajoutLigneDescTableauQt(tbody, "Moyenne", d3.mean(valeurs));
    ajoutLigneDescTableauQt(tbody, "Ecart-Type", d3.deviation(valeurs));
    ajoutLigneDescTableauQt(tbody, "Variance", d3.variance(valeurs));
    ajoutLigneDescTableauQt(tbody, "Minimum", d3.min(valeurs));
    ajoutLigneDescTableauQt(tbody, "Q1", d3.quantile(valeurs, 0.25));
    ajoutLigneDescTableauQt(tbody, "Médiane", d3.median(valeurs));
    ajoutLigneDescTableauQt(tbody, "Q3", d3.quantile(valeurs, 0.75));
    ajoutLigneDescTableauQt(tbody, "Maximum", d3.max(valeurs));
}
