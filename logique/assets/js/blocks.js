Blockly.Blocks['test_shape'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Forme =")
            .appendField(new Blockly.FieldDropdown([["Tête", "head"], ["Bras", "arm"], ["Corps", "body"], ["Jambe", "leg"], ["Autre", "other"]]), "shape_type");
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip('Test le type de forme');
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['test_shape'] = function (block) {
    var dropdown_shape_type = block.getFieldValue('shape_type');

    var code = 'item.shape === "' + dropdown_shape_type + '"';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['test_color'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Couleur =")
            .appendField(new Blockly.FieldColour("#ff0000"), "shape");
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip('Test la couleur');
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['test_color'] = function (block) {
    var colour_shape = block.getFieldValue('shape');

    var code = 'item.color === "' + colour_shape + '"';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['bucket'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Mettre dans le seau")
            .appendField(new Blockly.FieldDropdown([["Tête", "0"], ["Bras", "1"], ["Corps", "2"], ["Jambe", "3"], ["Autre", "4"]]), "bucket_idx");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(345);
        this.setTooltip('Choisit le seau dans lequel mettre l\'objet');
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['bucket'] = function (block) {
    var dropdown_bucket_idx = block.getFieldValue('bucket_idx');

    var code = 'return ' + dropdown_bucket_idx + ';\n';
    return code;
};