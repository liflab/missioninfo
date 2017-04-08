// Function execute when all things are loaded
function allLoaded() {
    activateButtons(6);
    document.getElementById("loader").style.display = "none";
    document.getElementById("page").style.display = "block";
    onresize();
}