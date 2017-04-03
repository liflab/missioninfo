// Function execute when all things are loaded
function allLoaded() {
    activateButtons(5);
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    onresize();
}