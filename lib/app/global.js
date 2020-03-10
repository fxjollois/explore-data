/*global $*/

var couleur = {
    univarie: "steelblue"
}

function afficher(id) {
    $(id).css("display", "inherit");
}
function cacher(id) {
    $(id).css("display", "none");
}

function erreur(id, message = "Une erreur est survenue !") {
    $(id).html(message);
}
function noData(id) {
    erreur(id, "Aucune donnée chargée, merci de vous rendre sur la page <a href='donnees.html'>Données</a>");
}

function ajoutLigneDescTableau(tableau, libelle, valeur) {
    $("<tr>").html("<td>" + libelle + "</td><td>" + Math.round(valeur * 100) / 100).appendTo(tableau);
}