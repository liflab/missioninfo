popupInfo("Ici on va apprendre à assembler des blocs pour faire un programme. \n\n Utilise les deux blocs disponibles pour créer un programme, \n mais fais attention ils doivent être mis dans un certain ordre.");

// To check the answer
var stringAnswer;

function initAnswer() {
   stringAnswer = "";
}

function checkAnswer() {
    // Trick to verify if blocks are attach together
    if (stringAnswer === "OK" && Blockly.getMainWorkspace().getAllBlocks()[0].childBlocks_[0] !== undefined) {
        enable_next();
    }
    else {
        not_good();
    }
}

//------------------------------------------------//