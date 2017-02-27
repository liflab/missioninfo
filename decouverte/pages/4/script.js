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
        message: '<div class="text-center"><p>Voici le texte que tu as affiché :</p><h3>'+ stringAnswer +'</h3></div>',
        backdrop: true,
        callback: function(){ enable_next(); }
        });
    }
    else {
        not_good();
    }
}

//------------------------------------------------//