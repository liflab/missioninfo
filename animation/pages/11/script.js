popupInfo("Le but est de faire bouger les deux bonhommes dans un sens différent!\nPour cela tu dois utiliser deux curseurs!\n Chaque curseur s'occupera d'un bonhomme.\n Complète le programme avec les blocs manquants.");

axisWidthLength = 8;
axisHeightLength = 6;
pxUnit = 100;

page_shapes = {
    bg: [
        new Rectangle("#52d8ff", new Coord(0, 2), 4, 8),
        new Rectangle("#02bf08", new Coord(0, 1), 0.5, 8),
        new Rectangle("#8c594c", new Coord(0, 1.5), 0.5, 8),
        new Rectangle("#02bf08", new Coord(0, 0), 0.5, 8),
        new Rectangle("#8c594c", new Coord(0, 0.5), 0.5, 8),
        new Circle("#ff9d28", new Coord(8, 6), 3),

    ],
    ex: []
};
for (let i = 1; i < 8; i++) {
    page_shapes.ex.push([
        new Man(new Coord(8 - i, 3), "#ff0000", "#0000ff", true),
        new Man(new Coord(i, 2), "#00ff00", "#0000ff", true)
    ])
}

function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    createBoard();
}
