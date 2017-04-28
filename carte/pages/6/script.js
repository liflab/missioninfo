text_info = "\nDes fois, il ne faut pas tout mettre dans le bloc vert !!! \nAttention ! Tu n'as le droit qu'à 7 blocs.";

page_map = [
    {row: 7, col: 1, data: {style: "deb", type: 1}},
    {row: 7, col: 2, data: {style: "1", type: 1}},
    {row: 7, col: 3, data: {style: "1", type: 1}},
    {row: 7, col: 4, data: {style: "2", type: 3}},
    {row: 6, col: 4, data: {style: "1", type: 0}},
    {row: 5, col: 4, data: {style: "1", type: 0}},
    {row: 4, col: 4, data: {style: "1", type: 0}},
    {row: 3, col: 4, data: {style: "1", type: 0}},
    {row: 2, col: 4, data: {style: "1", type: 0}},
    {row: 1, col: 4, data: {style: "fin", type: 2}}
];

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    noLoop();

    createMap();
}