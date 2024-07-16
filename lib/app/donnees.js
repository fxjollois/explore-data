/*global console,sessionStorage,$,d3 */
/*global choix_donnees */

function DataToTable( data, id ) {
    var attributs = Object.keys(data[0]),
        items = [];
    $.each(attributs, function(i, e) { return items.push({data: e, title: e}); }); 

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
    if (choix_donnees.includes(choix)) {
        $.getJSON("data/" + choix + ".json", function( data ) {
            // Stockage nom des données + données
            sessionStorage.setItem("choix", choix);
            // sessionStorage.setItem("donnees", JSON.stringify(data));
            
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

d3.select("#nom_donnees").selectAll("option")
    .data(choix_donnees)
    .enter()
    .append("option")
    .html(function(d) { return d; });

var choix = sessionStorage.getItem("choix"),
    data = [];
if (choix !== null) {
    $("#nom_donnees").val(choix);
    $.getJSON("data/" + choix + ".json", function( data_inside ) {
        data = data_inside;
        DataToTable(data, "#table");
    });
}
