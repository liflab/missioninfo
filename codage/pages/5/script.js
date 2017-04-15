//

popupInfo("Maintenant on va faire le contraire. \n\n <tspan style=\"font-weight:bold\">Entraine-toi à ecrire des messages codés en tapant les chiffres</tspan> \n <tspan style=\"font-weight:bold\">qui correspondent au message que tu veux envoyer.</tspan>")

function ASCII2String() {
    var good = true;
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
            good = false;
        }
    }

    document.getElementById("res").innerHTML = res;

    if(good) {
        popupGood();
        document.getElementById("btn_next_exercise").style.display = "block";
    }
    else {
        popupNotGood();
    }
}

function reinit_text() {
    document.getElementById("ASCII_numbers").value = "";
    document.getElementById("res").innerHTML = "Entre des nombres et Clique sur CONVERTIR pour afficher le texte";
}
//------------------------------------------------//