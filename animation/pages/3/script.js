popupInfo("\nMême chose avec des rectangles.\n Fais attention à la hauteur et la largeur!!!");

axisWidthLength = 8;
axisHeightLength = 6;
pxUnit = 100;

page_shapes = {
    bg: [],
    ex: [
        [
            new Rectangle("#ff0000", new Coord(1, 3), 2, 3, 0),
            new Rectangle("#00ff00", new Coord(6, 1), 3, 1, 0)
        ]
    ]
};

function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    createBoard();
}