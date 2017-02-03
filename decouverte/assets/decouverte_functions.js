// Adjust bodyPage height manually to allow blockly to be responsive
var bodyPageDiv = document.getElementById('bodyPage');

var onresize = function() {
    var height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - document.getElementById('navbar').offsetHeight - document.getElementById('topPage').offsetHeight;
    console.log(height);
    bodyPageDiv.style.height = height + 'px';
};
window.addEventListener('resize', onresize, false);
//##########################################################################################################

// Export blockly namespace into parent page
window.blockly_loaded = function(blockly) {
    return window.Blockly = blockly;
}
//##########################################################################################################

// Function execute when all things are loaded
function allLoaded() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    onresize();
}
//##########################################################################################################

// Functions for blocks coding
function run_code() {
    initAnswer();
    try {
        code = window.Blockly.JavaScript.workspaceToCode(window.Blockly.getMainWorkspace());
        eval(code);
        checkAnswer();
        save_code();
    } catch(err) {
        bootbox.alert({
            message: '<div class="text-center">Erreur<br>Il y a un problème dans ton code<br>Demande de l\'aide à l\'animateur<br><br>----------DEBUG----------<br>' + err + '<br><br>----------CODE----------<br>' + code + '</div>',
            backdrop: true
        });
    }
}

function save_code() {
    window.Blockly.Storage.backupBlocks(window.Blockly.getMainWorkspace());
}

function not_good() {
    bootbox.alert({
            message: '<div class="text-center">Il y a des erreurs dans ton code<br>Essaie encore</div>',
            backdrop: true
    });
}

function enable_next() {
    bootbox.alert({
            message: '<div class="text-center">Bravo !!!<br>Tu as réussi cette étape</div>',
            backdrop: true
    });
    document.getElementById("btn_run_prog").style.display = "none";
    document.getElementById("btn_next_exercise").style.display = "block";
    document.getElementById("btn_current_num").className = "btn btn-success";
}
//##########################################################################################################