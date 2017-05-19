popupInfo("\nInformations à venir\n !!!");

axisWidthLength = 8;
axisHeightLength = 6;
pxUnit = 100;

page_shapes = page_shapes = {
    bg: [],
    ex: [
        [
            new Line("#ff0000", new Coord(1, 2), new Coord(3, 4)),
            new Line("#00ff00", new Coord(4, 5), new Coord(7, 1))
        ]
    ]
};

function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    createBoard();
}