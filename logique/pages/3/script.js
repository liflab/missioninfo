text_info = "\nCommençons par mon début ! Ma tête !\nTrions les trois que tu as triés tout à l'heure.\nMa tête est la bleue et arrondie !";

bucketsExercise = {
    elems: [
        new TextShape("Bleu arrondi", "#2223ff"),
        new TextShape("Gris", "#eeeeee"),
        new TextShape("Beige", "#e0ac69"),
    ],
    rules: [
        "return item.shape == \"rounded\" && item.color == \"#2223ff\";",
        "return item.shape == \"rounded\";",
        "return item.color == \"#e0ac69\";"
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
    items.push({"img":loadImage("../../assets/img/head.png")        ,"shape":"rounded"   ,"color":"#2223ff"});
    items.push({"img":loadImage("../../assets/img/helmet_r2d2.png") ,"shape":"rounded"   ,"color":"#eeeeee"});
    items.push({"img":loadImage("../../assets/img/human_head.png")  ,"shape":"oval"      ,"color":"#e0ac69"});
}