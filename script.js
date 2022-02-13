var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");
var board_width = window.innerWidth/2;
var board_height = window.innerHeight/2;

with(cvs) {
    width = board_width;
    height = board_width;
}

var box_size = board_width/10;
var box_margin = box_size*0.05;

with(ctx) {
    fillStyle = "#764ba2";
    for(y = 0; y < 10 ; y++) {    
        for(x = 0; x < 10 ; x++) {
            fillRect(
                x * box_size,
                y * box_size,
                box_size-box_margin,
                box_size-box_margin
            );
        }
    }
}