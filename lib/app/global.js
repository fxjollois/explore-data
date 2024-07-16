/*global $*/

var choix_donnees = ["iris", "mtcars", "LifeCycleSavings", "diamonds", "data"];

var couleur = {
    univarie: "steelblue"
}

function parametres_graphe(id) {
    var largeur_div = Math.ceil(d3.select(id).style("width").replace("px", "")),
        marges = {haut: 10, droit: 30, bas: 30, gauche: 40},
        largeur = largeur_div - marges.gauche - marges.droit,
        hauteur = Math.ceil(largeur_div / 3) - marges.haut - marges.bas;
    return {
        largeur_div: largeur_div,
        marges: marges,
        largeur: largeur,
        hauteur: hauteur
    }
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

function ajoutLigneDescTableauQt(tableau, libelle, valeur) {
    $("<tr>").html("<td>" + libelle + "</td><td>" + Math.round(valeur * 100) / 100 + "</td>").appendTo(tableau);
}
function ajoutLigneDescTableauQl(tableau, mod, occ, prop) {
    $("<tr>").html("<td>" + mod + "</td><td>" + occ +"</td><td>" + Math.round(prop * 100) / 100 + " %</td>").appendTo(tableau);
}