bucketsExercise = {
    elems: [
        new Shape("square", "#00ff00"),
        new Shape("circle", "#000000"),
        new TextShape("ROUGE", "#ff0000")
    ],
    rules: [
        "return shape.style === \"square\" && shape.color === \"#00ff00\";",
        "return shape.style === \"circle\";",
        "return shape.color === \"#ff0000\";"
    ]
};

logicExercise = new LogicSystem(bucketsExercise);

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    noLoop();

    logicExercise.draw(-1);

}