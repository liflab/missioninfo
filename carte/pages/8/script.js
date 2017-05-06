text_info = "\nCertains chemins sont sans issue maintenant. \nAttention ! Tu n'as le droit qu'à 5 blocs.";

page_map = [
    {row: 2, col: 2, data: {style: "deb", type: 1}},
    {row: 2, col: 3, data: {style: "1", type: 1}},
    {row: 2, col: 4, data: {style: "1", type: 1}},
    {row: 2, col: 5, data: {style: "1", type: 1}},
    {row: 2, col: 6, data: {style: "3", type: 2}},
    {row: 1, col: 6, data: {style: "2", type: 1}},
    {row: 1, col: 7, data: {style: "1", type: 1}},
    {row: 3, col: 6, data: {style: "1", type: 0}},
    {row: 4, col: 6, data: {style: "3", type: 0}},
    {row: 4, col: 7, data: {style: "1", type: 1}},
    {row: 5, col: 6, data: {style: "1", type: 0}},
    {row: 6, col: 6, data: {style: "1", type: 0}},
    {row: 7, col: 6, data: {style: "1", type: 0}},
    {row: 8, col: 6, data: {style: "3", type: 3}},
    {row: 8, col: 7, data: {style: "1", type: 1}},
    {row: 8, col: 5, data: {style: "1", type: 1}},
    {row: 8, col: 4, data: {style: "3", type: 3}},
    {row: 7, col: 4, data: {style: "1", type: 0}},
    {row: 6, col: 4, data: {style: "1", type: 0}},
    {row: 5, col: 4, data: {style: "fin", type: 2}},
    {row: 8, col: 3, data: {style: "1", type: 1}},
    {row: 8, col: 2, data: {style: "2", type: 0}},
    {row: 7, col: 2, data: {style: "1", type: 0}},
    {row: 6, col: 2, data: {style: "2", type: 2}},
    {row: 6, col: 1, data: {style: "1", type: 1}},
];

maxBlocks = 5;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    noLoop();

    createMap();
}