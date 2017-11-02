//

popupInfo("Les ordinateurs ne connaissent pas les lettres! Ils utilisent des nombres \n pour coder les lettres comme les agents secrets. Entraine-toi à ecrire \n des messages codés en retrouvant les mots qui correspondent \n au code donné. <tspan style=\"font-weight:bold\">Ecrit les lettres qui correspondent dans la case.</tspan>");

const word_allowed = ["SALUT", "CODAGE", "NOMBRE", "LETTRE", "TU ES UN ROBOT", "MESSAGE", "ORDINATEUR", "PROGRAMME", "BINAIRE", "JE SUIS UN PIRATE"];
const nb_min_tries = 5;
var nb_tries = 0;
var word_to_find;

function chooseWord() {
    word_to_find = word_allowed[nb_tries % 10];

    let asciiCode = "";
    for (let i = 0; i < word_to_find.length; i++) {
        asciiCode += word_to_find.charCodeAt(i) + " ";
    }

    document.getElementById("code").innerHTML = asciiCode;
}

function verifiyString() {

    let res = document.getElementById("ASCII_text").value;

    if (res.toUpperCase() === word_to_find) {
        nb_tries++;

        if (nb_tries < nb_min_tries) {
            bootbox.alert({
                message: '<div class="text-center">Bravo !!! Tu as trouvé <strong>"' + word_to_find + '"</strong><br><br><img src="../../../assets/img/Fou.svg" alt="Robot qui attend" height="200px"><br><br>Encore <strong>' + Math.max(nb_min_tries - nb_tries, 0) + '</strong> mots à trouver et tu seras prêt pour la prochaine étape</div>',
                backdrop: true
            });
        }
        else {
            document.getElementById("btn_next_exercise").style.display = "block";
            popupGood();
        }

        chooseWord();
        reinit_text();

    }
    else {
        popupNotGood();
    }
}

function reinit_text() {
    if(confirm("Veux-tu vraiment supprimer ton texte ?")){
        document.getElementById("ASCII_text").value = "";
    }
}
//------------------------------------------------//