//

popupInfo("Les ordinateurs ne connaissent pas les lettres! Ils utilisent des nombres \n pour coder les lettres comme les agents secrets. Entraine-toi à ecrire\n des messages codés en tapant les chiffres qui correspondent au\n message que tu veux envoyer.")

function ASCII2String() {
    var res = "";

    var str_ASCII_number = document.getElementById("ASCII_numbers").value;
    var list_ASCII_number = str_ASCII_number.split(" ");

    for (var i = 0; i < list_ASCII_number.length; i++) {
        var code = list_ASCII_number[i];
        
        if (code == 32 || (code >= 65 && code <= 90)) {
            res += String.fromCharCode(code);
        }
        else {
            res += "?";
        }
    }

    document.getElementById("res").innerHTML = res;
}

function reinit_text() {
    document.getElementById("ASCII_numbers").value = "";
    document.getElementById("res").innerHTML = "Entre des nombres et Clique sur CONVERTIR pour afficher le texte";
}
//------------------------------------------------//