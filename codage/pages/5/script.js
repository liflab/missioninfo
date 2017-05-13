//

popupInfo("Maintenant on va faire le contraire. \n\n <tspan style=\"font-weight:bold\">Entraine-toi à ecrire des messages codés en tapant les nombres</tspan> \n <tspan style=\"font-weight:bold\">qui correspondent au message que tu veux envoyer.</tspan>")

const nb_min_tries = 5;
var nb_tries = 0;
var string_found = [];

function ASCII2String() {
    var good = true;
    var res = "";

    var str_ASCII_number = document.getElementById("ASCII_numbers").value;
    var list_ASCII_number = str_ASCII_number.split(" ");

    for (var i = 0; i < list_ASCII_number.length; i++) {
        if (list_ASCII_number[i] !== "") {
            var code = parseInt(list_ASCII_number[i]);

            if (code === 32 || (code >= 65 && code <= 90)) {
                res += String.fromCharCode(code);
            }
            else {
                res += "?";
                good = false;
            }
        }
    }

    document.getElementById("res").innerHTML = res;

    if (good && !string_found.includes(res)) {
        nb_tries++;

        if (nb_tries < nb_min_tries) {

            bootbox.alert({
                message: '<div class="text-center">Bravo !!! Voici le code de <strong>"' + res + '</strong>" : ' + str_ASCII_number + '<br><br><img src="../../../assets/img/Fou.svg" alt="Robot qui attend" height="200px"><br><br>Encore <strong>' + Math.max(nb_min_tries - nb_tries, 0) + '</strong> code à écrire et tu seras prêt pour la prochaine étape</div>',
                backdrop: true
            });
        }
        else {
            popupGood();
            document.getElementById("btn_next_exercise").style.display = "block";
        }
        string_found.push(res);
    }
    else {
        popupNotGood();
    }
}

function checkInput(ob) {
    var invalidChars = /[^0-9\s]/gi
    if (invalidChars.test(ob.value)) {
        ob.value = ob.value.replace(invalidChars, "");
    }
}

function reinit_text() {
    document.getElementById("ASCII_numbers").value = "";
    document.getElementById("res").innerHTML = "Entre des nombres séparés par des espaces pour former un code et clique sur DECODER pour afficher le texte";
}
//------------------------------------------------//