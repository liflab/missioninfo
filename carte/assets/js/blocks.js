Blockly.Blocks['change_direction'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Changer la direction : ")
            .appendField(new Blockly.FieldDropdown([["Nord", "N"], ["Sud", "S"], ["Est", "E"], ["Ouest", "W"]]), "dir");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(320);
        this.setTooltip('Change la direction');
    }
};

Blockly.JavaScript['change_direction'] = function (block) {
    var dropdown_dir = block.getFieldValue('dir');

    var code = 'cityMap.changeDirPlayer("' + dropdown_dir + '");\nawait sleep(500);\nif(!isPlaying) {return};\n';
    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['avance'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Avancer");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(50);
        this.setTooltip('');
    }
};

Blockly.JavaScript['avance'] = function (block) {
    var code = 'cityMap.movePlayer();\nawait sleep(500);\nif(!isPlaying) {return};\n';
    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['jusque_fin'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Répéter jusqu'à l'arrivée");
        this.appendStatementInput("to_repeat")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setColour(120);
        this.setTooltip('Execute les blocs jusqu\'à l\'arrivée');
    }
};

Blockly.JavaScript['jusque_fin'] = function (block) {
    var statements_to_repeat = Blockly.JavaScript.statementToCode(block, 'to_repeat');

    var code = 'while(!cityMap.isFinished() && isPlaying) {\n' + statements_to_repeat + 'await sleep(100);\n};\n';
    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['jusque_condition'] = {
    init: function () {
        this.appendValueInput("condition")
            .appendField("Répéter jusqu'à ")
            .setCheck("Boolean");
        this.appendStatementInput("to_repeat__")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip('Execute les blocs jusqu\'à ce que la condition soit vraie');
    }
};

Blockly.JavaScript['jusque_condition'] = function (block) {
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_to_repeat = Blockly.JavaScript.statementToCode(block, 'to_repeat__');

    var code = 'while(!' + value_condition + ' && isPlaying) {\n' + statements_to_repeat + 'await sleep(100);\n};\n';
    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['virage_dir'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("chemin ")
            .appendField(new Blockly.FieldDropdown([["sur la Gauche", "L"], ["sur la Droite", "R"], ["droit Devant", "F"]]), "dir");
        this.setOutput(true, "Boolean");
        this.setColour(0);
        this.setTooltip('Retourne VRAI si un virage est possible dans se sens');
    }
};

Blockly.JavaScript['virage_dir'] = function (block) {
    var dropdown_dir = block.getFieldValue('dir');

    var code = 'cityMap.testTurn("' + dropdown_dir + '")';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['tresor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("un trésor");
        this.setOutput(true, "Boolean");
        this.setColour(0);
        this.setTooltip('Retourne VRAI si le robot se trouve sur un trésor');
    }
};

Blockly.JavaScript['tresor'] = function (block) {
    var code = 'cityMap.isOnTreasure()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['fin'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("la fin");
        this.setOutput(true, "Boolean");
        this.setColour(0);
        this.setTooltip('Retourne VRAI si le robot a fini');
    }
};

Blockly.JavaScript['fin'] = function (block) {
    var code = 'cityMap.isFinished()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['tourne_dir'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Tourner à : ")
            .appendField(new Blockly.FieldDropdown([["Gauche", "L"], ["Droite", "R"]]), "dir");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(320);
        this.setTooltip('Tourne vers le sens indiqué');
    }
};

Blockly.JavaScript['tourne_dir'] = function (block) {
    var dropdown_dir = block.getFieldValue('dir');

    var code = 'cityMap.turn("' + dropdown_dir + '");\nawait sleep(500);\nif(!isPlaying) {return};\n';
    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['demi_tour'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Faire demi-tour");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(320);
        this.setTooltip('Fait un demi-tour au robot');
    }
};

Blockly.JavaScript['demi_tour'] = function (block) {
    var code = 'cityMap.turn("R");cityMap.turn("R");\nawait sleep(500);\nif(!isPlaying) {return};\n';
    return code;
};