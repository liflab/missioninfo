var shape_per_page = [];
var put_in_bucket  = [];

switch(parseInt(window.location.href.match(new RegExp("[0-9]+", "g")).splice(-1))){
    case 2:
        shape_per_page = [["Tête", "head"], ["Bras", "arm"], ["Corps", "body"], ["Jambe", "leg"], ["Autre", "other"]];
        put_in_bucket  = [["Tête", "0"], ["Bras", "1"], ["Corps", "2"], ["Jambe", "3"], ["Autre", "4"]];
    break;
    case 3:
        shape_per_page = [["Arrondi", "rounded"], ["Oval", "oval"]];
        put_in_bucket  = [["Bleu Arrondi","0"],["Gris","1"],["Beige","2"]];
    break;
    case 4:
        shape_per_page = [["Oeil", "eye"], ["Chapeau", "hat"]];
        put_in_bucket  = [["Chapeau & Oeil","0"],["Autre Oeil","1"],["Autre chapeaux","2"]];
    break;
    case 5:
        shape_per_page = [["Bras", "arm"], ["Main", "hand"], ["Corps", "body"]];
        put_in_bucket  = [["Bras & Main","0"],["Corps Bleu","1"],["Autre Corps","2"]];
    break;
    case 6:
        shape_per_page = [["Fusée", "prop"], ["Roue", "wheel"], ["Chapeau", "hat"]];
        put_in_bucket  = [["Roue & Fusée","0"],["Collection","1"],["Inutile","2"]];
    break;
}

Blockly.Blocks['test_shape'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Forme =")
            .appendField(new Blockly.FieldDropdown(shape_per_page), "shape_type");
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
            .appendField(new Blockly.FieldDropdown(put_in_bucket), "bucket_idx");
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