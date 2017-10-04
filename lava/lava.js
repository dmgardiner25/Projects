/* FAIR WARNING - This is my first JavaScript/p5.js script and the code might not be the most efficient so
                  if you have tips, shoot me an email!
*/

var executed = false;                        // Used to keep track of whether or not the spots were placed
var num_spots = 100;                          // Total number of spots in the lava
var spots = new Array(num_spots);            // Array of spots
var c_width = 800;                           // Width of canvas
var c_height = 400;                          // Height of canvas

// Class for the spots on the lava
class lava_spot {
  constructor() {
    this.spot_x = Math.floor(Math.random() * (c_width - 5));
    this.spot_y = Math.floor(Math.random() * 95) + 300;
    this.orig_y = this.spot_y;
    this.color = Math.floor(Math.random() * 100) + 101;
    this.color_dir = Math.floor(Math.random() * 2) + 1;
    this.gravity = (Math.random() * (0.2 - 0.1) + 0.1);
    this.gravity_speed = Math.floor(Math.random() * 5) + 5;
    this.down = false;
    this.stop = false;
    this.jumping = false;
  }
  // Place the spot on the lava
  place() {
    fill(255, this.color, 15);
    rect(this.spot_x, this.spot_y, 5, 5);
  }
  // Update the spot with new color/position
  re_draw() {
    if (this.color >= 200)
      this.color_dir *= -1;
    else if (this.color <= 100)
      this.color_dir *= -1;
    fill(255, this.color += this.color_dir, 15);
    rect(this.spot_x, this.spot_y, 5, 5);
  }
  // Make the spot jump!
  jump() {
    this.jumping = true;
    if(!this.stop) {
        if(this.down) {
            this.down = true;
            this.gravity_speed += this.gravity;
            this.spot_y += this.gravity_speed;
          if(this.spot_y >= this.orig_y)  
            this.stop = true;
        } else {
            this.down = false;
            this.gravity_speed -= this.gravity;
            this.spot_y -= this.gravity_speed;
            if(this.gravity_speed <= 0)
                this.down = true;
        }
    }   
    if(this.stop)
      this.jumping = false;
    this.re_draw();
  }
  get curr_y() { 
    return this.spot_y; 
  }
  get start_y() {
    return this.orig_y;
  }
  get is_jumping() {
    return this.jumping;
  }
}

function setup() {
  createCanvas(c_width, c_height);
}

// Creates and places lava spots
function spotify(num) {
  noStroke();
  if (!executed) {
    executed = true;
    for (var i = 0; i < num; i++) {
      spots[i] = new lava_spot();
      spots[i].place();
    }
  }
  for (var i = 0; i < num; i++) {
    if(!spots[i].is_jumping && Math.floor(Math.random() * 1000) === 0)
      spots[i].jump();
    else if(spots[i].is_jumping)
      spots[i].jump();
    else
      spots[i].re_draw();
  }
}

function draw() {
  background(220);

  // Lava
  fill(255, 79, 15);
  rect(0, 300, c_width, 100);
  spotify(num_spots);
}