text_info = "Commençons par mon début ! Ma tête !\nTrions les trois têtes que tu as triés tout à l'heure.\nLa mienne est bleue et arrondie !\n**Utilise le bloc \"ET\" !**";

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
    items.push({"img_url":"../../assets/img/head.png"        ,"shape":"rounded"   ,"color":"#2223ff"});
    items.push({"img_url":"../../assets/img/helmet_r2d2.png" ,"shape":"rounded"   ,"color":"#aaaaaa"});
    items.push({"img_url":"../../assets/img/human_head.png"  ,"shape":"oval"      ,"color":"#e0ac69"});
}