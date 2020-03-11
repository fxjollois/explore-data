/*global console,$,sessionStorage */

function afficheUnivarieQuali(data, id) {
    var attributs = Object.keys(data[0]);
    $.each(attributs, function(i, e) { 
        $("#univarie_quali_var").append("<option>" + e + "</option>");
    });
    $("#univarie2_form")[0].reset();
}

$("#univarie_quali_go").on("click", function () {
    var variable = $("#univarie_quanti_var").val(),
        valeurs = data.map(function(e) { return e[variable]; }),
        type = $("#univarie_quanti_type").val();
    $("#univarie_quali_desc").html("");
    switch (type) {
        case "num":
            afficheNumerique(valeurs);
            break;
        case "bar":
            afficheBarplot(valeurs, id);
            break;
    }
});

var data = JSON.parse(sessionStorage.getItem("donnees"));
if (data === null) {
    noData("#univarie_quali");
} else {
    afficheUnivarieQuali(data, "#univarie_quali");
}
