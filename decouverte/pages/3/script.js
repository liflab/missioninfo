popupInfo("Cette fois-ci on va apprendre à supprimer des blocs.\n Tu en auras surement besoin si tu te trompes de bloc\n\n Cherche la poubelle et dépose le bloc dedans.")

// To check the answer
var stringAnswer;

function initAnswer() {
   stringAnswer = "OK";
}

function checkAnswer() {
    if(stringAnswer === "OK") {
        enable_next();
    }
    else {
        not_good();
    }
}

//------------------------------------------------//