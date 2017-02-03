// To check the answer
var stringAnswer;
var blocksOK;

function initAnswer() {
   stringAnswer = "";
   blocksOK = false;
}

function addText(stringToAdd) {
    if (!(stringToAdd === "")) {
        blocksOK = true;
    }
    stringAnswer += stringToAdd + '<br>';
}

function checkAnswer() {
    if (blocksOK) {
        bootbox.alert({
        message: '<div class="text-center">Voici le texte que tu as affiché :<br>'+ stringAnswer +'</div>',
        backdrop: true,
        callback: function(){ enable_next(); }
        });
    }
    else {
        not_good();
    }
}

//------------------------------------------------//