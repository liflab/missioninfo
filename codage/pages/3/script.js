// To check if the slideshow is finished

function checkEndSlide() {
    if (Reveal.getProgress() == 1) {
        next_page()
    }
}

//------------------------------------------------//