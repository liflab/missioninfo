Blockly.Blocks['block_1'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Place-moi");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('Place-moi sur le plan de travail');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['block_1'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'stringAnswer += "O";\n';
  return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['block_2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Place-moi");
    this.appendDummyInput()
        .appendField("En dessous du bloc violet");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
    this.setTooltip('Place-moi sur le plan de travail');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['block_2'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'stringAnswer += "K";\n';
  return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['block_delete'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Supprime-moi");
    this.setColour(230);
    this.setTooltip('Supprime moi du plan de travail');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['block_delete'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'stringAnswer += "NO";\n';
  return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['block_help'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Besoin d'aide ?");
    this.appendDummyInput();
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Choix     ")
        .appendField(new Blockly.FieldDropdown([[{"src":"https://www.gstatic.com/codesite/ph/images/star_on.gif","width":15,"height":15,"alt":"singe"},"SINGE"], [{"src":"https://www.gstatic.com/codesite/ph/images/star_on.gif","width":15,"height":15,"alt":"chat"},"CHAT"], [{"src":"https://www.gstatic.com/codesite/ph/images/star_on.gif","width":15,"height":15,"alt":"chien"},"CHIEN"]]), "choix");
    this.setColour(230);
    this.setTooltip('Clique-droit sur moi pour avoir de l\'aide');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['block_help'] = function(block) {
  var dropdown_choix = block.getFieldValue('choix');
  // TODO: Assemble JavaScript into code variable.
  var code = 'stringAnswer ="' + dropdown_choix + '";\n';
  return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['affiche'] = {
  init: function() {
    this.appendValueInput("input")
        .setCheck("String")
        .appendField("Affiche");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('Affiche du texte à l\'écran');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['affiche'] = function(block) {
  var value_input = Blockly.JavaScript.valueToCode(block, 'input', Blockly.JavaScript.ORDER_ATOMIC);  // TODO: Assemble JavaScript into code variable.
  var code = 'blockAfficheDown = true;\n';
  if(value_input) {
    code += 'stringAnswer =' + value_input + ';\n';
  }
  return code;
};

///////////////////////////////////////////////////////////////////