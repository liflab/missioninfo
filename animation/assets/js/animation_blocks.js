Blockly.Blocks['cercle'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Cercle");
        this.appendDummyInput();
        this.appendValueInput("coord_center")
            .setCheck("coordonnees")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Position du centre");
        this.appendValueInput("taille")
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

Blockly.JavaScript['cercle'] = function (block) {
    var value_coord_center = Blockly.JavaScript.valueToCode(block, 'coord_center', Blockly.JavaScript.ORDER_ATOMIC);
    var value_taille = Blockly.JavaScript.valueToCode(block, 'taille', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'drawCircle(' + value_coord_center + ',' + value_taille + ',true);\n';

    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['carre'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Carré");
        this.appendDummyInput();
        this.appendValueInput("coord_center")
            .setCheck("coordonnees")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Position du centre");
        this.appendValueInput("taille")
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

Blockly.JavaScript['carre'] = function (block) {
    var value_coord_center = Blockly.JavaScript.valueToCode(block, 'coord_center', Blockly.JavaScript.ORDER_ATOMIC);
    var value_taille = Blockly.JavaScript.valueToCode(block, 'taille', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'drawSquare(' + value_coord_center + ',' + value_taille + ',true);\n';

    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['couleur'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Fixer la couleur à ")
            .appendField(new Blockly.FieldColour("#ff0000"), "fill");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip('Change la couleur');
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['couleur'] = function (block) {
    var colour_fill = block.getFieldValue('fill');

    var code = "fill('" + colour_fill + "');\n";
    code += "stroke('" + colour_fill + "');\n";
    code += "currentColor = '" + colour_fill + "';\n";
    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['ligne'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Ligne");
        this.appendDummyInput();
        this.appendValueInput("coord_deb")
            .setCheck("coordonnees")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Position début");
        this.appendValueInput("coord_fin")
            .setCheck("coordonnees")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Position fin");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(135);
        this.setTooltip('Ajoute une ligne');
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['ligne'] = function (block) {
    var value_coord_deb = Blockly.JavaScript.valueToCode(block, 'coord_deb', Blockly.JavaScript.ORDER_ATOMIC);
    var value_coord_fin = Blockly.JavaScript.valueToCode(block, 'coord_fin', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'drawLine(' + value_coord_deb + ',' + value_coord_fin + ',true);\n';

    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['coords'] = {
    init: function () {
        this.appendValueInput("x")
            .setCheck("Number")
            .appendField("X");
        this.appendValueInput("y")
            .setCheck("Number")
            .appendField("Y");
        this.setInputsInline(false);
        this.setOutput(true, "coordonnees");
        this.setColour(180);
        this.setTooltip('Position sur le plan');
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['coords'] = function (block) {
    var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);

    var code = '{x: ' + value_x + ',';
    code += 'y: ' + value_y + '}';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['rectangle'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Rectangle");
        this.appendDummyInput();
        this.appendValueInput("coord_center")
            .setCheck("coordonnees")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Position du centre");
        this.appendValueInput("hauteur")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Hauteur");
        this.appendValueInput("largeur")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Largeur");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(135);
        this.setTooltip('Dessine un rectangle');
        this.setHelpUrl('');
    }
};

Blockly.JavaScript['rectangle'] = function (block) {
    var value_coord_center = Blockly.JavaScript.valueToCode(block, 'coord_center', Blockly.JavaScript.ORDER_ATOMIC);
    var value_hauteur = Blockly.JavaScript.valueToCode(block, 'hauteur', Blockly.JavaScript.ORDER_ATOMIC);
    var value_largeur = Blockly.JavaScript.valueToCode(block, 'largeur', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'drawRect(' + value_coord_center + ',' + value_hauteur + ',' + value_largeur + ',true);\n';

    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['for_each_frame'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Pour chaque image dessiner");
    this.appendStatementInput("each_frame")
        .setCheck(null);
    this.setColour(0);
    this.setTooltip('Execute les blocs pour chaque image');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['for_each_frame'] = function(block) {
  var statements_each_frame = Blockly.JavaScript.statementToCode(block, 'each_frame').replace(/(\r\n|\n|\r)/gm,"");
  
  var code = 'frame = -1; drawResponse = new Function ("' + statements_each_frame + '"); playAnim();\n';
  return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['num_frame'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Variable : Temps");
    this.setOutput(true, "Number");
    this.setColour(270);
    this.setTooltip('Renvoie le numéro de l\'image');
    this.setHelpUrl('');
  }
};

Blockly.JavaScript['num_frame'] = function(block) {
  var code = 'frame';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};