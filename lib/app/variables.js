/*global console,$,sessionStorage */

function afficheData(data, id) {
    var attributs = Object.keys(data[0]);
    $.each(attributs, function(i, e) {
        var ligne = $("<div>").appendTo(id);
        ligne.addClass("row");
        $("<div>").addClass("col-md-2").html("<div class='attribut'>" + e + "</div>").appendTo(ligne);
        var valeurs = data.map(function(d) { return d[e]});
        console.log(valeurs);
        $("<div>").addClass("col-md-2").html("<div class='type'>" + typeof(valeurs[0]) + "</div>").appendTo(ligne);
        $("<div>").addClass("col-md-6").html("<div class='valeurs'>" + valeurs.slice(1, 10) + "</div>").appendTo(ligne);
    });
}

var data = JSON.parse(sessionStorage.getItem("donnees"));
if (data === null) {
    noData("#summary");
} else {
    afficheData(data, "#summary");
}
