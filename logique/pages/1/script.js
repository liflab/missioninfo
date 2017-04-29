// To check if the slideshow is finished

function addEndListener() {
    Reveal.addEventListener( 'slidechanged', function( event ) {
        if (Reveal.getProgress() == 1) {
            document.getElementById("btn_next_exercise").style.display = "block";
            window.localStorage.setItem("max_page_logique", Math.max(currentPageNumber + 1, savedPageNumber));
        }
        writeToLog(activity, "Slide changed : " + Reveal.getProgress());
    } );
}
function setup(){

}
//------------------------------------------------//