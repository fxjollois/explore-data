/*global console,$,d3,sessionStorage */
/*global noData,afficheNumerique,afficheBarplot */

function afficheUnivarieQuali(data) {
    var attributs = Object.keys(data[0]);
    $.each(attributs, function(i, e) { 
        $("#univarie_quali_var").append("<option>" + e + "</option>");
    });
    $("#univarie2_form")[0].reset();
}

$("#univarie_quali_go").on("click", function () {
    var variable = $("#univarie_quali_var").val(),
        valeurs = d3.nest()
        .key(function(d) { return d[variable]; })
        .rollup(function(v) { return v.length; })
        .entries(data),
        type = $("#univarie_quali_type").val(),
        valeurs_triees = valeurs.sort(function(x, y){
            return d3.ascending(x.key, y.key);
        });
    
    $("#univarie_quali_desc").html("");
    switch (type) {
        case "num":
            afficheNumerique(valeurs_triees);
            break;
        case "bar":
            afficheBarplot(valeurs_triees, "#univarie_quali_desc");
            break;
    }
});

var data = JSON.parse(sessionStorage.getItem("donnees"));
if (data === null) {
    noData("#univarie_quali");
} else {
    afficheUnivarieQuali(data);
}
