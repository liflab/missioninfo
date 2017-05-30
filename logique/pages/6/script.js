popupInfo("Je suis quasiment entier, il ne me manque plus que de quoi me déplacer !\nTrouve ma fusée et ma roue ! De plus, je me suis lancé une collection\nde chapeaux. J'ai déjà un bleu, peux-tu me prendre les autres ?\n**Utilise obligatoirement les blocs \"PAS\", \"OU\" et \"ET\"**");

required_box.push({"name":"PAS","value":"!("});
required_box.push({"name":"OU","value":"||"});


bucketsExercise = {
    elems: [
        new TextShape("Roue ou Fusée", "#c0c0c0"),
        new TextShape("Collection",  "#ffffff"),
        new TextShape("Inutile", "#ffffff"),
    ],
    rules: [
        "return item.shape == \"wheel\" || item.shape == \"prop\";",
        "return item.shape == \"hat\" && item.color != \"#0000ff\";",
        "return item.shape == \"hat\" && item.color == \"#0000ff\";",
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
    items.push({"img_url":"../../assets/img/wheel.png"             ,"shape":"wheel"       ,"color":"#c0c0c0"});
    items.push({"img_url":"../../assets/img/prop.png"              ,"shape":"prop"        ,"color":"#c0c0c0"});
    items.push({"img_url":"../../assets/img/hat_blue.svg"          ,"shape":"hat"         ,"color":"#0000ff"});
    items.push({"img_url":"../../assets/img/hat_red.png"           ,"shape":"hat"         ,"color":"#ff0000"});
    items.push({"img_url":"../../assets/img/hat_graduation.png"    ,"shape":"hat"         ,"color":"#000000"});
    items.push({"img_url":"../../assets/img/hat_green.png"         ,"shape":"hat"         ,"color":"#00ff00"});
    items.push({"img_url":"../../assets/img/hat_orange.png"        ,"shape":"hat"         ,"color":"#ffa500"});

}