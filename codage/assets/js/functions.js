// Function execute when all things are loaded
function allLoaded() {
    createButtons(7);
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    autoResize();
}