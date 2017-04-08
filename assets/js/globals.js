//-----------------------CONSTANTES-----------------------//
const ROBOT_NAME = "ROBOTINO";

//-----------------------PAGE MANAGMENT-----------------------//
var isOnLocalhost = document.location.hostname.indexOf("localhost") == 0;
var pathTab = document.location.pathname.split('/');

var activity = 'accueil';
var currentPageNumber = 0;
if (isOnLocalhost) {
    activity = pathTab[1]
    currentPageNumber = parseInt(pathTab[3]);
}
else { // To handle github sub-folder path
    activity = pathTab[2]
    currentPageNumber = parseInt(pathTab[4]);
}

var savedPageNumber = parseInt(window.localStorage.getItem("max_page_" + activity));
if (isNaN(savedPageNumber)) {
    savedPageNumber = 0;
}

//-----------------------UI : SIZE-----------------------//
var onresize = function () {
    var bodyPageDiv = document.getElementById('bodyPage');

    var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    var height;
    // Mobile view -> fixed height (scroll)
    if (width < 768) {
        height = 600;
    }
    // Desktop view -> adapt height
    else {
        height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - document.getElementById('topPage').offsetHeight - 10;
    }
    bodyPageDiv.style.height = height + 'px';
};
window.addEventListener('resize', onresize, false);

//-----------------------UI : PROGRESS BAR-----------------------//
function activateButtons(nb_total_btn) {
    var num = Math.max(currentPageNumber, savedPageNumber);

    for (var i = 1; i < num; i++) {
        document.getElementById("progress_" + i).className = "btn btn-success";
    }
    document.getElementById("progress_" + num).className = "btn btn-primary";
    for (var i = num + 1; i <= nb_total_btn; i++) {
        document.getElementById("progress_" + i).className = "btn btn-default disabled"
    }
}

function change_page(id_btn) {
    var num_page = parseInt(id_btn.match(new RegExp("[0-9]+")));

    if (num_page <= Math.max(currentPageNumber, savedPageNumber) && num_page != currentPageNumber) {
        writeToLog(activity, "Change page to " + num_page);
        location.href = '../' + num_page + '/index.html';
    }
}

function next_page() {
    // Save num page in local storage
    window.localStorage.setItem("max_page_" + activity, Math.max(currentPageNumber + 1, savedPageNumber));
    writeToLog(activity, "Go to next page (" + (currentPageNumber + 1) + ")");
    location.href = '../' + (currentPageNumber + 1) + '/index.html';
}

//-----------------------UI : POPUP & INFO-----------------------//
function popupNotGood() {
    bootbox.alert({
        message: '<div class="text-center">Il y a des erreurs. Essaie encore !<br><br><img src="../../../assets/img/bad.svg" alt="Robot badface" height="200px"></div>',
        backdrop: true
    });
}

function popupGood() {
    bootbox.alert({
        message: '<div class="text-center">Bravo !!! Tu as réussi cette étape<br><br><img src="../../../assets/img/good.svg" alt="Robot goodface" height="200px"><br><br>Clique sur SUIVANT quand tu seras prêt pour la prochaine étape</div>',
        backdrop: true
    });
}

function displayInfo() {
    // Get SVG text
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "../../../assets/img/info.svg", false);
    xmlHttp.send(null);

    var svg_text = xmlHttp.responseText;
    //console.log(svg_text);

    // Get info tag in page
    var infos = document.getElementsByTagName("info");
    for (var i = 0; i < infos.length; i++) {
        var info_text = infos[i].textContent;
        var info_text_line = info_text.split("¤");

        var svg_modify = svg_text;

        for (var ligne = 0; ligne < 4; ligne++) {
            if (typeof info_text_line[ligne] !== 'undefined') {
                svg_modify = svg_modify.replace("$text" + (ligne + 1) + "$", info_text_line[ligne].trim());
            }
            else {
                svg_modify = svg_modify.replace("$text" + (ligne + 1) + "$", "");
            }
        }
        infos[i].innerHTML = svg_modify
    }
}

function showHelp(helpfile) {
    var url = "../../../aide/aide.html?file=" + helpfile;

    var win = window.open(url, '_blank');
    win.focus();
}

//-----------------------LOG-----------------------//
function writeToLog(logName, data) {
    var old_data = window.localStorage.getItem("log_" + logName);
    if (old_data == null) {
        old_data = "";
    }
    window.localStorage.setItem("log_" + logName, old_data + "[" + Date.now() + "] " + data + "\n");
}

function saveLog(logName) {
    var log_blob = new Blob([window.localStorage.getItem("log_" + logName)], { type: 'text/plain' });
    saveAs(log_blob, "log_" + logName + ".txt");
}

function saveAs(blob, fileName) {
    var url = window.URL.createObjectURL(blob);

    var anchorElem = document.createElement("a");
    anchorElem.style = "display: none";
    anchorElem.href = url;
    anchorElem.download = fileName;

    document.body.appendChild(anchorElem);
    anchorElem.click();

    document.body.removeChild(anchorElem);

    // On Edge, revokeObjectURL should be called only after
    // a.click() has completed, at least on EdgeHTML 15.15048
    setTimeout(function () {
        window.URL.revokeObjectURL(url);
    }, 1000);
}

//-----------------------NAMESPACE EXPORT-----------------------//
window.reveal_loaded = function (reveal) {
    return window.Reveal = reveal;
}

window.blockly_loaded = function (blockly) {
    return window.Blockly = blockly;
}