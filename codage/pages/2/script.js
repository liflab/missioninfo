//

popupInfo("Comme tu as vu précédemment, les ordinateurs ne savent compter \n qu'avec des 0 et des 1! \n Appuie sur les nombres en rouge pour fabriquer des nombres binaires. \n <tspan style=\"font-weight:bold\">Essaie de trouver la bonne combinaison pour écrire le nombre indiqué</tspan>");

const nb_min_tries = 5;
var nb_tries = 0;
var numbers_found = [];
var number_to_find;

function chooseNumber() {
    do {
        number_to_find = Math.floor((Math.random() * 60) + 2);
        document.getElementById("number").innerHTML = number_to_find;
    } while (numbers_found.includes(number_to_find) && numbers_found.length < 60);
}

function changeBit(elem) {
    if (elem.innerHTML === "0") {
        elem.innerHTML = "1"
    }
    else {
        elem.innerHTML = "0"
    }

    convertBit();
}

function convertBit() {
    var res = 0;

    for (var i = 0; i < 6; i++) {
        var elem = document.getElementById("bit" + i);

        if (elem.innerHTML === "1") {
            res += Math.pow(2, i);
        }
    }

    document.getElementById("res").innerHTML = res;

    if (res == number_to_find) {
        numbers_found.push(number_to_find);
        nb_tries++;

        if (nb_tries < nb_min_tries) {
            bootbox.alert({
                message: '<div class="text-center">Bravo !!! Tu as trouvé le nombre <strong>' + number_to_find + '</strong> en binaire<br><br><img src="../../../assets/img/good.svg" alt="Robot goodface" height="200px"><br><br>Encore <strong>' + Math.max(nb_min_tries - nb_tries, 0) + '</strong> nombres à trouver et tu seras prêt pour la prochaine étape</div>',
                backdrop: true
            });
        }
        else {
            document.getElementById("btn_next_exercise").style.display = "block";
            popupGood();
        }

        chooseNumber();

    }
}

//------------------------------------------------//