/*global $*/
/*global ajoutLigneDescTableauQl*/
function afficheNumerique(valeurs) {
    var tableau = $("<table>").addClass("table").addClass("table-stripped").appendTo("#univarie_quali_desc"),
        tbody = $("<tbody>").appendTo(tableau),
        nb = valeurs.reduce(function(a, b) { var e = {value: a.value}; e.value += b.value; return e; }).value;
    
    $("<thead>").html("<tr><th>Modalités</th><th>Occurences</th><th>Proportions</th></tr>").appendTo(tableau);
    valeurs.forEach(function(e) {
        ajoutLigneDescTableauQl(tbody, e.key, e.value, e.value / nb * 100);
    })
}
