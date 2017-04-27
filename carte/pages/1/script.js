text_info = "\nPart à la chasse aux trésors \nTrouve le chemin pour arriver au bon endroit";

var cityMap = new Map();

var p1_map = [
    {row: 7, col: 1, data: {style: "deb", type: 1}},
    {row: 7, col: 2, data: {style: "1", type: 1}},
    {row: 7, col: 3, data: {style: "1", type: 1}},
    {row: 7, col: 4, data: {style: "3", type: 3}},
    {row: 7, col: 5, data: {style: "1", type: 1}},
    {row: 7, col: 6, data: {style: "1", type: 1}},
    {row: 6, col: 4, data: {style: "1", type: 0}},
    {row: 5, col: 4, data: {style: "1", type: 0}},
    {row: 4, col: 4, data: {style: "1", type: 0}},
    {row: 3, col: 4, data: {style: "1", type: 0}},
    {row: 2, col: 4, data: {style: "2", type: 1}},
    {row: 2, col: 5, data: {style: "1", type: 1}},
    {row: 2, col: 6, data: {style: "1", type: 1}},
    {row: 2, col: 7, data: {style: "fin", type: 3}}
];

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    noLoop();

    cityMap.init(p1_map);
    cityMap.draw();
}
