//

displayInfo("Comme tu as vu précédemment, les ordinateurs ne savent compter \n qu'avec des 0 et des 1! \n Appuie sur les nombres en rouge pour fabriquer des nombres binaires. \n Essaie de trouver la bonne combinaison pour écrire le nombre 29");

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

    if(res == 29) {
        document.getElementById("btn_next_exercise").style.display = "block";
    }
    document.getElementById("res").innerHTML = res;
}

//------------------------------------------------//