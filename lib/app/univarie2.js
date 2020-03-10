/*global console,$,sessionStorage */

function afficheUnivarieQuali(data, id) {
    var attributs = Object.keys(data[0]);
}

var data = JSON.parse(sessionStorage.getItem("donnees"));
if (data === null) {
    noData("#univarie_quali");
} else {
    afficheUnivarieQuali(data, "#univarie_quali");
}
