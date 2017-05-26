popupInfo("\nTu es maintenant prêt à assembler des formes ensembles\n Ajoute les bonnes formes pour dessiner un bonhomme!!!");

axisWidthLength = 24;
axisHeightLength = 18;
pxUnit = 40;

page_shapes = {
    bg: [],
    ex: [
        [
            new Circle("#ff9966", new Coord(12, 16), 2),
            new Rectangle("#00ff00", new Coord(10, 7), 8, 4, 0),
            new Line("#ff0000", new Coord(6, 12), new Coord(10, 14)),
            new Line("#ff0000", new Coord(18, 12), new Coord(14, 14)),
            new Line("#0000ff", new Coord(11, 2), new Coord(11, 7)),
            new Line("#0000ff", new Coord(13, 2), new Coord(13, 7))
        ]
    ]
};

function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    createBoard();
}
