popupInfo("\nUtilise plusieurs fois le bloc direction \npour faire des virages et arriver au bon endroit.");

page_map = [
    {row: 3, col: 2, data: {style: "deb", type: 1}},
    {row: 3, col: 3, data: {style: "1", type: 1}},
    {row: 3, col: 4, data: {style: "1", type: 1}},
    {row: 3, col: 5, data: {style: "2", type: 2}},
    {row: 4, col: 5, data: {style: "1", type: 0}},
    {row: 5, col: 5, data: {style: "2", type: 0}},
    {row: 5, col: 6, data: {style: "1", type: 1}},
    {row: 5, col: 7, data: {style: "fin", type: 3}}
];

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');
    noLoop();

    createMap();
}