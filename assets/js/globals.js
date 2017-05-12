//-----------------------CONSTANTES-----------------------//
const ROBOT_NAME = "Robotino";
document.body.innerHTML = document.body.innerHTML.replace(/{ROBOT_NAME}/g, ROBOT_NAME);

//-----------------------PAGE MANAGMENT-----------------------//
var isOnLocalhost = document.location.hostname.indexOf("localhost") === 0;
var pathTab = document.location.pathname.split('/');

var activity;
var currentPageNumber;

activity = pathTab[2] || 'accueil';
currentPageNumber = parseInt(pathTab[4]) || 0;

var savedPageNumber = parseInt(window.localStorage.getItem("max_page_" + activity));
if (isNaN(savedPageNumber)) {
    savedPageNumber = 1;
}

function openLastPage() {
    writeToLog(activity, "First page (" + savedPageNumber + ")");
    location.href = 'pages/' + savedPageNumber + '/index.html';
}

//-----------------------UI : FOCUS-----------------------//
function setSlideFocus() {
    var fr = document.getElementById("slide-holder");
    fr.contentWindow.focus();
}

//-----------------------UI : SIZE-----------------------//
var autoResize = function () {
    var bodyPageDiv = document.getElementById('bodyPage');
    var topPageDiv = document.getElementById('topPage');

    var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
    var height;
    // Mobile view -> fixed height (scroll)
    if (width < 768) {
        height = 600;
    }
    // Desktop view -> adapt height
    else {
        if (topPageDiv) {
            height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - topPageDiv.offsetHeight - 10;
        }
        else {
            height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 10;
        }
    }
    bodyPageDiv.style.height = height + 'px';
    if (document.getElementById("blockly-holder")) {
        document.getElementById("blockly-holder").style.height = height + 'px';
    }
};
if (activity !== "accueil") {
    window.addEventListener('resize', autoResize, false);
    //console.log("Resize OK");
}

//-----------------------UI : PROGRESS BAR-----------------------//
function createButtons(nb_total_btn) {
    var btn_div = document.getElementById("button_place");
    var btn_html = '<div class="btn-group">';

    for (var i = 1; i <= nb_total_btn; i++) {
        if (i < savedPageNumber) {
            if (i === currentPageNumber) {
                btn_html += '<button class="btn btn-primary" type="button" id="progress_' + i + '" onclick="change_page(this.id);">' + (i).toLocaleString('fr-FR', {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    }) + '</button>'
            }
            else {
                btn_html += '<button class="btn btn-success" type="button" id="progress_' + i + '" onclick="change_page(this.id);">' + (i).toLocaleString('fr-FR', {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    }) + '</button>'
            }
        }
        else if (i === savedPageNumber) {
            if (i === nb_total_btn) {
                btn_html += '<button class="btn btn-success" type="button" id="progress_' + i + '" onclick="change_page(this.id);">FIN</button>'
            }
            else {
                btn_html += '<button class="btn btn-warning" type="button" id="progress_' + i + '" onclick="change_page(this.id);">' + (i).toLocaleString('fr-FR', {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    }) + '</button>'
            }
        }
        else {
            if (i === nb_total_btn) {
                btn_html += '<button class="btn btn-default disabled" type="button" id="progress_' + i + '" onclick="change_page(this.id);">FIN</button>'
            }
            else {
                btn_html += '<button class="btn btn-default disabled" type="button" id="progress_' + i + '" onclick="change_page(this.id);">' + (i).toLocaleString('fr-FR', {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    }) + '</button>'
            }
        }
    }

    btn_html += '</div>';
    btn_div.innerHTML = btn_html;
}

function activateButtons(nb_total_btn) {
    var num = Math.max(currentPageNumber, savedPageNumber);

    for (var i = 1; i < num; i++) {
        document.getElementById("progress_" + i).className = "btn btn-success";
    }
    document.getElementById("progress_" + num).className = "btn btn-primary";
    for (i = num + 1; i <= nb_total_btn; i++) {
        document.getElementById("progress_" + i).className = "btn btn-default disabled"
    }
}

function change_page(id_btn) {
    var num_page = parseInt(id_btn.match(new RegExp("[0-9]+")));

    if (num_page <= Math.max(currentPageNumber, savedPageNumber) && num_page !== currentPageNumber) {
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
function popupNotGood(opt_text) {
    if(opt_text===undefined){
        opt_text = "";
    }
    bootbox.alert({
        message: '<div class="text-center">'+((opt_text.length>0)?(opt_text):('Il y a des erreurs. Essaie encore !'))+'<br><br><img src="../../../assets/img/bad.svg" alt="Robot badface" height="200px"></div>',
        backdrop: true
    });
}

function popupGood() {
    bootbox.alert({
        message: '<div class="text-center">Bravo !!! Tu as réussi cette étape<br><br><img src="../../../assets/img/good.svg" alt="Robot goodface" height="200px"><br><br>Clique sur SUIVANT quand tu seras prêt pour la prochaine étape</div>',
        backdrop: true
    });
}

var info_text_saved = "";
function popupInfo(info_text) {
    if (info_text === undefined) {
        info_text = info_text_saved;  // Il faut le gérer comme ça pour du multi-navigateur, et pour éviter certaines erreurs d'IDE ;)
    }
    else {
        info_text_saved = info_text;
    }

    bootbox.alert({
        message: '<div class="text-center">' + displayInfo(info_text, true) + '</div>',
        size: "xlarge",
        backdrop: true
    });
}

function displayInfo(info_text, popup) {
    if (popup === undefined) {
        popup = false;  // Il faut le gérer comme ça pour du multi-navigateur, et pour éviter certaines erreurs d'IDE ;)
    }
    // Get SVG text
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "../../../assets/img/info.svg", false);
    xmlHttp.send(null);

    var svg_text = xmlHttp.responseText;

    var info_text_line = info_text.split("\n");

    // Add custom text
    var svg_modify = svg_text;
    for (var ligne = 0; ligne < 4; ligne++) {
        if (typeof info_text_line[ligne] !== 'undefined') {
            svg_modify = svg_modify.replace("$text" + (ligne + 1) + "$", info_text_line[ligne].trim());
        }
        else {
            svg_modify = svg_modify.replace("$text" + (ligne + 1) + "$", "");
        }
    }

    // Return text or add it in html tree
    if (popup) {
        return svg_modify;
    } else {
        var infos_html = document.getElementsByTagName("info");
        if (infos_html.length > 0) {
            infos_html[0].innerHTML = svg_modify;
        }
        else {
            console.log("No info tag in html page!");
        }
    }

}

function showHelp(helpfile) {
    if (helpfile === undefined) {
        helpfile = activity + "_p" + currentPageNumber + "_aide.md";  // Il faut le gérer comme ça pour du multi-navigateur, et pour éviter certaines erreurs d'IDE ;)
    }

    var url = "../../../aide/aide.html?file=" + helpfile;

    var win = window.open(url, '_blank');
    win.focus();
}

//-----------------------LOG-----------------------//
function writeToLog(logName, data) {
    var old_data = window.localStorage.getItem("log_" + logName);
    if (old_data === null) {
        old_data = "";
    }
    window.localStorage.setItem("log_" + logName, old_data + "[" + Date.now() + "] " + data + "\n");
}

function saveLog(logName) {
    var log_blob = new Blob([window.localStorage.getItem("log_" + logName)], {type: 'text/plain'});
    saveAs(log_blob, "log_" + logName + ".txt");
}

function getLogs() {
    var logNames = ["decouverte", "codage", "logique", "architecture", "carte"];
    for (var i = 0; i < logNames.length; i++) {
        var log_blob = new Blob([window.localStorage.getItem("log_" + logNames[i])], {type: 'text/plain'});
        saveAs(log_blob, "log_" + logNames[i] + ".txt");
    }
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

//-----------------------STORAGE-----------------------//
function clearLocalStorage() {
    try {
        window.localStorage.clear();
    } catch (err) {
        console.log("No local storage");
    }
    bootbox.alert('Réinitialisation effectuée !')
}

//-----------------------SLEEP-----------------------//
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//-----------------------NAMESPACE EXPORT-----------------------//
window.reveal_loaded = function (reveal) {
    return window.Reveal = reveal;
};

window.blockly_loaded = function (blockly) {
    return window.Blockly = blockly;
};

//-----------------------CREDITS-----------------------//
function showCredits() {
    bootbox.alert(`
            <h3>Développement</h3>
            <div class="text-center">
                <p><b>CDT/CEE UQAC</b></p>
                <p>Maxime BOIVIN - Marianne BOLDUC - Kévin CHAPRON - Laura COTE - Patrick GIROUX - Sylvain HALLE - Vincent PORTA-SCARTA</p>
            </div>

            <h3>Librairies</h3>
            <ul>
                <li><a href="http://getbootstrap.com/">bootstrap</a></li>
                <li><a href="http://bootboxjs.com/">bootbox</a></li>
                <li><a href="https://developers.google.com/blockly/">blockly</a></li>
                <li><a href="https://p5js.org/">p5.js</a></li>
                <li><a href="http://lab.hakim.se/reveal-js">reveal</a></li>
                <li><a href="http://showdownjs.github.io/demo/">showdown</a></li>
            </ul>
            `);
}