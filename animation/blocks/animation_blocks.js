Blockly.Blocks['cercle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Cercle");
    this.appendDummyInput();
    this.appendValueInput("x")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("X");
    this.appendValueInput("y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Y");
    this.appendValueInput("size")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Taille");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
    this.setTooltip('Dessine un cercle');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['carre'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Carré");
    this.appendDummyInput();
    this.appendValueInput("x")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("X");
    this.appendValueInput("y")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Y");
    this.appendValueInput("size")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Taille");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
    this.setTooltip('Dessine un carré');
    this.setHelpUrl('');
  }
};

Blockly.FieldColour.COLOURS = ['#ff0000','#00ff00'];
Blockly.FieldColour.COLUMNS = 2;
Blockly.Blocks['couleur'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Couleur")
        .appendField(new Blockly.FieldColour("#ff0000"), "fill");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip('Change la couleur');
    this.setHelpUrl('');
  }
};