// Adjust height manually to allow blockly to be responsive
var p5jsDiv = document.getElementById('sketch-holder');
var blocklyDiv = document.getElementById('blockly-holder');

var onresize = function () {
    blocklyDiv.style.height = p5jsDiv.clientHeight + 'px';
};
window.addEventListener('resize', onresize, false);
//##########################################################################################################

// Export blockly namespace into parent page
window.blockly_loaded = function (blockly) {
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
        console.log(code);
        eval(code);
        checkAnswer();
        save_code();
    }
    catch (err) {
        not_good();
        console.log(err);
    }
}

function save_code() {
    try {
        window.Blockly.Storage.backupBlocks(window.Blockly.getMainWorkspace());
    }
    catch (err) {
        console.log("Local Storage not available")
    }
}

function reinit_code() {
    initAnswer();
}

function not_good() {
    bootbox.alert({
        message: '<div class="text-center">Il y a des erreurs dans ton code. Essaie encore !<br><br><img src="../../assets/img/bad.png" alt="Smiley badface" height="100%"></div>',
        backdrop: true
    });
}

function enable_next() {
    bootbox.alert({
        message: '<div class="text-center">Bravo !!! Tu as réussi cette étape<br><br><img src="../../assets/img/good.png" alt="Smiley goodface" height="100%"><br><br>Clique sur SUIVANT quand tu seras prêt pour la prochaine activité</div>',
        backdrop: true
    });
    document.getElementById("btn_run_prog").style.display = "none";
    document.getElementById("btn_next_exercise").style.display = "block";
    document.getElementById("btn_current_num").className = "btn btn-success";
}

function showHelp() {
    bootbox.alert({
        message: '<div class="text-center"><video width="100%" autoplay loop> <source src="../../assets/vid/decouverte_video_intro.mp4" type="video/mp4"  /> </video></div>',
        size: 'large'
    });
}
//##########################################################################################################