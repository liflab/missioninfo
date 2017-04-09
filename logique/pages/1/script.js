var blocks = [];

blocks.push(new LogicBlock("B1", 3, "(this.inputs[0].value && this.inputs[1].value) || !this.inputs[2].value"));
blocks.push(new LogicBlock("B2", 4, "(this.inputs[0].value || this.inputs[1].value) && (!this.inputs[2].value || this.inputs[3].value)"));
blocks.push(new LogicBlock("B3", 2, "this.inputs[0].value || this.inputs[1].value"));
blocks.push(new LogicBlock("B4", 2, "this.inputs[0].value && !this.inputs[1].value"));

var board = new LogicBoard(blocks, 800);

function setup() {
    var canvas = createCanvas(800, 600);
    canvas.parent('sketch-holder');
    noLoop();

    board.update();
    board.show();
}

function mouseClicked() {
    board.handleInput(mouseX,mouseY);
    // console.log(mouseX + "/" + mouseY);
    return false;
}