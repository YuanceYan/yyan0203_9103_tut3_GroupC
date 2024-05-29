// Class for drawing blacklines with adjustable width
class BlackLine {
  constructor(x, y, w, h, adjustW) {
    // X position of the line
    this.x = x;  
    // Y position of the line     
    this.y = y;   
    // Width of the line    
    this.w = w;    
    // Height of the line   
    this.h = h;       
    // Adjustment for width
    this.adjustW = adjustW; 
  }

  // Draw the line with a hue
  draw(hue) {
    // Save the current drawing state
    push(); 
    // Move to the specified position       
    translate(this.x, this.y);  
    // Rotate the line by -28 degrees
    rotate(-28);  
    noStroke(); 
    fill(hue, 100, 100); 
    rect(0, 0, this.w + this.adjustW, this.h); 
    pop();                
  }
}

// Class lines with configuration
class DrawFunction {
  constructor(x, y, rotation, lines, config) {
    // X position of the drawing function
    this.x = x; 
    // Y position of the drawing function          
    this.y = y;           
    this.rotation = rotation; 
    this.lines = lines;   
    this.config = config; 
  }

  // Draw the lines with a hue
  draw(hue) {
    push(); 
    // Move to the specified position
    translate(this.x, this.y); 
    rotate(this.rotation); 
    // Loop the lines
    for (let i = 0; i < this.lines; i++) { 
      this.config(i, hue); 
    }
    pop();                
  }
}

// Reference dimensions for scaling
let referenceWidth = 1280;
let referenceHeight = 720;

// Setup function to initialize the canvas and settings
function setup() {
  // Create a window size canvas
  createCanvas(windowWidth, windowHeight); 
  colorMode(HSB, 360, 100, 100);  
  angleMode(DEGREES);   
}