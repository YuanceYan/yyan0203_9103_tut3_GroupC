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
  
  let blackLines;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  
// Instantiate BlackLine objects
  blackLines = [
    new BlackLine(280, 731, 190, 4, 4),
    new BlackLine(338, 755, 960, 4, 4)
  ];
}

function draw() {
// Set background color
  background(247, 241, 223);
// Update hue based on frame count
  let hue = (frameCount % 360);
// Draw each line
  blackLines.forEach(line => line.draw(hue)); 
}

class DrawFunction {
    constructor(x, y, rotation, lines, config) {
      this.x = x; 
      this.y = y; 
      // Rotation angle
      this.rotation = rotation; 
      // Number of lines
      this.lines = lines; 
      // Configuration function for drawing lines
      this.config = config; 
    }
  
    draw(hue) {
      push();
      // Translate to the position
      translate(this.x, this.y); 
      // Rotate the drawing context
      rotate(this.rotation); 
      for (let i = 0; i < this.lines; i++) {
        // Apply the configuration function
        this.config(i, hue); 
      }
      pop();
    }
  }