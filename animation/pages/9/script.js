popupInfo("Le but est de faire bouger les deux bonhommes ensembles!\nPour cela tu dois faire comme s'il avait que le bonhomme du bas.\n Le curseur avec décalage s'occupera de faire bouger l'autre en même temps.\n Complète le programme avec les blocs manquants.");

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
for (let i = 1; i < 7; i++) {
    page_shapes.ex.push([
        new Man(new Coord(i, 2), "#2a5222", "#0000ff", false),
        new Man(new Coord(i + 1, 3), "#563a23", "#0000ff", false)
    ])
}

function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    createBoard();
}
