function setup() {
    // Create the canvas
    createCanvas(windowWidth, windowHeight);
    // Set color mode
    colorMode(HSB, 360, 100, 100); 
    // Set angle mode
    angleMode(DEGREES); 
  }
  
  function draw() {
    // Set background color
    background(247, 241, 223); 
  }
  
  function windowResized() {
    // Resize the canvas when the window is resized
    resizeCanvas(windowWidth, windowHeight);
  }

  class BlackLine {
    constructor(x, y, w, h, adjustW) {
      // x-coordinate
      this.x = x;
      // y-coordinate
      this.y = y; 
      // width of the line
      this.w = w; 
      // height of the line
      this.h = h; 
      // width adjustment
      this.adjustW = adjustW;
    }
  
    draw(hue) {
      push();
      // Translate to the position
      translate(this.x, this.y);
      // Rotate the line
      rotate(-28);
      noStroke(); 
      // Fill color with hue
      fill(hue, 100, 100); 
      // Draw the rectangle
      rect(0, 0, this.w + this.adjustW, this.h); 
      pop();
    }
  }
  