Blockly.Blocks['changeDirection'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Direction : ")
            .appendField(new Blockly.FieldDropdown([["Nord", "N"], ["Sud", "S"], ["Est", "E"], ["Ouest", "W"]]), "dir");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(320);
        this.setTooltip('Change la direction');
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['changeDirection'] = function (block) {
    var dropdown_dir = block.getFieldValue('dir');

    var code = 'cityMap.changeDirPlayer("' + dropdown_dir + '");\n';
    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['avance'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Avance");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['avance'] = function (block) {
    var code = 'cityMap.movePlayer();\nawait sleep(500);\n';
    return code;
};