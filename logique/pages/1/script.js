function preload() {
    img = loadImage("../../assets/img/factory.svg");
}

function setup() {
    var canvas = createCanvas(800, 600);
    canvas.parent('sketch-holder');
    noLoop();

    image(img, 154, 0, 493, 600);

    rectMode(CENTER);
    fill("blue");
    noStroke();
    rect(380, 55, 50, 50);
    fill("black");
    rect(392, 520, 50, 50);
    fill("green");
    ellipse(238, 520, 50, 50);

    fill("red");
    textSize(24);
    text("ROUGE", 510, 530);
}