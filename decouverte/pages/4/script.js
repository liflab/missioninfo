// To check the answer
var stringAnswer;
var blockAfficheDown;

function initAnswer() {
   stringAnswer = "";
   blockAfficheDown = false;
}

function checkAnswer() {
    if (blockAfficheDown && !(stringAnswer === "")) {
        bootbox.alert({
        message: '<div class="text-center">Voici le texte que tu as affiché<br>'+ stringAnswer +'</div>',
        backdrop: true,
        callback: enable_next()
        });
    }
    else {
        not_good();
    }
}

//------------------------------------------------//