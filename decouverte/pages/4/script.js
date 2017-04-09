popupInfo("On va apprendre à utiliser l'aide. \n L'aide sera toujours présente si jamais tu es bloqué. Si jamais tu ne trouve \n pas ta réponse demande alors de l'aide aux animateurs. \n Utilise le clic droit (ou l'appui long) sur le bloc pour trouver l'aide.")

// To check the answer
var stringAnswer;

function initAnswer() {
   stringAnswer = "";
}

function checkAnswer() {
    if(stringAnswer === "CHIEN") {
        enable_next();
    }
    else {
        not_good();
    }
}

//------------------------------------------------//