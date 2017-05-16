text_info = "Des nouveaux blocs sont là !!! \nTu disposes maintenant d'un GPS qui te dis si tu peux tourner\n à gauche, à droite ou rester tout droit.\nAttention ! Tu n'as le droit qu'à 5 blocs.";

page_map = [
    {row: 7, col: 1, data: {style: "deb", type: 1}},
    {row: 7, col: 2, data: {style: "1", type: 1}},
    {row: 7, col: 3, data: {style: "1", type: 1}},
    {row: 7, col: 4, data: {style: "1", type: 1}},
    {row: 7, col: 5, data: {style: "1", type: 1}},
    {row: 7, col: 6, data: {style: "1", type: 1}},
    {row: 7, col: 7, data: {style: "2", type: 3}},
    {row: 6, col: 7, data: {style: "1", type: 0}},
    {row: 5, col: 7, data: {style: "1", type: 0}},
    {row: 4, col: 7, data: {style: "1", type: 0}},
    {row: 3, col: 7, data: {style: "1", type: 0}},
    {row: 2, col: 7, data: {style: "1", type: 0}},
    {row: 1, col: 7, data: {style: "2", type: 2}},
    {row: 1, col: 6, data: {style: "1", type: 1}},
    {row: 1, col: 5, data: {style: "1", type: 1}},
    {row: 1, col: 4, data: {style: "1", type: 1}},
    {row: 1, col: 3, data: {style: "1", type: 1}},
    {row: 1, col: 2, data: {style: "2", type: 1}},
    {row: 2, col: 2, data: {style: "1", type: 0}},
    {row: 3, col: 2, data: {style: "1", type: 0}},
    {row: 4, col: 2, data: {style: "fin", type: 0}}
];

maxBlocks = 5;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    noLoop();

    createMap();
}