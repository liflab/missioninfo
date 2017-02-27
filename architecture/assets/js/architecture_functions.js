// Page managment 
var currentPageNumber = parseInt(window.location.href.match(new RegExp("[0-9]+", "g")).splice(-1));
var savedPageNumber = parseInt(window.localStorage.getItem("max_page_architecture"));
if (isNaN(savedPageNumber)) {
    savedPageNumber = 0;
}
//##########################################################################################################

// Adjust height manually to allow blockly to be responsive
var p5jsDiv = document.getElementById('sketch-col');
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
    activateButtons();
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    onresize();
    setup();
}
//##########################################################################################################

// Function to activate the right buttons in the progression bar 
function activateButtons() {
    var nb_total_btn = document.querySelectorAll("#btn-group button").length;
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
    try {
        code = window.Blockly.JavaScript.workspaceToCode(window.Blockly.getMainWorkspace());
        /*
        eval(code);
        checkAnswer();
        save_code();
        */
    }
    catch (err) {
        not_good();
        console.log(err);
        return;
    }
    code = "["+code.trim().substring(0,code.length-1)+"]";
    code = code.replace(/\,([\}\]])/ig,"$1");
    code = code.replace(/ {2}/ig," ");
    code = code.replace(/\/\/.+\n/ig,"");
    console.log(code);
    json_obj = JSON.parse(code);
    run_exercice_code(json_obj);
}

function save_code() {
    try {
        window.Blockly.Storage.backupBlocks(window.Blockly.getMainWorkspace());
    }
    catch (err) {
        console.log("Local Storage not available")
    }
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
    document.getElementById("progress_" + currentPageNumber.toString()).className = "btn btn-success";

    // Save num page in local storage
    window.localStorage.setItem("max_page_architecture", Math.max(currentPageNumber + 1, savedPageNumber));
}

function showHelp() {
    bootbox.alert({
        message: '<div class="text-center"><video width="100%" autoplay loop> <source src="../../assets/vid/architecture_video_intro.mp4" type="video/mp4"  /> </video></div>',
        size: 'large'
    });
}
//##########################################################################################################

function checkAnswer() {
    if(custom_validation(draw_gen_saved,solution)){
        enable_next();
    }else{
        not_good();
    }
}

function custom_validation(drawing_gen, solution){
    console.log(drawing_gen);
    //console.log(solution);

    if(drawing_gen.length!=solution.length){
        return false;
    }
    var t_result = [];
    for(var i=0;i<drawing_gen.length;i++){
        var draw_done = drawing_gen[i];
        //console.log("Looking for "+str_draw(draw_done));
        for(var j=0;j<solution.length;j++){
            if(is_equivalent(draw_done,solution[j])){
                //console.log("OUI");
                t_result.push(true);
                break;
            }
        }
        if(t_result.length!=i+1){
            return false;
        }
    }
    return true;
};

function is_equivalent(d1,d2){
    //console.log("Is it "+str_draw(d2)+" ?");
    var v_coord = (
        (
            d1["coord1"]["x"]==d2["coord1"]["x"] && d1["coord1"]["y"]==d2["coord1"]["y"] &&
            d1["coord2"]["x"]==d2["coord2"]["x"] && d1["coord2"]["y"]==d2["coord2"]["y"]
        ) ||
        (
            d1["coord1"]["x"]==d2["coord2"]["x"] && d1["coord1"]["y"]==d2["coord2"]["y"] &&
            d1["coord2"]["x"]==d2["coord1"]["x"] && d1["coord2"]["y"]==d2["coord1"]["y"]
        )
    );

    return d1["type"]==d2["type"] && v_coord && (d1["color"]===undefined || (d1["color"]==d2["color"]))

}

function str_draw(d){
    return d["type"]+"( {x:"+d["coord1"]["x"]+", y:"+d["coord1"]["y"]+"} => {x:"+d["coord2"]["x"]+", y:"+d["coord2"]["y"]+"})";
}
//##########################################################################################################
function drawLine(x1,y1,x2,y2){
    line(x1*pxUnit,(axisHeightLength-y1)*pxUnit,x2*pxUnit,(axisHeightLength-y2)*pxUnit);
}