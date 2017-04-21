bucketsExercise = {
    elems: [
        new TextShape("Tête", "#fff"),
        new TextShape("Bras",  "#fff"),
        new TextShape("Corps", "#fff"),
        new TextShape("Jambe", "#fff"),
        new TextShape("Autre", "#fff"),
    ],
    rules: [
        "return item.shape === \"head\";",
        "return item.shape === \"arm\";",
        "return item.shape === \"body\";",
        "return item.shape === \"leg\";",
        "return item.shape === \"other\";"
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