var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");
var dice_roll = document.getElementById("dice-result");

var board_width = window.innerWidth/2.5;
var board_height = window.innerHeight/2.5;

var map = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]


with(cvs) {
    width = board_width;
    height = board_width;
}

var box_size = board_width/10;
var box_margin = box_size*0.05;

var map_render =()=> {
    with(ctx) {
        clearRect(0, 0, board_width, board_width);
        for(y = 0; y < 10 ; y++) {    
            for(x = 0; x < 10 ; x++) {
                switch(map[x+y*10]) {
                    case 0: 
                    fillStyle = "#764ba2";
                    break;
                    case 1:
                    fillStyle = "#667eea";
                    break;
                }
                fillRect(
                    x * box_size,
                    y * box_size,
                    box_size-box_margin,
                    box_size-box_margin
                );
            }
        }
    }    
}

map_render();

var x_inc =     0;
var y_inc =     0;
var odd_num =   -1;
var inversion_state = true;
var increment_by_10 = 0;
var final_movement = 0;
/*
    Formula inversion of (1 - 10)
    y - Final Result
    x - increment by 1
    z - odd numbers (1 - 19)
    y = (x+10) - z
    z = 1 + 2
*/

var Roll =()=> {

    x_inc += 1;
    

    if(x_inc > 10) {
        increment_by_10 += 10;
        x_inc = 1;
        if(!inversion_state) {
            inversion_state = true;
        }
        else                 {
            inversion_state = false;
    
        }
    }
    odd_num += 2;
    if(odd_num > 19) odd_num = 1;
    
    
    if(!inversion_state) {
        y_inc = (x_inc+10) - odd_num;
        map[final_movement] = 0;
   
    } else {
        map[final_movement] = 0;
        y_inc = x_inc;
    }
    final_movement = 100-(y_inc + increment_by_10)
    dice_roll.innerHTML = final_movement;
    map[final_movement] = 1;
    map_render();
}

// LOOP
var loop=()=> {
//map_render();
//Roll();
requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

setInterval(
function() {
  // Roll();
},
100
);

