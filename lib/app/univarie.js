/*global console,$,sessionStorage,d3 */
/*global erreur,noData,afficher,cacher,afficheNumerique,,afficheHistogramme,afficheBoxplot */

function definirEtendue() {
    var variable = $("#univarie_quanti_var").val(),
        valeurs = data.map(function(e) { return e[variable]; }),
        min = d3.min(valeurs),
        max = d3.max(valeurs);
    $("#etendue").html(min + ", " + max);
}

$("#univarie_quanti_var").change(function() {
    definirEtendue();
})

$("#univarie_quanti_type").change(function () {
    var type = $("#univarie_quanti_type").val();
    $("#opt_hist").css("display", "none");
    if (type === "hist") {
        afficher("#opt_hist");
        afficher("#opt_hist_nb");
    }
})

$("input[name='opt_histc']").change(function() {
    var opt_hist = $('input[name="opt_histc"]:checked').val();
    if (opt_hist === "occ" | opt_hist === "dens") {
        afficher("#opt_hist_nb");
        cacher("#opt_hist_breaks");
    } else {
        cacher("#opt_hist_nb");
        afficher("#opt_hist_breaks");
    }
})

$("#univarie_quanti_go").on("click", function () {
    var variable = $("#univarie_quanti_var").val(),
        valeurs = data.map(function(e) { return e[variable]; }),
        type = $("#univarie_quanti_type").val();
    $("#univarie_quanti_desc").html("");
    if (type === "num") {
        afficheNumerique(valeurs);
    }
    if (type === "hist") {
        var opt_hist = $('input[name="opt_histc"]:checked').val(),
            opt_hist_nb = $("#opt_hist_slider").data().from,
            opt_hist_breaks = $("#opt_hist_text").val().split(",").map(function(e) { return parseFloat(e); });
        switch (opt_hist) {
            case "occ": 
                afficheHistogramme(valeurs, "#univarie_quanti_desc", opt_hist_nb);
                break;
            case "dens": 
                afficheHistogramme(valeurs, "#univarie_quanti_desc", opt_hist_nb, true);
                break;
            case "pers":
                if (opt_hist_breaks.length === 0 | opt_hist_breaks.filter(function(e) { return isNaN(e); }).length > 0) {
                    erreur("#univarie_quanti_desc", "Vérifiez les bornes des intervalles");
                } else {
                    afficheHistogramme(valeurs, "#univarie_quanti_desc", opt_hist_breaks);
                }                
                break;
        }        
    }
    if (type === "box") {
        afficheBoxplot(valeurs, "#univarie_quanti_desc");
    }
});
    

function afficheUnivarieQuanti(data) {
    var attributs = Object.keys(data[0]);
    $.each(attributs, function(i, e) { 
        if (typeof(data[0][e]) === "number") {
            $("#univarie_quanti_var").append("<option>" + e + "</option>");
        }
    });
    $("#univarie_form")[0].reset();
    definirEtendue(data);
}

var choix = sessionStorage.getItem("choix"),
    data = [];
if (choix === null) {
    noData("#univarie_quanti");
} else {
    $.getJSON("data/" + choix + ".json", function( data_inside ) {
        data = data_inside;
        afficheUnivarieQuanti(data);
    });
}
