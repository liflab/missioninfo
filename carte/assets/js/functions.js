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

var cityMap;
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

    img_player = loadImage("../../assets/img/player.png");

    img_bg = loadImage("../../assets/img/p1_bg.png");
}

// Objects used in this section
function Map() {

    // this.background = bg;
    this.player = {row: 0, col: 0, dir: "N"};
    this.roads = new Array(ROWS);
    for (var row = 0; row < ROWS; row++) {
        this.roads[row] = new Array(COLS);
    }

    this.init = function (listRoads) {
        for (var i = 0; i < listRoads.length; i++) {
            this.roads[listRoads[i].row][listRoads[i].col] = listRoads[i].data;

            // Init player with deb tile
            if (listRoads[i].data.style === "deb") {
                this.player.row = listRoads[i].row;
                this.player.col = listRoads[i].col;
            }
        }
    };

    this.roadAvailable = function () {
        var res = false;

        try {
            if (this.player.dir === "N") {
                res = this.roads[this.player.row - 1][this.player.col] !== undefined;
            }
            else if (this.player.dir === "S") {
                res = this.roads[this.player.row + 1][this.player.col] !== undefined;
            }
            else if (this.player.dir === "W") {
                res = this.roads[this.player.row][this.player.col - 1] !== undefined;
            }
            else if (this.player.dir === "E") {
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

    this.changeDirPlayer = function (dir) {
        this.player.dir = dir;
    };

    this.movePlayer = function () {
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
                }
            }
        }

        image(img_player, this.player.col * (WIDTH / COLS), this.player.row * (HEIGHT / ROWS));
    }
}

// Functions for blocks coding
function run_code() {
    // Wait to finish animation before another run
    var status = false;
    try {
        status = isPlaying;
    }
    catch (err) {
    }

    if (!status) {
        reinit_code();

        try {
            code = window.Blockly.JavaScript.workspaceToCode(window.Blockly.getMainWorkspace());
            console.log(code);
            eval("answer = async function() { isPlaying = true;\n" + code + "isPlaying = false;}");
            save_code();
            answer();
            checkAnswer();
        }
        catch (err) {
            popupNotGood();
            console.log(err);
        }
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

function checkAnswer() {
    if (cityMap === undefined) {
        return;
    }

    if (isPlaying) {
        setTimeout(checkAnswer, 500);
        return;
    }

    if (cityMap.isFinished()) {
        popupGood();
    }
    else {
        popupNotGood();
    }
}

// Function execute when all things are loaded
function allLoaded() {
    createButtons(6);
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    autoResize();
    if (text_info !== undefined && text_info != null) {
        popupInfo(text_info);
    }
}