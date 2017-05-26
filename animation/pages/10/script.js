popupInfo("Tu dois faire bouger à la fois le bonhomme et le triangle\n (qui lui sert de parapluie)\nPour cela tu dois faire comme la page précédente\n mais tu devra trouver tout seul le décalage!!!");

axisWidthLength = 8;
axisHeightLength = 6;
pxUnit = 100;

page_shapes = {
    bg: [
        new Rectangle("#3c96b5", new Coord(0, 2), 4, 8),
        new Rectangle("#02bf08", new Coord(0, 0), 1.5, 8),
        new Rectangle("#8c594c", new Coord(0, 1.5), 0.5, 8),
        new Circle("#b56b21", new Coord(8, 6), 3),
        new Circle("#b3b3b3", new Coord(3.8, 4), 1.5),
        new Circle("#b3b3b3", new Coord(5, 4.2), 1.5),
        new Circle("#b3b3b3", new Coord(4.2, 4.7), 1.5),
        new Rectangle("#3c96b5", new Coord(3, 3), 1, 4),
    ],
    ex: []
};
for (let i = 1; i < 7; i++) {
    page_shapes.ex.push([
        new Man(new Coord(i, 3), "#2a5222", "#0000ff", true),
        new Triangle("#ff0000", new Coord(i - 1, 4), new Coord(i, 5), new Coord(i + 1, 4))
    ])
}

function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    createBoard();
}
