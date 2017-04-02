// Page managment 
var currentPageNumber = parseInt(window.location.href.match(new RegExp("[0-9]+", "g")).splice(-1));
var savedPageNumber = parseInt(window.localStorage.getItem("max_page_codage"));
if (isNaN(savedPageNumber)) {
    savedPageNumber = 0;
}
//##########################################################################################################

// Adjust bodyPage height manually to allow blockly to be responsive
var bodyPageDiv = document.getElementById('bodyPage');

var onresize = function () {
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

// Function execute when all things are loaded
function allLoaded() {
    activateButtons();
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    onresize();
}//##########################################################################################################

// Export reveal namespace into parent page
window.reveal_loaded = function (reveal) {
    return window.Reveal = reveal;
}
//##########################################################################################################

// Function to activate the right buttons in the progression bar 
function activateButtons() {
    var nb_total_btn = 5;
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
    // Save num page in local storage
    window.localStorage.setItem("max_page_codage", Math.max(currentPageNumber + 1, savedPageNumber));

    location.href = '../' + (currentPageNumber + 1) + '/index.html';
}
//##########################################################################################################

function not_good() {
    bootbox.alert({
        message: '<div class="text-center">Il y a des erreurs dans ton code. Essaie encore !<br><br><img src="/assets/img/bad.svg" alt="Robot badface" height="200px"></div>',
        backdrop: true
    });
}

function enable_next() {
    bootbox.alert({
        message: '<div class="text-center">Bravo !!! Tu as réussi cette étape<br><br><img src="/assets/img/good.svg" alt="Robot goodface" height="200px"><br><br>Clique sur SUIVANT quand tu seras prêt pour la prochaine activité</div>',
        backdrop: true
    });
    document.getElementById("btn_run_prog").style.display = "none";
    document.getElementById("btn_next_exercise").style.display = "block";
    document.getElementById("progress_" + currentPageNumber.toString()).className = "btn btn-success";

    // Save num page in local storage
    window.localStorage.setItem("max_page_codage", Math.max(currentPageNumber + 1, savedPageNumber));
}

function showHelp() {
    var helpfile = "codage_aide.md";
    var url = "../../../aide/aide.html?file=" + helpfile;

    var win = window.open(url, '_blank');
    win.focus();
}
//##########################################################################################################