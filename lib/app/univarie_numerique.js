/*global $,d3*/
/*global ajoutLigneDescTableau*/
function afficheNumerique(valeurs) {
    var tableau = $("<table>").addClass("table").addClass("table-stripped").appendTo("#univarie_quanti_desc"),
        tbody = $("<tbody>").appendTo(tableau);
    
    $("<thead>").html("<tr><th>Information</th><th>Valeur</th></tr>").appendTo(tableau);
    ajoutLigneDescTableau(tbody, "Nombre de valeurs", valeurs.length);
    ajoutLigneDescTableau(tbody, "Moyenne", d3.mean(valeurs));
    ajoutLigneDescTableau(tbody, "Ecart-Type", d3.deviation(valeurs));
    ajoutLigneDescTableau(tbody, "Variance", d3.variance(valeurs));
    ajoutLigneDescTableau(tbody, "Minimum", d3.min(valeurs));
    ajoutLigneDescTableau(tbody, "Q1", d3.quantile(valeurs, 0.25));
    ajoutLigneDescTableau(tbody, "Médiane", d3.median(valeurs));
    ajoutLigneDescTableau(tbody, "Q3", d3.quantile(valeurs, 0.75));
    ajoutLigneDescTableau(tbody, "Maximum", d3.max(valeurs));
}
