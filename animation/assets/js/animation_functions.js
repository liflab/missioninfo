// Page managment 
var currentPageNumber = parseInt(window.location.href.match(new RegExp("[0-9]+", "g")).splice(-1));
var savedPageNumber = parseInt(window.localStorage.getItem("max_page_animation"));
if (isNaN(savedPageNumber)) {
    savedPageNumber = 0;
}
//##########################################################################################################

// Adjust height manually to allow blockly to be responsive
var p5jsDiv = document.getElementById('sketch-col');
var blocklyDiv = document.getElementById('blockly-holder');

var onresize = function () {
    try {
        blocklyDiv.style.height = p5jsDiv.clientHeight + 'px';
    }
    catch (err) {    // To resize img on last page
        document.getElementById('bodyPage').style.height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - document.getElementById('navbar').offsetHeight - document.getElementById('topPage').offsetHeight + 'px';
    }
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
    activateButtons();
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    onresize();
}
//##########################################################################################################

// Function to activate the right buttons in the progression bar 
function activateButtons() {
    var nb_total_btn = 10;
    var num = Math.max(currentPageNumber, savedPageNumber);

    for (var i = 1; i < num; i++) {
        document.getElementById("progress_" + i).className = "btn btn-success";
    }
    document.getElementById("progress_" + num).className = "btn btn-warning";
    for (var i = num + 1; i <= nb_total_btn; i++) {
        document.getElementById("progress_" + i).className = "btn btn-default disabled"
    }
}

function change_page(id_btn) {
    var num_page = parseInt(id_btn.match(new RegExp("[0-9]+")));

    if (num_page <= Math.max(currentPageNumber, savedPageNumber) && num_page != currentPageNumber) {
        location.href = '../' + num_page + '/index.html';
    }
}

function next_page() {
    location.href = '../' + (currentPageNumber + 1) + '/index.html';
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
        message: '<div class="text-center">Il y a des erreurs dans ton code. Essaie encore !<br><br><img src="../../assets/img/bad.svg" alt="Smiley badface" height="200px"></div>',
        backdrop: true
    });
}

function enable_next() {
    bootbox.alert({
        message: '<div class="text-center">Bravo !!! Tu as réussi cette étape<br><br><img src="../../assets/img/good.svg" alt="Smiley goodface" height="200px"><br><br>Clique sur SUIVANT quand tu seras prêt pour la prochaine activité</div>',
        backdrop: true
    });
    document.getElementById("btn_run_prog").style.display = "none";
    document.getElementById("btn_next_exercise").style.display = "block";
    document.getElementById("progress_" + currentPageNumber.toString()).className = "btn btn-success";

    // Save num page in local storage
    window.localStorage.setItem("max_page_animation", Math.max(currentPageNumber + 1, savedPageNumber));
}

function showHelp() {
    $.get('help.md', function (data) {
        var converter = new showdown.Converter();
        html = converter.makeHtml(data);

        bootbox.alert({
            message: html,
            size: 'large'
        });
    });
}
//##########################################################################################################