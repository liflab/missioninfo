Blockly.Blocks['change_direction'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Changer la direction : ")
            .appendField(new Blockly.FieldDropdown([["Nord", "N"], ["Sud", "S"], ["Est", "E"], ["Ouest", "W"]]), "dir");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(320);
        this.setTooltip('Change la direction');
        this.setHelpUrl('');
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
        this.setHelpUrl('');
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
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['jusque_fin'] = function (block) {
    var statements_to_repeat = Blockly.JavaScript.statementToCode(block, 'to_repeat');

    var code = 'while(!cityMap.isFinished()) {\n' + statements_to_repeat + '};\n';
    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['virage_dir'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("chemin ")
            .appendField(new Blockly.FieldDropdown([["Gauche", "L"], ["Droite", "R"], ["Devant", "F"]]), "dir")
            .appendField("?");
        this.setOutput(true, null);
        this.setColour(0);
        this.setTooltip('Retourne VRAI si un virage est possible dans se sens');
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['virage_dir'] = function (block) {
    var dropdown_dir = block.getFieldValue('dir');

    var code = 'cityMap.testTurn("' + dropdown_dir + '")';
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
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['tourne_dir'] = function (block) {
    var dropdown_dir = block.getFieldValue('dir');

    var code = 'cityMap.turn("' + dropdown_dir + '");\nawait sleep(500);\nif(!isPlaying) {return};\n';
    return code;
};