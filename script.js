/*
MIT License

Copyright (c) 2022 Lemuel E. Diergos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.




    --DETAILS
    PROGRAMMED BY:      LEMUEL E. DIERGOS
    GITHUB:             https://github.com/lemueldiergos
    FACEBOOK:           https://www.facebook.com/lemuel.diergos.1
    PERSONAL SITE:      https://lemueldiergos.github.io
    LANGUAGE USED:      JAVASCRIPT
    IDE USED:           VSCODE
    DATE CREATED:       FEB. 11, 2022
    
    --KEY CODES
    0001        -   VARIABLES
    0002        -   ARRAYS / MAPS / LOCATIONS
    0003        -   WINDOW FUNCTIONS / GAME RESET
    0004        -   MAP RENDERER / IMAGES
    0005        -   SNAKES & LADDERS FUNCTIONS
    0006        -   ROLLING DICE
    0007        -   DEBUGGING SNAKES OR LADDERS
    0008        -   FOR DISABLING THE SNAKE
    0009        -   CODING AREA - IF PLAYER WINS THE GAME
    0010        -   PLAYER CURRENT LOCATION (SHOWN IN CONSOLE LOG)
    0011        -   ROLLING DICE CONTROL / RANDOM NUMBERS (1-6)
    0012        -   ENABLE / DISABLE COMPUTER MOVEMENT (FOR TESTING)
-
-
-
-
-
-
-
-
-
-
-
-
-
*/
// CODE: 0001
// HTML ELEMENTS
var play_btn =          document.getElementById("play-btn"),
    win_1 =             document.getElementsByClassName("starting-point")[0],
    win_2 =             document.getElementsByClassName("winning-point")[0],
    waiting =           document.getElementsByClassName("loading-screen")[0];
// Canvas Elements/Context
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
    if(window.innerWidth <= 450) {
        board_width =       window.innerWidth/1;
        board_height =      window.innerHeight/1;
        box_size =          board_width/10;
        box_margin =        box_size*0.05;
        with(dice_body.style) {
            margin = "40vh !important";
        }
    }

    if(window.innerWidth >= 750) {
        board_width =       window.innerWidth/2.5;
        board_height =      window.innerHeight/2.5;
        box_size =          board_width/10;
        box_margin =        box_size*0.05;
        with(dice_body.style) {
            margin = "40vh !important";
        }
    } 
    else if(window.innerHeight >= 600 && window.innerWidth >= 450) {
        board_width =       window.innerWidth/2;
        board_height =      window.innerHeight/2;
        box_size =          board_width/10;
        box_margin =        box_size*0.05;
        with(dice_body.style) {
            margin = "40vh !important";
        }
    }
    
    else if(window.innerHeight >= 500) {
        board_width =       window.innerWidth/1.25;
        board_height =      window.innerHeight/1.25;
        box_size =          board_width/10;
        box_margin =        box_size*0.05;
        with(dice_body.style) {
            margin = "30vh !important";
        }
    }else if(window.innerHeight >= 501) {
        board_width =       window.innerWidth/2;
        board_height =      window.innerHeight/2;
        box_size =          board_width/10;
        box_margin =        box_size*0.05;
        with(dice_body.style) {
            margin = "35vh !important";
        }
    } else {
       // do nothing...
    }

// In Game State 
var ingame_status = false;
// if player is moving
var on_movement_state = false;
var Animation_speed   = 400;    // ms
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
// CODE: 0002
// Snake head and Tail Location in MAP
const snake_head =      [
                        [85, 75, 45, 15, 35, 75, 55],
                        [65, 55, 65, 35,  5, 15, 5]
                        ],
snake_tail =            [
                        [95, 55, 55, 25, 25, 35, 45],
                        [95, 75, 95, 85, 25, 75, 45]
                        ];

// Ladders magnitude in MAP
const ladders_initial = [
                        [95, 65, 25, 15, 15, 45, 65, 85],
                        [75, 85, 65, 55,  5, 25, 35,  5]
                        ],
      ladders_final =   [
                        [75, 35,  5,  5,  5, 75, 95, 95],
                        [95, 95, 95, 75, 25, 75, 55, 25]
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
// if player is eaten by a snake or using a ladder, these are the locations
/*                      |-----------------------------------------------|---------------------------------------------------------|
                        |           SNAKE HEAD & TAIL LOCATION          |                LADDER INTIAL & FINAL LOCATION           |
                        |-----------------------------------------------|---------------------------------------------------------|   */
                        // INPUT
const xs         =      [    2,     6,    8,    2,    8,     5,     7,   /**/    1,     4,    8,    1,     8,   10,     1,    10],
      ys         =      [    2,     6,    3,    9,    3,     5,     7,   /**/   10,     7,    3,   10,     3,    1,     1,    10],
      os         =      [    3,    11,   15,    3,   15,     9,    13,   /**/    1,     7,   15,    1,    15,   19,     1,    19],
      is         =      [false, false, true, true, true, false, false,   /**/ true,  true, true, true,  true, true, false, false],
      ii         =      [   30,    30,   40,   60,   80,    90,    90,   /**/    0,     0,    0,   20,    20,   40,    70,    70],
      fs         =      [   68,    64,   57,   31,   17,     5,     3,   /**/   90,    93,   97,   70,    77,   59,    29,    20],
                        // OUTPUT   
      out_xs     =      [   10,     6,    6,    8,    4,     6,     8,   /**/    8,     4,   10,    2,     6,    7,     2,     9],
      out_ys     =      [    1,     5,    5,    8,    7,     6,     8,   /**/    8,     4,    1,    9,     6,    4,     2,     9],
      out_os     =      [   19,    11,   11,   15,    7,    11,    15,   /**/   15,     7,   19,    3,    11,   13,     3,    17],
      out_is     =      [ true,  true, true,false, true, false, false,   /**/false, false, true, true, false, true, false, false],
      out_ii     =      [    0,     0,   20,   10,   20,    50,    70,   /**/   30,    10,   20,   40,    70,   60,    90,    90],
      out_fs     =      [   99,     95,  75,   82,   73,    44,    22,   /**/   62,    86,   79,   51,    24,   36,     8,     1];
// Second Verification of snakes head and ladders.  
var second_ver_head =   [   68,    64,   57,   31,   17,     5,     3,   /**/   90,    93,   97,   70,    77,   59,    29,    20];
var second_ver_tail =   [   99,     95,  75,   82,   73,    44,    22,   /**/   62,    86,   79,   51,    24,   36,     8,     1];

// initializing Canvas/Map Size
with(cvs) {
    width =             board_width;
    height =            board_width;
}
//  WINDOW CLIENT SIDES
// CODE: 0003
var play_on_audio =         new Audio("assets/sound/start.mp3"),
    snake_eaten_audio =     new Audio("assets/sound/snake.mp3"),
    stepping_audio =        new Audio("assets/sound/step.mp3"),
    wins_audio =            new Audio("assets/sound/win.mp3");


    var play_on=()=> {
    play_on_audio.volume = 0.15;
    play_on_audio.play();
    clearInterval(snake_animation_interval);
    ingame_status = true;
    with(play_btn) {
        innerHTML = "Loading...";
        with(style) {
            position =          "fixed";
            zIndex =            100;
            top =               "-3.6%";
            left =              0;
            backgroundColor =   "crimson";//"rgb(255, 0, 43)";
            width =             "100%";
            height =            "100%";
            fontSize =          "150%";
            letterSpacing =     "3px";
        }
    }
    console.log(image_loader);
        setTimeout(function() {
            with(win_1.style) {
                opacity = 0+"%";
                dice_body.disabled = true;
                setTimeout(function() {
                    display = "none";
                    dice_body.disabled = false;
                }, 500);
            
            }
        }, 1500);
}

// WINNING FUNCTION
var youwin=()=> {
    wins_audio.play();
    ingame_status = false;
    with(win_2.style) {
        marginTop = 0;
        backgroundColor = "rgba(0, 0, 0, 0.75)";
    }
    dice_body.style.opacity = 0;
}
// RESET FUNCTION
var resetter =()=> {
    ingame_status = true;
    dice_body.style.opacity ="100%";
    with(win_2.style) {
        marginTop="-100vh";
        backgroundColor = "none";
    }
    x_inc =             0;
    y_inc =             0;
    odd_num =           -1;
    inversion_state =   true;
    increment_by_10 =   0;
    final_movement =    0; 
    overflow_player =   false;
    for(let i = 0 ; i < map.length; i++) {
        map[i] = 0;
    }
    map_render();
    dice_body.disabled = false;
}
// GRAPHICS FOR SNAKES AND LADDERS
var image_SAL_render = new Image();
var image_loader = false;
image_SAL_render.onload= ()=> {
    image_loader = true;
    waiting.style.display = "none";
    ctx.drawImage(
        image_SAL_render,
        0,
        0,
        board_width,
        board_width);
}
image_SAL_render.src = "assets/images/full_map2.png";

var snakes_animation = document.getElementsByClassName("snakes_move");
var snake_animation_inversion = false;
var snake_scaleX = 1;
var snakeMotion =()=> {
    for(let i = 0 ; i < snakes_animation.length ; i++) {
        snake_animation_inversion = (snake_animation_inversion == false)?true:false;
        snake_scaleX =  (!snake_animation_inversion)?-1:1;
        with(snakes_animation[i].style) {
            transform = "rotate(-90deg) scaleX("+snake_scaleX+")";
        }
    }
   
}
var snake_animation_interval = setInterval(snakeMotion, 500);



// CODE: 0004
// Map rendering...
var map_render =()=> {
    with(ctx) {
        clearRect(0, 0, board_width, board_width);
        for(y = 0; y < 10 ; y++) {    
            for(x = 0; x < 10 ; x++) {
                switch(map[x+y*10]) {
                    case 0: // tiles
                        fillStyle = "#139487";
                    break;
                    case 1: // player
                        fillStyle = "#072227";
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

       
        drawImage(
            image_SAL_render,
            0,
            0,
            board_width,
            board_width);
        
        // GUIDE FOR SNAKES AND LADDERS (CANVAS LINES)
        // snake length - in percentage 
        //  FORMULA : x * y / 100
        // for(i=0;i<snake_head[0].length;i++) {
        //     beginPath();
        //         lineWidth = 4;
        //         strokeStyle = "cornflowerblue";
        //         moveTo(
        //             board_width*(snake_head[0][i]/100), 
        //             board_width*(snake_head[1][i]/100)
        //             );
        //         lineTo(
        //             board_width*(snake_tail[0][i]/100), 
        //             board_width*(snake_tail[1][i]/100)
        //             );
        //         stroke();
        //     closePath();
        // }
        // for(i=0;i<ladders_final[0].length;i++) {
        //     beginPath();
        //         lineWidth = 4;
        //         strokeStyle = "#a2ab58";
        //         moveTo(
        //             board_width*(ladders_initial[0][i]/100), 
        //             board_width*(ladders_initial[1][i]/100)
        //             );
        //         lineTo(
        //             board_width*(ladders_final[0][i]/100), 
        //             board_width*(ladders_final[1][i]/100)
        //             );
        //         stroke();
        //     closePath();
        // }
    } 
}
map_render();
/*
    Formula for inverting (1 - 10)
    y - Final Result
    x - increment by 1
    z - odd numbers Required (1,3,5 - 19)
    y = (x+10) - z
    z = 1 + 2 
*/
// CODE: 0005
// when player eaten by snake function
var snake_catcher=      (xs_in=0, ys_in=0, 
                        os_in=0, is_in=0, 
                        ii_in=0, fs_in=0)=> {
    snake_eaten_audio.play();
    const snake_head_sample =  [32, 36, 48, 62, 88, 95, 97, 0,0,0,0,0,0,0,0];
    for(let i = 0; i < snake_head_sample.length ; i++) {
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
var overflow_player = false,
    overflow_count  = 0;
// CODE: 0006
// Player movement in map
var Roll =()=> {
    if(overflow_player == false) {
        x_inc += 1;
        if(x_inc > 10) {
            increment_by_10 += 10;
            x_inc = 1;
            if(!inversion_state && final_movement > 0) {
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
        final_movement = 100-(y_inc + increment_by_10); 
        if(final_movement<=0) overflow_player = true;
        overflow_count = 0;
    }
    else {
        map[final_movement] = 0;
        overflow_count += 1;
        x_inc = 10 -overflow_count;
        y_inc = 10 - overflow_count;
       odd_num -= 2;
       final_movement = overflow_count;
        if(on_movement_state) overflow_player = false;
    }  
    map[final_movement] = 1;
    // CODE: 0007 
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
        for(let i = 0 ; i < second_ver_head.length ;i++) {
            if(final_movement == second_ver_head[i] && on_movement_state == true) {
                map[second_ver_tail[i]] = 1;
               // CODE: 0008
                // DEVELOPER ONLY: Comment the Entire 
                // snake_catcher() function to disable the snake
                dice_body.disabled = true;
                setTimeout(function()
                {
                    snake_catcher(
                        x_inc,
                        y_inc,
                        odd_num,
                        inversion_state,
                        increment_by_10,
                        final_movement 
                    );
                    dice_body.disabled =false;
                }, Animation_speed); 
            }
        }
       if(on_movement_state) {
        if(
               x_inc ==              10
            && y_inc ==              10
            && odd_num  ==           19
            && inversion_state ==    false
            && increment_by_10 ==    90
            && final_movement  ==    0
          ) {
                // CODE: 0009
                // if you Win
                // CODE HERE
                dice_body.disabled = true;
               setTimeout(function(){
                    youwin();
                }, 750);
          }
    // FOR DEVELOPER: for checking the current location of player
    // CODE: 0010
    //     console.log(
    //         " " + x_inc
    //        +" " + y_inc
    //        +" " + odd_num
    //        +" " + inversion_state
    //        +" " + increment_by_10
    //        +" " + (final_movement)
    //        +" " + overflow_player
    //    );
       }
    map_render();
    stepping_audio.play();
}

var previous_span_count = 0;
var dice_dots_create_state = false;

// CODE: 0011
var rolling=()=> {
    dice_body.innerHTML = "";
    with(dice_body.style) {
        transform = "rotate(360deg) scale(175%)";
    }
    previous_span_count = c_a_limit;
    c_a_limit = Math.ceil(Math.random()*6);
    //c_a_limit =1; // for Debuging player movement
    dice_body.disabled = true;
    setTimeout(roll_ctrl, c_a_time);
    c_a_counter = 0;
    
  // console.log(c_a_limit);
   for(let i = 0; i < c_a_limit;i++) {
    var spanCreate = document.createElement("span");
    spanCreate.classList.add("dots");
    spanCreate.classList.add("m-1");
    dice_body.appendChild(spanCreate);
    }
 //  
}

var roll_ctrl=()=> {
    c_a_counter += 1;
    if(c_a_counter == c_a_limit) {
        on_movement_state = true;
        clearTimeout(roll_ctrl);
        dice_body.disabled = false;
        dice_dots_create_state = true;
        
        with(dice_body.style) {
            transform = "rotate(-360deg)";
        }
        
    }
    else {
        on_movement_state = false;
        setTimeout(roll_ctrl, c_a_time/2);
    }
   // setTimeout(function() {Roll();}, c_a_time/2);
    Roll();
}
// Computer Movement
// CODE: 0012
// setInterval(()=> {
//     rolling();
// }, 2000);







