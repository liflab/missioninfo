popupInfo("\nInformations à venir\n !!!");

axisWidthLength = 8;
axisHeightLength = 6;
pxUnit = 100;

page_shapes = {
    bg: [
        new Rectangle("#52d8ff", new Coord(0, 6), 4, 8),
        new Rectangle("#02bf08", new Coord(0, 1.5), 1.5, 8),
        new Rectangle("#8c594c", new Coord(0, 2), 0.5, 8),
        new Circle("#ff9d28", new Coord(8, 6), 3),

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
