// HTML ELEMENTS
var cvs =               document.getElementById("cvs"),
    ctx =               cvs.getContext("2d"),
    dice_roll =         document.getElementById("dice-result"),
    dice_body =         document.getElementById("dice_ID"),
    dice_dots =         document.getElementsByClassName("dots");

// Map/canvas size
var board_width =       window.innerWidth/2.5,
    board_height =      window.innerHeight/2.5,
    box_size =          board_width/10,
    box_margin =        box_size*0.05;

// if player is moving
var on_movement_state = false;

// movement of player
var x_inc =             0,
    y_inc =             0,
    odd_num =           -1,
    inversion_state =   true,
    increment_by_10 =   0,
    final_movement =    0;

// Dice animation Time, limiter, & counter;
var c_a_time =          250,
    c_a_limit =         1,
    c_a_counter =       0;


// Snake head and Tail Location in MAP
var snake_head =        [
                        [85, 75, 45, 15, 35, 75, 55],
                        [65, 55, 65, 35,  5, 15, 5]
                        ];
var snake_tail =        [
                        [95, 55, 55, 25, 25, 35, 45],
                        [95, 75, 95, 85, 25, 75, 45]
                        ];

// Player MAP
var map =               [
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
                        ];
// if player is eaten by a snake these are the locations
const xs         =      [2, 6,   8,  2,  8,  5,  7];
const ys         =      [2, 6,   3,  9,  3,  5,  7];
const os         =      [3, 11,  15, 3,  15, 9, 13];
const is         =      [false, false, true, true, true, false, false];
const ii         =      [30, 30, 40, 60, 80, 90, 90];
const fs         =      [68, 64, 57,  31, 17, 5,  3];
    
const out_xs     =      [10,  6,  6,  8, 4,  6,  8];
const out_ys     =      [ 1,  5,  5,  8, 7,  6,  8];
const out_os     =      [19, 11, 11, 15, 7, 11, 15];
const out_is     =      [true, true, true, false, false, false, false];
const out_ii     =      [ 0,  0, 20, 10, 20, 50, 70];
const out_fs     =      [99, 95, 75, 82, 73, 44, 22];
    
// Second Verification of snakes head
var second_ver_head =   [68, 64, 57, 31, 17,  5,  3];
var second_ver_tail =   [99, 95, 75, 82, 73, 44, 22];

// initializing Canvas/Map Size
with(cvs) {
    width =             board_width;
    height =            board_width;
}

// Map rendering...
var map_render =()=> {
    with(ctx) {
        clearRect(0, 0, board_width, board_width);
        for(y = 0; y < 10 ; y++) {    
            for(x = 0; x < 10 ; x++) {
                switch(map[x+y*10]) {
                    case 0: // tiles
                        fillStyle = "#764ba2";
                    break;
                    case 1: // player
                        fillStyle = "#667eea";
                    break;
                    case 2: // snake
                        fillStyle = "#dd1818";
                    break;
                    case 3: // snake tail
                        fillStyle = "#ff9a9e";
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
        //x - y
        // snake length - percentage
       
        for(i=0;i<snake_head[0].length;i++) {
            beginPath();
                lineWidth = 4;
                strokeStyle = "cornflowerblue";
                moveTo(
                    board_width*(snake_head[0][i]/100), 
                    board_width*(snake_head[1][i]/100)
                    );
                lineTo(
                    board_width*(snake_tail[0][i]/100), 
                    board_width*(snake_tail[1][i]/100)
                    );
                stroke();
            closePath();
        }
    }    
}
map_render();

/*
    Formula inversion of (1 - 10)
    y - Final Result
    x - increment by 1
    z - odd numbers Required (1,3,5 - 19)
    y = (x+10) - z
    z = 1 + 2
*/

/*
    xs - X direction of player
    ys - Y direction of player
    os - Current Odd number
    is - Current inversion state
    ii - increment by 10
    fs - increment of path.
*/


// when player eaten by snake function
var snake_catcher=      (xs_in=0, ys_in=0, 
                        os_in=0, is_in=0, 
                        ii_in=0, fs_in=0)=> {
    const snake_head =  [32, 36, 48, 62, 88, 95, 97];
    for(let i = 0; i < snake_head.length ; i++) {
      if(
        xs_in == xs[i] &&  
        ys_in == ys[i] &&  
        os_in == os[i] && 
        is_in == is[i] && 
        ii_in == ii[i] &&  
        fs_in == fs[i]  
      ) {
        map[final_movement] =   0;
        x_inc =                 out_xs[i];
        y_inc =                 out_ys[i];
        odd_num =               out_os[i];
        inversion_state =       out_is[i];
        increment_by_10 =       out_ii[i];
        final_movement =        out_fs[i];
        map[final_movement] =   1;
        map_render();
        }
    }
}


// Player movement in map
var Roll =()=> {
    x_inc += 1;
    if(x_inc > 10) {
        increment_by_10 += 10;
        x_inc = 1;
        if(!inversion_state) {
            inversion_state = true;
        }
        else {
            inversion_state = false;
        }
    }
    odd_num += 2;
    if(odd_num > 19) odd_num = 1;
    if(inversion_state) {
        y_inc = (x_inc+10) - odd_num;
        map[final_movement] = 0;
    } else {
        map[final_movement] = 0;
        y_inc = x_inc;
    }
    final_movement = 100-(y_inc + increment_by_10)
    map[final_movement] = 1;
    for(i = 0 ; i < second_ver_head.length ;i++) {
        if(final_movement == second_ver_head[i] && on_movement_state == true) {
            map[second_ver_tail[i]] = 1;
            snake_catcher(
                x_inc,
                y_inc,
                odd_num,
                inversion_state,
                increment_by_10,
                final_movement 
            );
        }
    }
    
    /*  For debugging snakes */ 
    // if(final_movement == 5 && on_movement_state == true) {
    //     map[44] = 1;
    //     snake_catcher(
    //         x_inc,
    //         y_inc,
    //         odd_num,
    //         inversion_state,
    //         increment_by_10,
    //         final_movement 
    //     );
    // }
    // console.log(final_movement);
    console.log(
        " " + x_inc
       +" " + y_inc
       +" " + odd_num
       +" " + inversion_state
       +" " + increment_by_10
       +" " + (final_movement)
   );
    map_render();
}

var previous_span_count = 0;

var rolling=()=> {
    previous_span_count = c_a_limit;
    c_a_limit = Math.ceil(Math.random()*6);
    
    //c_a_limit =1; // for Debuging player movement
    
    dice_roll.innerHTML = c_a_limit;
    setTimeout(roll_ctrl, c_a_time/2);
    c_a_counter = 0;
    dice_body.disabled = true;
}

var roll_ctrl=()=> {
    
    c_a_counter += 1;
    if(c_a_counter == c_a_limit) {
       on_movement_state = true;
        clearTimeout(roll_ctrl);
        dice_body.disabled = false;
    }
    else {
        on_movement_state = false;
        setTimeout(roll_ctrl, c_a_time/2);
    }
    Roll();
}

// AI movement

setInterval(()=> {
    rolling();
}, 2000);

// for debugging only
var loop=()=> {
  //  map_render();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);





