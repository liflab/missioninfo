popupInfo("J'ai ma tête, mais il me manque mon petit chapeau, et mes yeux !\nMon chapeau est constitué de petits ronds oranges.\nMes yeux sont bleus, retrouves-les !\n**Utilises le bloc \"OU\" et le bloc \"ET\" !**");

required_box.push({"name":"OU","value":"||"});
required_box.push({"name":"ET","value":"&&"});

bucketsExercise = {
    elems: [
        new TextShape("Chapeau ou Oeil", "#ffffff"),
        new TextShape("Autre Oeil",      "#ffffff"),
        new TextShape("Autre chapeau",   "#ffffff"),
    ],
    rules: [
        "return item.shape == \"eye\" && item.color == \"#0000ff\" || item.shape == \"hat\" && item.color == \"#ffa500\";",
        "return item.shape == \"eye\" && item.color != \"#0000ff\";",
        "return item.shape == \"hat\" && item.color != \"#ffa500\";",
    ]
};

logicExercise = new LogicSystem(bucketsExercise);

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    noLoop();
    initParams();

    logicExercise.draw(-1);
}

function _preload(){
    items.push({"img_url":"../../assets/img/eye.png"             ,"shape":"eye"       ,"color":"#0000ff"});
    items.push({"img_url":"../../assets/img/eye_white.png"       ,"shape":"eye"       ,"color":"#ffffff"});
    items.push({"img_url":"../../assets/img/eye_green.png"       ,"shape":"eye"       ,"color":"#00ff00"});
    items.push({"img_url":"../../assets/img/hat.png"             ,"shape":"hat"       ,"color":"#ffa500"});
    items.push({"img_url":"../../assets/img/hat_red.png"         ,"shape":"hat"       ,"color":"#ff0000"});
    items.push({"img_url":"../../assets/img/hat_graduation.png"  ,"shape":"hat"       ,"color":"#000000"});
    items.push({"img_url":"../../assets/img/hat_blue.png"        ,"shape":"hat"       ,"color":"#0000ff"});

}