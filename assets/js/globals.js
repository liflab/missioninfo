ROBOT_NAME = "ROBOTINO"

function displayInfo() {
    // Get SVG text
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "../../../assets/img/info.svg", false);
    xmlHttp.send(null);

    var svg_text = xmlHttp.responseText;
    //console.log(svg_text);

    // Get info tag in page
    var infos = document.getElementsByTagName("info");
    for (var i = 0; i < infos.length; i++) {
        var info_text = infos[i].textContent;
        var info_text_line = info_text.split("¤");

        var svg_modify = svg_text;

        for (var ligne = 0; ligne < 4; ligne++) {
            if (typeof info_text_line[ligne] !== 'undefined') {
                svg_modify = svg_modify.replace("$text" + (ligne + 1) + "$", info_text_line[ligne].trim());
            }
            else {
                svg_modify = svg_modify.replace("$text" + (ligne + 1) + "$", "");
            }
        }
        infos[i].innerHTML = svg_modify
    }
}