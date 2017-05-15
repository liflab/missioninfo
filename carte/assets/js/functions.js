// Constants
const WIDTH = 600;
const HEIGHT = 600;
const COLS = 10;
const ROWS = 10;
const DEBUG = false;

// Globals variables
var img_road_deb, img_road_1, img_road_2, img_road_3, img_road_4, img_road_fin, img_player, img_bg;

var answer;

var num_item = 0;
var isPlaying = false;
var animator;

var cityMap = new Map();
var page_map;
var maxBlocks;
var code = "";

// Functions to load assets
function preload() {
    img_road_deb = [loadImage("../../assets/img/deb_0.png"),
        loadImage("../../assets/img/deb_1.png"),
        loadImage("../../assets/img/deb_2.png"),
        loadImage("../../assets/img/deb_3.png")];

    img_road_1 = [loadImage("../../assets/img/1_0.png"),
        loadImage("../../assets/img/1_1.png")];

    img_road_2 = [loadImage("../../assets/img/2_0.png"),
        loadImage("../../assets/img/2_1.png"),
        loadImage("../../assets/img/2_2.png"),
        loadImage("../../assets/img/2_3.png")];

    img_road_3 = [loadImage("../../assets/img/3_0.png"),
        loadImage("../../assets/img/3_1.png"),
        loadImage("../../assets/img/3_2.png"),
        loadImage("../../assets/img/3_3.png")];

    img_road_4 = loadImage("../../assets/img/4.png");

    img_road_fin = [loadImage("../../assets/img/fin_0.png"),
        loadImage("../../assets/img/fin_1.png"),
        loadImage("../../assets/img/fin_2.png"),
        loadImage("../../assets/img/fin_3.png")];

    img_player = {
        "E": loadImage("../../assets/img/player_E.png"),
        "W": loadImage("../../assets/img/player_W.png"),
        "N": loadImage("../../assets/img/player_N.png"),
        "S": loadImage("../../assets/img/player_S.png")
    };

    img_treasure = loadImage("../../assets/img/tresor.png");
    img_bg = loadImage("../../assets/img/p" + currentPageNumber + "_bg.png");
}

function createMap() {
    cityMap.init(page_map.slice());
    cityMap.draw();
}

function reinitMap() {
    cityMap.init(page_map.slice());
    cityMap.draw();
}

// Objects used in this section
function Map() {

    this.player = {};
    this.roads = new Array(ROWS);
    for (var row = 0; row < ROWS; row++) {
        this.roads[row] = new Array(COLS);
    }

    this.init = function (listRoads) {
        for (var i = 0; i < listRoads.length; i++) {
            this.roads[listRoads[i].row][listRoads[i].col] = Object.assign({}, listRoads[i].data);

            // Init player with deb tile
            if (listRoads[i].data.style === "deb") {
                this.player.row = listRoads[i].row;
                this.player.col = listRoads[i].col;
                if (listRoads[i].data.type === 0) {
                    this.player.dir = "N";
                }
                else if (listRoads[i].data.type === 1) {
                    this.player.dir = "E";
                }
                else if (listRoads[i].data.type === 2) {
                    this.player.dir = "S";
                }
                else if (listRoads[i].data.type === 3) {
                    this.player.dir = "W";
                }
            }
        }
    };

    this.styleRoad = function () {
        return this.roads[this.player.row][this.player.col].style;
    };

    this.directionOriente = function (dir, orientation) {
        if (dir === "N") {
            if (orientation === "L") {
                return "W";
            }
            else if (orientation === "R") {
                return "E";
            }
            else if (orientation === "F") {
                return "N";
            }
            else if (orientation === "R") {
                return "S";
            }
            else {
                throw "Bad direction"
            }
        }
        else if (dir === "S") {
            if (orientation === "L") {
                return "E";
            }
            else if (orientation === "R") {
                return "W";
            }
            else if (orientation === "F") {
                return "S";
            }
            else if (orientation === "R") {
                return "N";
            }
            else {
                throw "Bad direction"
            }
        }
        else if (dir === "W") {
            if (orientation === "L") {
                return "S";
            }
            else if (orientation === "R") {
                return "N";
            }
            else if (orientation === "F") {
                return "W";
            }
            else if (orientation === "R") {
                return "E";
            }
            else {
                throw "Bad direction"
            }
        }
        else if (dir === "E") {
            if (orientation === "L") {
                return "N";
            }
            else if (orientation === "R") {
                return "S";
            }
            else if (orientation === "F") {
                return "E";
            }
            else if (orientation === "R") {
                return "W";
            }
            else {
                throw "Bad direction"
            }
        }
        else {
            throw "Bad direction"
        }
    };

    this.roadAvailable = function (dir) {
        var res = false;

        try {
            if (dir === "N") {
                res = this.roads[this.player.row - 1][this.player.col] !== undefined;
            }
            else if (dir === "S") {
                res = this.roads[this.player.row + 1][this.player.col] !== undefined;
            }
            else if (dir === "W") {
                res = this.roads[this.player.row][this.player.col - 1] !== undefined;
            }
            else if (dir === "E") {
                res = this.roads[this.player.row][this.player.col + 1] !== undefined;
            }
        }
        catch (err) {
            console.log(err);
        }

        return res;
    };

    this.isFinished = function () {
        var res = false;

        try {
            res = this.roads[this.player.row][this.player.col].style === "fin";
        }
        catch (err) {
            console.log(err);
        }

        return res;
    };

    this.testTurn = function (orientation) {
        return this.roadAvailable(this.directionOriente(this.player.dir, orientation));
    };

    this.turn = function (orientation) {
        this.changeDirPlayer(this.directionOriente(this.player.dir, orientation));
    };

    this.changeDirPlayer = function (dir) {
        this.player.dir = dir;
        this.draw();
    };

    this.isOnTreasure = function () {
        if (this.roads[this.player.row][this.player.col].treasure) {
            this.roads[this.player.row][this.player.col].treasure = false;
            return true;
        }
        else {
            return false;
        }
    };

    this.checkTreasure = function () {
        if (this.roads[this.player.row][this.player.col].treasure) {
            this.roads[this.player.row][this.player.col].treasure = false;
        }
    };

    this.movePlayer = function () {
        this.isOnTreasure();

        if (this.roadAvailable(this.player.dir)) {
            if (this.player.dir === "N") {
                this.player.row = this.player.row - 1;
            }
            else if (this.player.dir === "S") {
                this.player.row = this.player.row + 1;
            }
            else if (this.player.dir === "W") {
                this.player.col = this.player.col - 1;
            }
            else if (this.player.dir === "E") {
                this.player.col = this.player.col + 1;
            }

            this.draw();
        }
        else {
            isPlaying = false;
            throw "Bad direction";
        }
    };

    this.draw = function () {
        clear();
        background(255);

        image(img_bg, 0, 0);

        for (var row = 0; row < ROWS; row++) {
            for (var col = 0; col < COLS; col++) {
                var road = this.roads[row][col];

                if (DEBUG) {
                    if ((row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)) {
                        fill("rgba(200,200,200,0.5)");
                        noStroke();
                        rect(col * (WIDTH / COLS), row * (HEIGHT / ROWS), 60, 60);
                    }
                }

                if (road !== undefined) {
                    if (road.style === "deb") {
                        image(img_road_deb[road.type], col * (WIDTH / COLS), row * (HEIGHT / ROWS));
                    }
                    else if (road.style === "1") {
                        image(img_road_1[road.type], col * (WIDTH / COLS), row * (HEIGHT / ROWS));
                    }
                    else if (road.style === "2") {
                        image(img_road_2[road.type], col * (WIDTH / COLS), row * (HEIGHT / ROWS));
                    }
                    else if (road.style === "3") {
                        image(img_road_3[road.type], col * (WIDTH / COLS), row * (HEIGHT / ROWS));
                    }
                    else if (road.style === "4") {
                        image(img_road_4, col * (WIDTH / COLS), row * (HEIGHT / ROWS));
                    }
                    else if (road.style === "fin") {
                        image(img_road_fin[road.type], col * (WIDTH / COLS), row * (HEIGHT / ROWS));
                    }

                    if (road.treasure) {
                        image(img_treasure, col * (WIDTH / COLS), row * (HEIGHT / ROWS));
                    }
                }
            }
        }

        image(img_player[this.player.dir], this.player.col * (WIDTH / COLS), this.player.row * (HEIGHT / ROWS));
    }
}

// Functions for blocks coding
function runCode() {
    // Wait to finish animation before another run
    if (!isPlaying) {
        reinitMap();

        try {
            code = window.Blockly.JavaScript.workspaceToCode(window.Blockly.getMainWorkspace());
            console.log(code);
            eval("answer = async function() { isPlaying = true;\n\nawait sleep(200);\n" + code + "isPlaying = false;}");
            saveCode();
            document.getElementById("btn_run").innerHTML = '<span class="glyphicon glyphicon-pause"></span> ARRETER';
            answer();
            checkAnswer();
        }
        catch (err) {
            popupNotGood();
            console.log(err);
        }
    } else {
        isPlaying = false;
    }
}

function saveCode() {
    try {
        window.Blockly.Storage.backupBlocks(window.Blockly.getMainWorkspace());
    }
    catch (err) {
        console.log("Local Storage not available")
    }
}

function checkAnswer() {
    if (cityMap === undefined) {
        return;
    }

    if (isPlaying) {
        setTimeout(checkAnswer, 500);
        return;
    }

    document.getElementById("btn_run").innerHTML = '<span class="glyphicon glyphicon-play"></span> DEMARRER';
    if (cityMap.isFinished()) {
        if (maxBlocks === undefined || maxBlocks >= Blockly.getMainWorkspace().getAllBlocks().length) {
            popupGood();
            document.getElementById("btn_run").style.display = "none";
            document.getElementById("btn_next_exercise").style.display = "block";
        }
        else {
            bootbox.alert({
                message: '<div class="text-center">Attention tu as mis trop de blocs!<br><h3>Il faut mettre au maximum : <strong>' + maxBlocks + '</strong> blocs.</h3><br><br><img src="../../../assets/img/bad.svg" alt="Robot badface" height="200px"></div>',
                backdrop: true
            });
        }

    }
    else {
        popupNotGood();
    }
}

// Function execute when all things are loaded
function allLoaded() {
    createButtons(13);
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    autoResize();
    if (text_info !== undefined && text_info != null) {
        popupInfo(text_info);
    }
}