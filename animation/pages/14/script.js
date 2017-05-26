popupInfo("Aide le bonhomme à échapper aux monstres en grimpant sur le rocher.\nPour cela tu dois faire comme la dernière page et utiliser le bloc SI\n avec le bloc VALEUR DU TEMPS pour changer le mouvement.\n C'est la dernière page avant de te laisser faire ce que tu veux!!!");

axisWidthLength = 8;
axisHeightLength = 6;
pxUnit = 100;
indWhite = true;

page_shapes = {
    bg: [
        new Rectangle("#201a4e", new Coord(0, 2), 4, 8),
        new Rectangle("#027308", new Coord(0, 0), 2, 8),
        new Rectangle("#462b23", new Coord(0, 0.5), 0.5, 8),
        new Rectangle("#454545", new Coord(5, 0), 2.75, 3),
        new Circle("#8e9675", new Coord(1, 5), 1),

    ],
    ex: []
};
for (let i = 1; i <= 4; i++) {
    page_shapes.ex.push([
        new Man(new Coord(i, 2), "#000000", "#000080", false)
    ])
}
for (let i = 2; i <= 3; i++) {
    page_shapes.ex.push([
        new Man(new Coord(5, i), "#000000", "#000080", true)
    ])
}
for (let i = 5; i <= 7; i++) {
    page_shapes.ex.push([
        new Man(new Coord(i, 4), "#000000", "#000080", false)
    ])
}

function setup() {
    var canvas = createCanvas(axisWidthLength * pxUnit, axisHeightLength * pxUnit);
    canvas.parent('sketch-holder');
    noLoop();

    createBoard();
}
