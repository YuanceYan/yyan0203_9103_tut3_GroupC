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

function draw() {
  colorMode(RGB);        
  background(247, 241, 223);     

  let scaleFactor = min(width / referenceWidth, height / referenceHeight); 
  // Center the drawing
  translate(width / 2, height / 2); 
  scale(scaleFactor);   
  // Translate to fit the reference dimensions         
  translate(-referenceWidth / 2, -referenceHeight / 2); 

  // Calculate hue based on the frame count
  let hue = (frameCount % 360);  

  // Array of BlackLine with their positions and sizes
  let blackLines = [
    new BlackLine(280, 731, 190, 4, 4),
    new BlackLine(338, 755, 960, 4, 4),
    new BlackLine(112, 659, 210, 6, 6),
    new BlackLine(128, 666, 210, 6, 6),
    new BlackLine(140, 672, 210, 6, 6),
    new BlackLine(308, 525, 505, 10, -12),
    new BlackLine(336, 540, 505, 10, -12),
    new BlackLine(436, 595, 45, 8, -12),
    new BlackLine(460, 610, 17, 8, -12)
  ];

  // Array of DrawFunction with their positions, rotations, and configurations
  let drawFunctions = [
    new DrawFunction(68, 575, -28, 22, (i, hue) => {
      noiseLine(i, hue, 0, 4.5, 480, 3.7);
    }),
    new DrawFunction(843, 154, -28, 57, (i, hue) => {
      if (i >= 20 && i < 33) {
        noStroke();
      } else {
        noiseLine(i, hue, 0, -4, 69, 3.3);
      }
      if (i == 7 || i == 13) {
        noStroke();
        fill(hue, 100, 100);
        if (i == 7) {
          noiseRect(i, hue, 80, 10, 80, 260, 10);
        } else if (i == 13) {
          noiseRect(i, hue, 124, 8, 124, 260, 10);
        }
      } else if (i == 17) {
        noStroke();
        fill(hue, 100, 100);
        noiseRect(i, hue, 154, 6, 0, 0, 0);
      }
    }),
    new DrawFunction(153, 530, -28, 54, (i, hue) => {
      noiseLine(i, hue, 0, 4, 50, 4);
    }),
    new DrawFunction(238, 712, -28, 20, (i, hue) => {
      if (i >= 10 && i < 14) {
        noStroke();
      } else {
        noiseLine(i, hue, 0, 5, 1280, 0);
      }
    }),
    new DrawFunction(144, 609, -28, 2, (i, hue) => {
      noiseLine(i, hue, 0, 16, 1200, 0);
    }),
    new DrawFunction(94, 651, -28, 9, (i, hue) => {
      noiseLine(i, hue, 0, 5, 440, -3);
    }),
    new DrawFunction(812, 423, -28, 1, (i, hue) => {
      noStroke();
      fill(hue, 100, 100);
      noiseRect(0, hue, 311, 5, 0, 0, 0);
    })
  ];

  // Draw each blackline with the current hue
  blackLines.forEach(line => line.draw(hue));
  // Draw each set of lines using the draw functions
  drawFunctions.forEach(drawFunc => drawFunc.draw(hue));
}

// Function to draw a line with  perlin noise applied to its position and color
function noiseLine(i, hue, x1Offset, x1Scale, x2Scale, x2Offset) {
  noFill(); 
  // Vertical position with perlin noise
  let y = i * 6 + noise(frameCount * 0.01 + i) * 30; 
  // Start X position with perlin noise
  let x1 = x1Offset + noise(frameCount * 0.01 + i) * x1Scale; 
  // End X position with noise
  let x2 = x2Offset + noise(frameCount * 0.01 + i) * x2Scale; 
  // Color with perlin noise
  let lineHue = hue + noise(frameCount * 0.02 + i) * 60; 
  stroke(lineHue, 100, 100); 
  line(x1, y, x2, y); 
}

// Function to draw a rectangle with perlin noise applied to its position and color
function noiseRect(i, hue, w1, h1, x2Offset, w2, h2) {
  // Horizontal position with perlin noise
  let xOffset = noise(frameCount * 0.01 + i) * 30; 
  // Vertical position with perlin noise
  let yOffset = noise(frameCount * 0.01 + i) * 30; 
  let rectHue = hue + noise(frameCount * 0.03 + i) * 100; 
  fill(rectHue, 100, 100); 
  rect(xOffset, yOffset, w1, h1); 
  rect(x2Offset + noise(frameCount * 0.01) * w2, yOffset, w2, h2); 
}

// Resize the canvas to fit the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
}