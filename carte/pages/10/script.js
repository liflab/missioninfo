popupInfo("\nC'est la carte la plus difficile. Arriveras-tu à trouver le bon programme? \nAttention ! Tu n'as le droit qu'à 5 blocs.");

page_map = [
    {row: 8, col: 7, data: {style: "deb", type: 1}},
    {row: 8, col: 8, data: {style: "2", type: 3}},
    {row: 7, col: 8, data: {style: "1", type: 0}},
    {row: 6, col: 8, data: {style: "1", type: 0}},
    {row: 5, col: 8, data: {style: "3", type: 2}},
    {row: 4, col: 8, data: {style: "2", type: 2}},
    {row: 5, col: 7, data: {style: "2", type: 0}},
    {row: 4, col: 7, data: {style: "3", type: 1}},
    {row: 4, col: 6, data: {style: "1", type: 1}},
    {row: 4, col: 5, data: {style: "1", type: 1}},
    {row: 4, col: 3, data: {style: "3", type: 3}},
    {row: 3, col: 3, data: {style: "1", type: 0}},
    {row: 2, col: 3, data: {style: "1", type: 0}},
    {row: 1, col: 3, data: {style: "3", type: 1}},
    {row: 1, col: 2, data: {style: "1", type: 1}},
    {row: 1, col: 4, data: {style: "1", type: 1}},
    {row: 1, col: 5, data: {style: "1", type: 1}},
    {row: 1, col: 6, data: {style: "1", type: 1}},
    {row: 1, col: 7, data: {style: "1", type: 1}},
    {row: 4, col: 4, data: {style: "3", type: 1}},
    {row: 5, col: 4, data: {style: "1", type: 0}},
    {row: 6, col: 4, data: {style: "1", type: 0}},
    {row: 7, col: 4, data: {style: "4"}},
    {row: 8, col: 4, data: {style: "1", type: 0}},
    {row: 7, col: 5, data: {style: "1", type: 1}},
    {row: 7, col: 3, data: {style: "1", type: 1}},
    {row: 4, col: 2, data: {style: "3", type: 1}},
    {row: 5, col: 2, data: {style: "1", type: 0}},
    {row: 6, col: 2, data: {style: "1", type: 0}},
    {row: 7, col: 2, data: {style: "4"}},
    {row: 8, col: 2, data: {style: "1", type: 0}},
    {row: 7, col: 1, data: {style: "1", type: 1}},
    {row: 4, col: 1, data: {style: "fin", type: 1}},
];

maxBlocks = 5;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    noLoop();

    createMap();
}