/*
 * ===============================================================================================================
 * ===============================================================================================================
 * ======================       DEFINITIONS DES BLOCKS                           =================================
 * ===============================================================================================================
 * ===============================================================================================================
 */
Blockly.Blocks['avancer'] = {
    init: function() {
        this.appendValueInput("Avancer")
            .setCheck("Number")
            .appendField("Avancer");
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
            .appendField(new Blockly.FieldDropdown([["45° degrés","45"], ["90° degrés","90"], ["120° degrés","120"]]), "Angle");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(20);
        this.setTooltip('Tourner de ... degrés');
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
    var value_avancer = Blockly.JavaScript.valueToCode(block, 'Avancer', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type":"avancer","value":'+value_avancer+'},';
    return code;
};
Blockly.JavaScript['tourner'] = function(block) {
    var dropdown_angle = block.getFieldValue('Angle');
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type":"tourner","value":'+dropdown_angle+'},';
    return code;
};