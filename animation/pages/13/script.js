popupInfo("\nInformations à venir\n !!!");

axisWidthLength = 8;
axisHeightLength = 6;
pxUnit = 100;

page_shapes = {
    bg: [
        new Rectangle("#52d8ff", new Coord(0, 2), 4, 8),
        new Rectangle("#02bf08", new Coord(0, 0), 2, 8),
        new Rectangle("#8c594c", new Coord(0, 1.5), 0.5, 8),
        new Circle("#ff9d28", new Coord(8, 6), 3),

    ],
    ex: []
};
for (let i = 1; i <= 3; i++) {
    page_shapes.ex.push([
        new Man(new Coord(8 - i, 3), "#ff0000", "#0000ff", false),
        new Man(new Coord(i, 3), "#00ff00", "#0000ff", true)
    ])
}
for (let i = 2; i >= 1; i--) {
    page_shapes.ex.push([
        new Man(new Coord(8 - i, 3), "#ff0000", "#0000ff", false),
        new Man(new Coord(i, 3), "#00ff00", "#0000ff", true)
    ])
}

function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    createBoard();
}
