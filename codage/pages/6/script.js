//

popupInfo("On vient de recevoir un message! \n\n <tspan style=\"font-weight:bold\">Des morceaux n'ont pas pu être décodés.</tspan> \n <tspan style=\"font-weight:bold\">Aide-moi à le terminer et tu pourras t'amuser avec le Micro:bit</tspan>");

var elems2code = document.getElementsByClassName("coded");
for (let i = 0; i < elems2code.length; i++) {
    let text = elems2code[i].innerText;

    text = text.toLowerCase();
    text = text.replace(/é/g, "e");
    text = text.replace(/è/g, "e");
    text = text.replace(/ê/g, "e");
    text = text.replace(/à/g, "a");
    text = text.toUpperCase();
    console.log(text);

    let asciiCode = "";
    for (let j = 0; j < text.length; j++) {
        asciiCode += text.charCodeAt(j) + " ";
    }

    let inputElem = '<input class="textToVerify" id="' + text + '" style="text-align:center;" maxlength="' + text.length + '" size="' + text.length + '"></input>'

    elems2code[i].innerHTML = asciiCode + inputElem;
}

function verify() {
    let res = true;
    let elems = document.getElementsByClassName("textToVerify");
    for (let i = 0; i < elems.length; i++) {
        if (elems[i].value.toUpperCase() === elems[i].id) {
            elems[i].style.backgroundColor = "lightgreen";
            res = res && true;
        }
        else {
            elems[i].style.backgroundColor = "pink";
            res = res && false;
        }
    }

    if (res) {
        document.getElementById("btn_next_exercise").style.display = "block";
        document.getElementById("btn_run_prog").style.display = "none";
        popupGood();
    }
    else {
        popupNotGood();
    }
}

function reinit_text() {
    if(confirm("Veux-tu vraiment supprimer TOUT ton texte ?")) {
        let elems = document.getElementsByClassName("textToVerify");
        for (let i = 0; i < elems.length; i++) {
            elems[i].value = "";
            elems[i].style.backgroundColor = "white";
        }
    }
}
//------------------------------------------------//