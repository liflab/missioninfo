//

displayInfo();

function ASCII2String() {
    var res = "";

    var str_ASCII_number = document.getElementById("ASCII_numbers").value;
    var list_ASCII_number = str_ASCII_number.split(" ");

    for (var i = 0; i < list_ASCII_number.length; i++) {
        var code = list_ASCII_number[i];
        
        if (code == 32 || (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
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
    document.getElementById("res").innerHTML = "Entre des nombres en haut et Clique sur CONVERTIR pour afficher le texte";
}
//------------------------------------------------//