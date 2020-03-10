/*global console,sessionStorage,$ */

function DataToTable( data, id ) {
    var attributs = Object.keys(data[0]),
        items = [];
    $.each(attributs, function(i, e) { return items.push({data: e, title: e}) }); 

    var tab = $("<table>").appendTo(id);
    tab.DataTable( {
        data: data,
        columns: items
    } );
}

$('#chargement').on('click', function () {
    // Récupération du choix des données
    var choix = $("#nom_donnees").val();
    
    // Remise à zéro affichage + stockage
    $("#table").html("");
    
    // Application en fonction du choix
    if (choix == "iris") {
        $.getJSON("data/iris.json", function( data ) {
            // Stockage nom des données + données
            sessionStorage.setItem("choix", choix);
            sessionStorage.setItem("donnees", JSON.stringify(data));
            
            // Affichage des données
            DataToTable(data, "#table");
        });
    } else {
        // Suppression du stockage
        sessionStorage.removeItem("donnees");
        sessionStorage.removeItem("choix");
        
        // Afficahge problème
        $("#table").html("Attention, bien choisir les données");
    }
});

var data = JSON.parse(sessionStorage.getItem("donnees")),
    choix = sessionStorage.getItem("choix");
if (data !== null) {
    $("#nom_donnees").val(choix);
    DataToTable(data, "#table");
}
