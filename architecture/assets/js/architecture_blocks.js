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
    case 6:
        dropdown_angle = [
            ["90° degrés","90"],
            ["26.42° degrés","26.42"],
            ["63.58° degrés","63.58"],
            ["180° degrés","180"],
        ];
    break;
    case 7:
        dropdown_angle = [
            ["90° degrés","90"],
            ["10° degrés","10"],
            ["5° degrés","5"],
        ];
    break;
    case 8:
        dropdown_angle = [
            ["270° degrés","270"],
            ["180° degrés","180"],
            ["90° degrés","90"],
        ];
    break;
    case 9:
        dropdown_angle = [
            ["180° degrés","180"],
            ["120° degrés","120"],
            ["90° degrés","90"],
        ];
    break;
    case 11:
        dropdown_angle = [
            ["1° degrés","1"],
            ["2° degrés","2"],
            ["3° degrés","3"],
            ["4° degrés","4"],
            ["5° degrés","5"],
            ["6° degrés","6"],
            ["7° degrés","7"],
            ["8° degrés","8"],
            ["9° degrés","9"],
            ["10° degrés","10"],
            ["11° degrés","11"],
            ["12° degrés","12"],
            ["13° degrés","13"],
            ["14° degrés","14"],
            ["15° degrés","15"],
            ["16° degrés","16"],
            ["17° degrés","17"],
            ["18° degrés","18"],
            ["19° degrés","19"],
            ["20° degrés","20"],
            ["21° degrés","21"],
            ["22° degrés","22"],
            ["23° degrés","23"],
            ["24° degrés","24"],
            ["25° degrés","25"],
            ["26° degrés","26"],
            ["27° degrés","27"],
            ["28° degrés","28"],
            ["29° degrés","29"],
            ["30° degrés","30"],
            ["31° degrés","31"],
            ["32° degrés","32"],
            ["33° degrés","33"],
            ["34° degrés","34"],
            ["35° degrés","35"],
            ["36° degrés","36"],
            ["37° degrés","37"],
            ["38° degrés","38"],
            ["39° degrés","39"],
            ["40° degrés","40"],
            ["41° degrés","41"],
            ["42° degrés","42"],
            ["43° degrés","43"],
            ["44° degrés","44"],
            ["45° degrés","45"],
            ["46° degrés","46"],
            ["47° degrés","47"],
            ["48° degrés","48"],
            ["49° degrés","49"],
            ["50° degrés","50"],
            ["51° degrés","51"],
            ["52° degrés","52"],
            ["53° degrés","53"],
            ["54° degrés","54"],
            ["55° degrés","55"],
            ["56° degrés","56"],
            ["57° degrés","57"],
            ["58° degrés","58"],
            ["59° degrés","59"],
            ["60° degrés","60"],
            ["61° degrés","61"],
            ["62° degrés","62"],
            ["63° degrés","63"],
            ["64° degrés","64"],
            ["65° degrés","65"],
            ["66° degrés","66"],
            ["67° degrés","67"],
            ["68° degrés","68"],
            ["69° degrés","69"],
            ["70° degrés","70"],
            ["71° degrés","71"],
            ["72° degrés","72"],
            ["73° degrés","73"],
            ["74° degrés","74"],
            ["75° degrés","75"],
            ["76° degrés","76"],
            ["77° degrés","77"],
            ["78° degrés","78"],
            ["79° degrés","79"],
            ["80° degrés","80"],
            ["81° degrés","81"],
            ["82° degrés","82"],
            ["83° degrés","83"],
            ["84° degrés","84"],
            ["85° degrés","85"],
            ["86° degrés","86"],
            ["87° degrés","87"],
            ["88° degrés","88"],
            ["89° degrés","89"],
            ["90° degrés","90"],
            ["91° degrés","91"],
            ["92° degrés","92"],
            ["93° degrés","93"],
            ["94° degrés","94"],
            ["95° degrés","95"],
            ["96° degrés","96"],
            ["97° degrés","97"],
            ["98° degrés","98"],
            ["99° degrés","99"],
            ["100° degrés","100"],
            ["101° degrés","101"],
            ["102° degrés","102"],
            ["103° degrés","103"],
            ["104° degrés","104"],
            ["105° degrés","105"],
            ["106° degrés","106"],
            ["107° degrés","107"],
            ["108° degrés","108"],
            ["109° degrés","109"],
            ["110° degrés","110"],
            ["111° degrés","111"],
            ["112° degrés","112"],
            ["113° degrés","113"],
            ["114° degrés","114"],
            ["115° degrés","115"],
            ["116° degrés","116"],
            ["117° degrés","117"],
            ["118° degrés","118"],
            ["119° degrés","119"],
            ["120° degrés","120"],
            ["121° degrés","121"],
            ["122° degrés","122"],
            ["123° degrés","123"],
            ["124° degrés","124"],
            ["125° degrés","125"],
            ["126° degrés","126"],
            ["127° degrés","127"],
            ["128° degrés","128"],
            ["129° degrés","129"],
            ["130° degrés","130"],
            ["131° degrés","131"],
            ["132° degrés","132"],
            ["133° degrés","133"],
            ["134° degrés","134"],
            ["135° degrés","135"],
            ["136° degrés","136"],
            ["137° degrés","137"],
            ["138° degrés","138"],
            ["139° degrés","139"],
            ["140° degrés","140"],
            ["141° degrés","141"],
            ["142° degrés","142"],
            ["143° degrés","143"],
            ["144° degrés","144"],
            ["145° degrés","145"],
            ["146° degrés","146"],
            ["147° degrés","147"],
            ["148° degrés","148"],
            ["149° degrés","149"],
            ["150° degrés","150"],
            ["151° degrés","151"],
            ["152° degrés","152"],
            ["153° degrés","153"],
            ["154° degrés","154"],
            ["155° degrés","155"],
            ["156° degrés","156"],
            ["157° degrés","157"],
            ["158° degrés","158"],
            ["159° degrés","159"],
            ["160° degrés","160"],
            ["161° degrés","161"],
            ["162° degrés","162"],
            ["163° degrés","163"],
            ["164° degrés","164"],
            ["165° degrés","165"],
            ["166° degrés","166"],
            ["167° degrés","167"],
            ["168° degrés","168"],
            ["169° degrés","169"],
            ["170° degrés","170"],
            ["171° degrés","171"],
            ["172° degrés","172"],
            ["173° degrés","173"],
            ["174° degrés","174"],
            ["175° degrés","175"],
            ["176° degrés","176"],
            ["177° degrés","177"],
            ["178° degrés","178"],
            ["179° degrés","179"],
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

Blockly.Blocks['tourner_arc'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Tourner de")
            .appendField(new Blockly.FieldDropdown(dropdown_angle), "Angle");
        this.appendDummyInput()
            .appendField("vers la ")
            .appendField(new Blockly.FieldDropdown([["Droite","1"], ["Gauche","-1"]]), "Direction");
        this.setPreviousStatement(true, null);
        this.setColour(230);
        this.setTooltip('');
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
Blockly.Blocks['arc_de_cercle'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Dessin d'un arc de cercle");
        this.appendDummyInput()
            .appendField("Taille: ")
            .appendField(new Blockly.FieldNumber(0, 0, 200), "Taille");
        this.appendStatementInput("Rotation")
            .setCheck(null)
            .appendField("Rotation");
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
Blockly.JavaScript['tourner_arc'] = function(block) {
    var dropdown_angle = block.getFieldValue('Angle');
    var dropdown_direction = block.getFieldValue('Direction');
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
Blockly.JavaScript['arc_de_cercle'] = function(block) {
    var number_taille = block.getFieldValue('Taille');
    var statements_rotation = Blockly.JavaScript.statementToCode(block, 'Rotation');
    // TODO: Assemble JavaScript into code variable.
    var code = '{"type":"arc","taille":'+number_taille+',"rotation":'+statements_rotation+'},';
    return code;
};