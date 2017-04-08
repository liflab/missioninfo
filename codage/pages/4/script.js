//

popupInfo("Les ordinateurs ne connaissent pas les lettres! Ils utilisent des nombres \n pour coder les lettres comme les agents secrets. Entraine-toi à ecrire \n des messages codés en retrouvant les lettres qui correspondent \n à chaque nombre. Ecrit chaque lettre dans la case associée.");

function verifiyString() {

    var isValid = true;

    for (var i = 1; i <= 12; i++) {
        var code_ASCII = parseInt(document.getElementById("ASCII_" + i).innerHTML);
        var letter = document.getElementById("letter_" + i).value.toUpperCase();

        if (letter === "") {
            letter = " ";
        }

        if (!(String.fromCharCode(code_ASCII) === letter)) {
            isValid = false;
            break;
        }
    }

    if (isValid) {
        popupGood();
        document.getElementById("btn_run_prog").style.display = "none";
        document.getElementById("btn_next_exercise").style.display = "block";
    }
    else {
        popupNotGood();
    }
}

function reinit_text() {
    for (var i = 1; i <= 12; i++) {
        document.getElementById("letter_" + i).value = "";   
    }
}
//------------------------------------------------//