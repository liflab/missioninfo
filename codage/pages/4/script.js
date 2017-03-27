//

function ASCII2String() {
    var res = "";
    
    var str_ASCII_number = document.getElementById("ASCII_numbers").value;
    var list_ASCII_number = str_ASCII_number.split(" ");

    for (var i = 0; i < list_ASCII_number.length; i++) {
        res += String.fromCharCode(list_ASCII_number[i]);
    }

    document.getElementById("res").innerHTML = res;
}
//------------------------------------------------//