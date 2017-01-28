Blockly.JavaScript['cercle'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_size = Blockly.JavaScript.valueToCode(block, 'size', Blockly.JavaScript.ORDER_ATOMIC);
  
  var sketch_x = value_x * 100;
  var sketch_y = 600 - (value_y * 100);
  var sketch_size = value_size * 100;

  var code = 'matrixAnswer[' + value_x + '][' + value_y + "] = 'C-" + value_size + "-' + currentColor\n";
  code += 'ellipse(' + sketch_x +','+ sketch_y +','+ sketch_size +','+ sketch_size + ');\n';
  return code;
};

Blockly.JavaScript['carre'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_size = Blockly.JavaScript.valueToCode(block, 'size', Blockly.JavaScript.ORDER_ATOMIC);
  
  var sketch_x = value_x * 100;
  var sketch_y = 600 - (value_y * 100);
  var sketch_size = value_size * 100;

  var code = 'matrixAnswer[' + value_x +']['+ value_y + "] = 'SQ-" + value_size + "-' + currentColor\n";
  code += 'rectMode(CENTER);\n';
  code += 'rect(' + sketch_x +','+ sketch_y +','+ sketch_size +','+ sketch_size + ');\n';
  
  return code;
};

Blockly.JavaScript['couleur'] = function(block) {
  var colour_fill = block.getFieldValue('fill');
  
  var code = "fill('" + colour_fill + "');\n";
  code += "currentColor = '" + colour_fill + "'\n";
  return code;
};