// Adjust bodyPage height manually to allow blockly to be responsive
var bodyPageDiv = document.getElementById('bodyPage');

var onresize = function() {
    var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    var height;
    // Mobile view -> fixed height (scroll)
    if (width < 768) {
        height = 600;
    }
    // Desktop view -> adapt height
    else {
        height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - document.getElementById('navbar').offsetHeight - document.getElementById('topPage').offsetHeight;
    }
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
            message: '<div class="text-center">Il y a des erreurs dans ton code. Essaie encore !<br><br><img src="../../assets/bad.png" alt="Smiley badface" height="100%"></div>',
            backdrop: true
    });
}

function enable_next() {
    bootbox.alert({
            message: '<div class="text-center">Bravo !!! Tu as réussi cette étape<br><br><img src="../../assets/good.png" alt="Smiley goodface" height="100%"><br><br>Clique sur SUIVANT quand tu seras prêt pour la prochaine activité</div>',
            backdrop: true
    });
    document.getElementById("btn_run_prog").style.display = "none";
    document.getElementById("btn_next_exercise").style.display = "block";
    document.getElementById("btn_current_num").className = "btn btn-success";
}

function showHelp() {
    bootbox.alert({
        message: '<div class="text-center"><video width="100%" autoplay loop> <source src="../../assets/decouverte_video_intro.mp4" type="video/mp4"  /> </video></div>',
        size: 'large'
    });
}
//##########################################################################################################