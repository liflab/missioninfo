popupInfo("\nInformations à venir\n !!!");

axisWidthLength = 8;
axisHeightLength = 6;
pxUnit = 100;

page_shapes = {
    bg: [],
    ex: [
        [
            new Circle("#ff0000", new Coord(2, 2), 2),
            new Square("#00ff00", new Coord(4, 5), 3, 0)
        ]
    ]
};

function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    createBoard();
}