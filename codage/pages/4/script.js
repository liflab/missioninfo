//

displayInfo();

function verifiyString() {

    var str_value = document.getElementById("ASCII_text").value;

    if(str_value === "BONJOUR A TOI") {
        popupGood();
    }
    else {
        popupNotGood();
    }
}

function reinit_text() {
    document.getElementById("ASCII_text").value = "";
}
//------------------------------------------------//