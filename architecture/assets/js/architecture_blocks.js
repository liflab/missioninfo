/*
 * ===============================================================================================================
 * ===============================================================================================================
 * ======================       DEFINITIONS DES BLOCKS                           =================================
 * ===============================================================================================================
 * ===============================================================================================================
 */


Blockly.FieldColour.COLOURS = ['#f00','#ff0','#00f'];
Blockly.FieldColour.COLUMNS = 3;

var dropdown_angle;
/*
 ["1° degrés","1"],
 ["45° degrés","45"],
 ["72° degrés","72"],
 ["135° degrés","135"],
 ["144° degrés","144"],
 ["180° degrés","180"]
 */
switch(parseInt(window.location.href.match(new RegExp("[0-9]+", "g")).splice(-1))){
    case 1:
    case 2:
    case 3:
        dropdown_angle = [
            ["90° degrés","90"]
        ];
    break;
    case 4:
        dropdown_angle = [
            ["90° degrés","90"],
            ["144° degrés","144"]
        ];
    break;
    case 5:
        dropdown_angle = [
            ["90° degrés","90"],
            ["26.42° degrés","26.42"],
            ["180° degrés","180"],
        ];
    break;
    default:
        dropdown_angle = [
            ["90° degrés","90"]
        ];
}

Blockly.Blocks['avancer'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Avancer de")
            .appendField(new Blockly.FieldNumber(4, 0, 50), "Avancer");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('Avancer de ...');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['tourner'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Tourner de")
            .appendField(new Blockly.FieldDropdown(dropdown_angle), "Angle");
        this.appendDummyInput()
            .appendField("vers la ")
            .appendField(new Blockly.FieldDropdown([
                ["Droite","1"],
                ["Gauche","-1"]
            ]), "Direction");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('Tourner de ... degrés');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['lever_le_crayon'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Lever le crayon");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip('Lever le crayon');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['poser_le_crayon'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Poser le crayon");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip('Poser le crayon');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['crayon_de_couleur'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Crayon de couleur")
            .appendField(new Blockly.FieldColour("#ff0000"), "COLOR");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(30);
        this.setTooltip('Crayon de couleur');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['boucle'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Faire")
            .appendField(new Blockly.FieldNumber(0, 0, 360, 1), "ITERATION")
            .appendField("fois ...");
        this.appendStatementInput("NAME")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(150);
        this.setTooltip('Boucle ');
        this.setHelpUrl('');
    }
};
Blockly.Blocks['courbe'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Accéder au point");
        this.appendDummyInput()
            .appendField("X : ")
            .appendField(new Blockly.FieldNumber(0, 0, 200), "end_x");
        this.appendDummyInput()
            .appendField("Y : ")
            .appendField(new Blockly.FieldNumber(0, 0, 200), "end_y");
        this.appendDummyInput()
            .appendField("En passant par le point");
        this.appendDummyInput()
            .appendField("X : ")
            .appendField(new Blockly.FieldNumber(0, 0, 200), "mid_x");
        this.appendDummyInput()
            .appendField("Y : ")
            .appendField(new Blockly.FieldNumber(0, 0, 200), "mid_y");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('Courbe');
        this.setHelpUrl('');
    }
};

/*
 * ===============================================================================================================
 * ===============================================================================================================
 * ======================       DEFINITIONS DES FONCTIONS DES BLOCS              =================================
 * ===============================================================================================================
 * ===============================================================================================================
 */
Blockly.JavaScript['avancer'] = function(block) {
    var number_avancer = block.getFieldValue('Avancer');
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type":"avancer","value":'+number_avancer+'},';
    return code;
};
Blockly.JavaScript['tourner'] = function(block) {
    var dropdown_angle = parseFloat(block.getFieldValue('Angle'));
    var dropdown_direction = parseFloat(block.getFieldValue('Direction'));
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type":"tourner","value":'+(dropdown_angle*dropdown_direction)+'},';
    return code;
};
Blockly.JavaScript['lever_le_crayon'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type":"crayon_leve","value":true},';
    return code;
};

Blockly.JavaScript['poser_le_crayon'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type":"crayon_leve","value":false},';
    return code;
};

Blockly.JavaScript['crayon_de_couleur'] = function(block) {
    var colour_color = block.getFieldValue('COLOR');
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type":"crayon_color","value":"'+colour_color+'"},';
    return code;
};

Blockly.JavaScript['boucle'] = function(block) {
    var number_iteration = block.getFieldValue('ITERATION');
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type":"boucle","nb_iteration":'+number_iteration+',"value":['+statements_name+']},';
    return code;
};
Blockly.JavaScript['courbe'] = function(block) {
    var number_end_x = block.getFieldValue('end_x');
    var number_end_y = block.getFieldValue('end_y');
    var number_mid_x = block.getFieldValue('mid_x');
    var number_mid_y = block.getFieldValue('mid_y');
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type":"courbe","end":{"x":'+number_end_x+',"y":'+number_end_y+'},"mid":{"x":'+number_mid_x+',"y":'+number_mid_y+'}},';
    return code;
};