/*global $,sessionStorage */
/*global noData */

function afficheData(data, id) {
    var attributs = Object.keys(data[0]);
    $.each(attributs, function(i, e) {
        var ligne = $("<div>").appendTo(id);
        ligne.addClass("row");
        var valeurs = data.map(function(d) { return d[e]}),
            type = typeof(valeurs[0]);
        switch (type) {
            case "number":
                $("<div>").addClass("col-md-2")
                    .html("<div class='card'><div class='card-body bg-info text-white text-center'>" + e + "</div></div>")
                    .appendTo(ligne);
                break;
            case "string":
                $("<div>").addClass("col-md-2")
                    .html("<div class='card'><div class='card-body bg-secondary text-white text-center'>" + e + "</div></div>")
                    .appendTo(ligne);
                break;
        }
        $("<div>").addClass("col-md-2")
            .html("<div class='card'><div class='card-body text-center'>" + type + "</div></div>")
            .appendTo(ligne);
        $("<div>").addClass("col-md-6")
            .html("<div class='card'><div class='card-body'>" + valeurs.slice(1, 10) + "</div></div>")
            .appendTo(ligne);
    });
}

var choix = sessionStorage.getItem("choix");
if (choix === null) {
    noData("#summary");
} else {
    $.getJSON("data/" + choix + ".json", function( data ) {
        afficheData(data, "#summary");
    });
}
