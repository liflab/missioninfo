text_info = "\nIl y a beaucoup de choses à trier ... \nRépartis les objets en fonction de leur forme !";

bucketsExercise = {
    elems: [
        new TextShape("Tête", "#fff"),
        new TextShape("Bras",  "#fff"),
        new TextShape("Corps", "#fff"),
        new TextShape("Roue", "#fff"),
    ],
    rules: [
        "return item.shape === \"head\";",
        "return item.shape === \"arm\";",
        "return item.shape === \"body\";",
        "return item.shape === \"leg\";",
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
    items.push({"img_url":"../../assets/img/arm.png"         ,"shape":"arm"    ,"color":"orange"});
    items.push({"img_url":"../../assets/img/body.png"        ,"shape":"body"   ,"color":"white"});
    items.push({"img_url":"../../assets/img/head.png"        ,"shape":"head"   ,"color":"blue"});
    items.push({"img_url":"../../assets/img/helmet_r2d2.png" ,"shape":"head"   ,"color":"blue"});
    items.push({"img_url":"../../assets/img/body_other.png"  ,"shape":"body"   ,"color":"white"});
    items.push({"img_url":"../../assets/img/wheel.png"       ,"shape":"leg"    ,"color":"grey"});
    items.push({"img_url":"../../assets/img/human_head.png"  ,"shape":"head"   ,"color":"beige"});
}