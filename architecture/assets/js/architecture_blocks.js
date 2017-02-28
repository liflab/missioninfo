/*
 * ===============================================================================================================
 * ===============================================================================================================
 * ======================       DEFINITIONS DES BLOCKS                           =================================
 * ===============================================================================================================
 * ===============================================================================================================
 */
Blockly.FieldColour.COLOURS = ['#f00','#ff0','#00f'];
Blockly.FieldColour.COLUMNS = 3;

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
            .appendField(new Blockly.FieldDropdown([
                ["1° degrés","1"],
                ["45° degrés","45"],
                ["72° degrés","72"],
                ["90° degrés","90"],
                ["135° degrés","135"],
                ["144° degrés","144"],
                ["180° degrés","180"],
                ["270° degrés","270"]
            ]), "Angle");
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
    var dropdown_angle = block.getFieldValue('Angle');
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type":"tourner","value":'+dropdown_angle+'},';
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