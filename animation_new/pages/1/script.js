// To check if the slideshow is finished

function addEndListener() {
    Reveal.addEventListener('slidechanged', function (event) {
        if (Reveal.getProgress() == 1) {
            document.getElementById("btn_next_exercise").style.display = "block";
        }
        writeToLog(activity, "Slide changed : " + Reveal.getProgress());
    });
}
//------------------------------------------------//