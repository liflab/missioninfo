popupInfo("Tu dois faire la même chose avec ces 3 formes.\nUtilise 3 curseurs différents pour animer ces 3 formes\nCette fois, tu devras t'occuper de tous les blocs.\nEt regarde bien comment chaque forme se déplace!!!");

axisWidthLength = 8;
axisHeightLength = 6;
pxUnit = 100;

page_shapes = {
    bg: [],
    ex: []
};
for (let i = 0; i < 4; i++) {
    page_shapes.ex.push([
        new Rectangle("#ff0000", new Coord(i + 1, 2), 1, 2),
        new Square("#00ff00", new Coord(4, i + 1), 1),
        new Circle("#0000ff", new Coord(7 - (i * 2), 4), 1),
    ])
}

function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    createBoard();
}
