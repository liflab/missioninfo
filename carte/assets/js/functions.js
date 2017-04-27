// Constants
WIDTH = 600;
HEIGHT = 600;
COLS = 10;
ROWS = 10;
DEBUG = false;

// Globals variables
var img_road_deb;
var img_road_1;
var img_road_2;
var img_road_3;
var img_road_4;
var img_road_fin;
var img_player;
var img_bg;

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
    this.player = {row: 0, col: 0};
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

    this.movePlayer = function (dir) {
        if (this.roadAvailable(dir)) {
            if (dir === "N") {
                this.player.row = this.player.row - 1;
            }
            else if (dir === "S") {
                this.player.row = this.player.row + 1;
            }
            else if (dir === "W") {
                this.player.col = this.player.col - 1;
            }
            else if (dir === "E") {
                this.player.col = this.player.col + 1;
            }

            this.draw();
        }
        else {
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

function Player() {

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