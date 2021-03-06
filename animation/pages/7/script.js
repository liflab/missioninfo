popupInfo("Cette fois, tu dois animer le bonhomme.\nVoici comment tu dois utiliser les nouveaux blocs pour que ça fonctionne!\nPour valider l'exercice, corrige les nombres pour faire en sorte que\nle bonhomme se déplace de gauche à droite, comme demandé.");

axisWidthLength = 8;
axisHeightLength = 6;
pxUnit = 100;

page_shapes = {
    bg: [
        new Rectangle("#52d8ff", new Coord(0, 2), 4, 8),
        new Rectangle("#02bf08", new Coord(0, 0), 1.5, 8),
        new Rectangle("#8c594c", new Coord(0, 1.5), 0.5, 8),
        new Circle("#ff9d28", new Coord(8, 6), 3)
    ],
    ex: []
};
for (let i = 1; i < axisWidthLength; i++) {
    page_shapes.ex.push([
        new Man(new Coord(i, 3), "#000000", "#0000ff", true)
    ])
}

function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    createBoard();
}
