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

  let drawFunctions;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);

  // Instantiate BlackLine objects
  blackLines = [
    new BlackLine(280, 731, 190, 4, 4),
    new BlackLine(338, 755, 960, 4, 4)
  ];

  // Instantiate DrawFunction objects
  drawFunctions = [
    new DrawFunction(68, 575, -28, 22, (i, hue) => {
      noFill();
      // Set stroke color with hue
      stroke(hue, 100, 100); 
      let y = i * 6;
      let x1 = 0 + i * 4.5;
      let x2 = 480 - i * 3.7;
      // Draw the line
      line(x1, y, x2, y); 
    })
  ];
}

function draw() {
// Set background color
  background(247, 241, 223); 
// Update hue based on frame count  
  let hue = (frameCount % 360); 
// Draw each black line
  blackLines.forEach(line => line.draw(hue)); 
// Draw each draw function
  drawFunctions.forEach(drawFunc => drawFunc.draw(hue)); 
}

let referenceWidth = 1280;
let referenceHeight = 720;

function draw() {
// Set background color
  background(247, 241, 223); 
// Calculate scale factor
  let scaleFactor = min(width / referenceWidth, height / referenceHeight); 
// Translate to the center of the window
  translate(width / 2, height / 2); 
// Apply scaling
  scale(scaleFactor); 
// Translate to the top-left corner of the reference size
  translate(-referenceWidth / 2, -referenceHeight / 2); 
// Update hue based on frame count
  let hue = (frameCount % 360); 
// Draw each black line
  blackLines.forEach(line => line.draw(hue)); 
// Draw each draw function
  drawFunctions.forEach(drawFunc => drawFunc.draw(hue)); 
}

let drawCounter = 0;
let totalLines = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);

  // Instantiate BlackLine objects
  blackLines = [
    new BlackLine(280, 731, 190, 4, 4),
    new BlackLine(338, 755, 960, 4, 4)
  ];

  // Instantiate DrawFunction objects
  drawFunctions = [
    new DrawFunction(68, 575, -28, 22, (i, hue) => {
      noFill();
      stroke(hue, 100, 100); 
      let y = i * 6;
      let x1 = 0 + i * 4.5;
      let x2 = 480 - i * 3.7;
      line(x1, y, x2, y); 
    })
  ];

// Set stroke color with hue
  totalLines = blackLines.length + drawFunctions.reduce((sum, df) => sum + df.lines, 0); 
}

function draw() {
  if (drawCounter >= totalLines) {
    return; 
  }
// Set background color
  background(247, 241, 223); 
// Calculate scale factor
  let scaleFactor = min(width / referenceWidth, height / referenceHeight); 
// Translate to the center of the window
  translate(width / 2, height / 2); 
// Apply scaling
  scale(scaleFactor); 
// Translate to the top-left corner of the reference size
  translate(-referenceWidth / 2, -referenceHeight / 2); 

  let hue = (frameCount % 360); 

  let remainingDraws = drawCounter;
  blackLines.forEach(line => {
    if (remainingDraws > 0) {
      line.draw(hue);
      remainingDraws--;
    }
  });

  drawFunctions.forEach(drawFunc => {
    if (remainingDraws > 0) {
      remainingDraws = drawFunc.draw(hue, remainingDraws); 
    }
  });

  drawCounter++; 
}

let allLinesDrawn = false;

function draw() {
  if (allLinesDrawn) {
    return; 
  }
// Set background color
  background(247, 241, 223); 
// Calculate scale factor
  let scaleFactor = min(width / referenceWidth, height / referenceHeight); 
// Translate to the center of the window
  translate(width / 2, height / 2); 
  scale(scaleFactor); 
// Translate to the top-left corner of the reference size
  translate(-referenceWidth / 2, -referenceHeight / 2); 
// Update hue based on frame count
  let hue = (frameCount % 360); 

  let remainingDraws = drawCounter;
  blackLines.forEach(line => {
    if (remainingDraws > 0) {
      line.draw(hue);
      remainingDraws--;
    }
  });

  drawFunctions.forEach(drawFunc => {
    if (remainingDraws > 0) {
      remainingDraws = drawFunc.draw(hue, remainingDraws); 
    }
  });

  drawCounter++; 

  if (drawCounter >= totalLines) {
    // Set flag when all lines are drawn
    allLinesDrawn = true; 
    drawCounter = 0; 
    setTimeout(() => {
      background(247, 241, 223); 
      allLinesDrawn = false; 
    }, 1000); 
  }
}

function mousePressed() {
    drawCounter = 0; 
    allLinesDrawn = false; 
  }