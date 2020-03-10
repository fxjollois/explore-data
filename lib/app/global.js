/*global $*/

var couleur = {
    univarie: "steelblue"
}

function noData(id) {
    $(id).html("Aucune donnée chargée, merci de vous rendre sur la page <a href='donnees.html'>Données</a>");
}

function ajoutLigneDescTableau(tableau, libelle, valeur) {
    $("<tr>").html("<td>" + libelle + "</td><td>" + Math.round(valeur * 100) / 100).appendTo(tableau);
}