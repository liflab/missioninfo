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
        this.setHelpUrl('../../../aide/aide.html?file=formes.md');
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
        this.setHelpUrl('../../../aide/aide.html?file=formes.md');
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
        this.setHelpUrl('../../../aide/aide.html?file=couleur.md');
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
        this.setHelpUrl('../../../aide/aide.html?file=formes.md');
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
        this.setHelpUrl('../../../aide/aide.html?file=coords.md');
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
        this.setHelpUrl('../../../aide/aide.html?file=formes.md');
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

Blockly.Blocks['pour_chaque_image'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Pour chaque image Faire");
        this.appendStatementInput("image")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip('Execute les blocs pour chaque image');
        this.setHelpUrl('../../../aide/aide.html?file=pour_chaque_image.md');
    }
};

Blockly.JavaScript['pour_chaque_image'] = function (block) {
    var statements_image = Blockly.JavaScript.statementToCode(block, 'image').replace(/(\r\n|\n|\r)/gm, "");

    var code = 'num_image = -1; drawResponse = new Function ("' + statements_image + '"); playAnim();\n';
    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['num_image'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Valeur du Temps");
        this.setOutput(true, "Number");
        this.setColour(270);
        this.setTooltip('Renvoie le numéro de l\'image');
        this.setHelpUrl('../../../aide/aide.html?file=num_image.md');
    }
};

Blockly.JavaScript['num_image'] = function (block) {
    var code = 'num_image';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['init_curseur'] = {
    init: function () {
        this.appendValueInput("pos")
            .setCheck("coordonnees")
            .appendField("Initialiser Curseur");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(270);
        this.setTooltip('Initialise le curseur');
        this.setHelpUrl('../../../aide/aide.html?file=curseur.md');
    }
};

Blockly.JavaScript['init_curseur'] = function (block) {
    var value_pos = Blockly.JavaScript.valueToCode(block, 'pos', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'initCurseur = ' + value_pos + ';\n';
    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['recup_curseur'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Position Curseur");
        this.setOutput(true, "coordonnees");
        this.setColour(270);
        this.setTooltip('Récupère la position du curseur');
        this.setHelpUrl('../../../aide/aide.html?file=curseur.md');
    }
};

Blockly.JavaScript['recup_curseur'] = function (block) {
    var code = 'curseur';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['recup_curseur_offset'] = {
    init: function () {
        this.appendValueInput("relative_pos")
            .setCheck("coordonnees")
            .appendField("Position Curseur + Décalage");
        this.setOutput(true, "coordonnees");
        this.setColour(270);
        this.setTooltip('Récupère la position du curseur et ajoute un décalage');
        this.setHelpUrl('../../../aide/aide.html?file=curseur.md');
    }
};

Blockly.JavaScript['recup_curseur_offset'] = function (block) {
    var value_relative_pos = Blockly.JavaScript.valueToCode(block, 'relative_pos', Blockly.JavaScript.ORDER_ATOMIC);

    const regex = /-?[0-9|.]+/g;
    var num_tab = value_relative_pos.match(regex);

    var code = '{x: curseur.x + ' + num_tab[0] + ',';
    code += 'y: curseur.y + ' + num_tab[1] + '}';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['deplace_curseur'] = {
    init: function () {
        this.appendValueInput("mouvement")
            .setCheck("coordonnees")
            .appendField("Déplacer le curseur de");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(270);
        this.setTooltip('Déplace le curseur');
        this.setHelpUrl('../../../aide/aide.html?file=curseur.md');
    }
};

Blockly.JavaScript['deplace_curseur'] = function (block) {
    var value_mouvement = Blockly.JavaScript.valueToCode(block, 'mouvement', Blockly.JavaScript.ORDER_ATOMIC);

    const regex = /-?[0-9|.]+/g;
    var num_tab = value_mouvement.match(regex);

    var code = 'curseur = {x: curseur.x + ' + num_tab[0] + ',';
    code += 'y: curseur.y + ' + num_tab[1] + '};\n';

    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['init_curseur_tab'] = {
    init: function () {
        this.appendValueInput("pos")
            .setCheck("coordonnees")
            .appendField("Initialiser Curseur n°")
            .appendField(new Blockly.FieldNumber(0, 0, 10), "idx");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(270);
        this.setTooltip('Initialise le curseur');
        this.setHelpUrl('../../../aide/aide.html?file=curseur.md');
    }
};

Blockly.JavaScript['init_curseur_tab'] = function (block) {
    var number_idx = block.getFieldValue('idx');
    var value_pos = Blockly.JavaScript.valueToCode(block, 'pos', Blockly.JavaScript.ORDER_ATOMIC);

    var code = 'initCurseur[' + number_idx + '] = ' + value_pos + ';\n';
    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['recup_curseur_tab'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Position Curseur n°")
            .appendField(new Blockly.FieldNumber(0, 0, 10), "idx");
        this.setOutput(true, "coordonnees");
        this.setColour(270);
        this.setTooltip('Récupère la position du curseur');
        this.setHelpUrl('../../../aide/aide.html?file=curseur.md');
    }
};

Blockly.JavaScript['recup_curseur_tab'] = function (block) {
    var number_idx = block.getFieldValue('idx');
    var code = 'curseur[' + number_idx + ']';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['recup_curseur_offset_tab'] = {
    init: function () {
        this.appendValueInput("relative_pos")
            .setCheck("coordonnees")
            .appendField("Position Curseur n°")
            .appendField(new Blockly.FieldNumber(0, 0, 10), "idx")
            .appendField(" + Décalage");
        this.setOutput(true, "coordonnees");
        this.setColour(270);
        this.setTooltip('Récupère la position du curseur et ajoute un décalage');
        this.setHelpUrl('../../../aide/aide.html?file=curseur.md');
    }
};

Blockly.JavaScript['recup_curseur_offset_tab'] = function (block) {
    var number_idx = block.getFieldValue('idx');
    var value_relative_pos = Blockly.JavaScript.valueToCode(block, 'relative_pos', Blockly.JavaScript.ORDER_ATOMIC);

    const regex = /-?[0-9|.]+/g;
    var num_tab = value_relative_pos.match(regex);

    var code = '{x: curseur[' + number_idx + '].x + ' + num_tab[0] + ',';
    code += 'y: curseur[' + number_idx + '].y + ' + num_tab[1] + '}';

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['deplace_curseur_tab'] = {
    init: function () {
        this.appendValueInput("mouvement")
            .setCheck("coordonnees")
            .appendField("Déplacer le curseur n°")
            .appendField(new Blockly.FieldNumber(0, 0, 10), "idx")
            .appendField(" de");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(270);
        this.setTooltip('Déplace le curseur');
        this.setHelpUrl('../../../aide/aide.html?file=curseur.md');
    }
};

Blockly.JavaScript['deplace_curseur_tab'] = function (block) {
    var number_idx = block.getFieldValue('idx');
    var value_mouvement = Blockly.JavaScript.valueToCode(block, 'mouvement', Blockly.JavaScript.ORDER_ATOMIC);

    const regex = /-?[0-9|.]+/g;
    var num_tab = value_mouvement.match(regex);

    var code = 'curseur[' + number_idx + '] = {x: curseur[' + number_idx + '].x + ' + num_tab[0] + ',';
    code += 'y: curseur[' + number_idx + '].y + ' + num_tab[1] + '};\n';

    return code;
};

///////////////////////////////////////////////////////////////////

Blockly.Blocks['bonhomme'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Bonhomme");
        this.appendDummyInput();
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Couleur du T-shirt")
            .appendField(new Blockly.FieldColour("#000000"), "shirt");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Couleur du Pantalon")
            .appendField(new Blockly.FieldColour("#3366ff"), "pants");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Bras levé")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "hands_up");
        this.appendValueInput("coord_center")
            .setCheck("coordonnees")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Position");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(135);
        this.setTooltip('Dessine un bonhomme');
        this.setHelpUrl('../../../aide/aide.html?file=bonhomme.md');
    }
};

Blockly.JavaScript['bonhomme'] = function (block) {
    var colour_shirt = block.getFieldValue('shirt');
    var colour_pants = block.getFieldValue('pants');
    var checkbox_hands_up = block.getFieldValue('hands_up') == 'TRUE';
    var value_coord_center = Blockly.JavaScript.valueToCode(block, 'coord_center', Blockly.JavaScript.ORDER_ATOMIC);
    
    var code = 'drawMan(' + value_coord_center + ',\'' + colour_shirt + '\',\'' + colour_pants + '\',' + checkbox_hands_up + ');\n';
    
    return code;
};