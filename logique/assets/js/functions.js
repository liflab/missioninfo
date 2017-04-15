// Function execute when all things are loaded
function allLoaded() {
    createButtons(2);
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    autoResize();
}

// Objects used in this activity
function LogicBoard(blocks, width) {
    // Blocks
    this.blocks = blocks;

    // Methods
    this.update = function () {
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].update();
        }
    }

    // Display
    this.show = function () {
        background(220);
        resetMatrix();
        translate((width - 615) / 2, 0);
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].show();
            translate(0, this.blocks[i].height);
        }
    }

    // Events
    this.handleInput = function (x, y) {
        var sum_height = 0;
        for (var i = 0; i < this.blocks.length; i++) {
            if (y < sum_height + this.blocks[i].height) {
                // console.log("block clicked : " + i);
                this.blocks[i].handleInput(x - ((width - 615) / 2), y - sum_height);
                break;
            }
            sum_height += this.blocks[i].height;
        }
        this.show();
    }
}

function LogicBlock(block_name, nb_inputs, rule) {
    this.name = block_name;

    // Create Inputs
    this.inputs = [];
    for (var i = 0; i < nb_inputs; i++) {
        this.inputs.push({
            name: block_name + "_" + String.fromCharCode(65 + i),
            value: false
        });
    }

    // Create Output
    this.output = false

    // Create Rule / Format : "this.inputs[0].value && this.inputs[1].value || !this.inputs[2].value"
    this.rule = rule;

    // Methods
    this.changeInputState = function (idx) {
        this.inputs[idx].value = !(this.inputs[idx].value);
        this.update();
    }

    this.update = function () {
        this.output = eval(rule);
    }

    // Display
    this.height = 40 + this.inputs.length * 40;

    this.show = function () {
        // Show Inputs
        for (var i = 0; i < this.inputs.length; i++) {
            if (this.inputs[i].value) {
                fill("red");
            }
            else {
                fill("black");
            }
            stroke("darkcyan"), strokeWeight(5);
            line(0, 40 + i * 40, 200, 40 + i * 40);
            noStroke();
            ellipse(0, 40 + i * 40, 30);
            text(this.inputs[i].name, 20, 34 + i * 40);
        }
        // Show Output
        if (this.output) {
            fill("red");
        }
        else {
            fill("black");
        }
        stroke("darkcyan"), strokeWeight(5);
        line(400, 20 + this.inputs.length * 20, 600, 20 + this.inputs.length * 20);
        noStroke();
        ellipse(600, 20 + this.inputs.length * 20, 30);
        text(this.name, 500, 15 + this.inputs.length * 20);
        // Show box
        fill("green");
        rect(200, 20, 200, this.inputs.length * 40);
    }

    // Events
    this.handleInput = function (x, y) {
        if (x > -15 && x < 15) {
            var idx = Math.round((y - 40) / 40);
            console.log("Input clicked : " + idx);
            if (idx >= 0 && idx < this.inputs.length) {
                this.changeInputState(idx);
            }
        }
    }
}