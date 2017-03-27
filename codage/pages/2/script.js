//

displayInfo();

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
}

//------------------------------------------------//