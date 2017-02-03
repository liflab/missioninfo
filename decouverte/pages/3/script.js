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