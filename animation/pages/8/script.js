popupInfo("\nMaintenant tu dois te débrouiller tout seul!\n Aide le bonhomme à grimper sur son échelle.");

axisWidthLength = 8;
axisHeightLength = 6;
pxUnit = 100;

page_shapes = {
    bg: [
        new Rectangle("#52d8ff", new Coord(0, 2), 4, 8),
        new Rectangle("#02bf08", new Coord(0, 0), 1.5, 8),
        new Rectangle("#8c594c", new Coord(0, 1.5), 0.5, 8),
        new Circle("#ff9d28", new Coord(8, 6), 3),
        new Rectangle("#D2B48C", new Coord(0, 1), 4, 3),
        new Triangle("#9b0b1f", new Coord(4, 5), new Coord(1, 7), new Coord(-2, 5)),
        new Line("#000000", new Coord(1.5, 1), new Coord(1.5, 5)),
        new Line("#000000", new Coord(2.5, 1), new Coord(2.5, 5)),
        new Line("#000000", new Coord(1.5, 2), new Coord(2.5, 2)),
        new Line("#000000", new Coord(1.5, 3), new Coord(2.5, 3)),
        new Line("#000000", new Coord(1.5, 4), new Coord(2.5, 4)),

    ],
    ex: []
};
for (let i = 1; i < 6; i++) {
    page_shapes.ex.push([
        new Man(new Coord(2, i), "#000000", "#0000ff", false)
    ])
}

function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    createBoard();
}
