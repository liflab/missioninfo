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
            .appendField(new Blockly.FieldAngle(300), "ValTurn");
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
    var code = '{"avancer":'+value_avancer+'},';
    return code;
};

Blockly.JavaScript['tourner'] = function(block) {
    var angle_valturn = block.getFieldValue('ValTurn');
    // TODO: Assemble JavaScript into code variable.
    var code = '{"tourner":'+angle_valturn+'},';
    return code;
};