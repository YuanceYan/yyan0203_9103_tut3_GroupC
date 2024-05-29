// Class representing a blackline
class BlackLine {
  constructor(x, y, w, h, adjustW) {
    //x coordinate
    this.x = x; 
    //y coordinate
    this.y = y; 
    //width of blackline
    this.w = w; 
    //height of blackline
    this.h = h; 
    //adjustment to width
    this.adjustW = adjustW; 
  }

  //Draw the black line
  draw(hue) {
    push(); 
    translate(this.x, this.y); 
    rotate(-28); 
    noStroke();
    fill(hue, 100, 100, map(sin(frameCount * 2), -1, 1, 50, 100)); 
    rect(0, 0, this.w + this.adjustW, this.h); 
    pop(); 
  }
}

//Class representing a drawing function
class DrawFunction {
  constructor(x, y, rotation, lines, config) {
    this.x = x; 
    this.y = y; 
    this.rotation = rotation; 
    this.lines = lines; 
    this.config = config; 
  }

  //Method to draw the configured lines
  draw(hue, drawCount) {
    push();
    translate(this.x, this.y); 
    rotate(this.rotation + sin(frameCount * 0.5) * 5); 
    for (let i = 0; i < this.lines && drawCount > 0; i++) {
      this.config(i, hue); 
      drawCount--; 
    }
    pop(); 
    return drawCount; 
  }
}

let referenceWidth = 1280; 
let referenceHeight = 720; 
let drawCounter = 0; 
let totalLines = 0; 
let allLinesDrawn = false; 
let drawingLines = true;
let blackLines; 
let drawFunctions; 

//Setup function
function setup() {
  createCanvas(windowWidth, windowHeight); 
  colorMode(HSB, 360, 100, 100, 100); 
  angleMode(DEGREES); 

  //Initialize blackline
  blackLines = [
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

  //Initialize draw function
  drawFunctions = [
    new DrawFunction(68, 575, -28, 22, (i, hue) => {
      noFill();
      let gradientColor = color(hue, 100, map(i, 0, 22, 50, 100)); 
      stroke(gradientColor); 
      strokeWeight(map(sin(frameCount * 0.5), -1, 1, 1, 4)); 
      let y = i * 6 + sin(frameCount * 0.1 + i) * 5; 
      let x1 = 0 + i * 4.5;
      let x2 = 480 - i * 3.7;
      line(x1, y, x2, y);
    }),
    new DrawFunction(843, 154, -28, 57, (i, hue) => {
      if (i >= 20 && i < 33) {
        noStroke(); 
      } else {
        noFill(); 
        let gradientColor = color(hue, 100, map(i, 0, 57, 50, 100)); 
        stroke(gradientColor); 
        strokeWeight(map(sin(frameCount * 0.5), -1, 1, 1, 4)); 
      }
      let y = i * 6 + sin(frameCount * 0.1 + i) * 5; 
      let x1 = 0 - i * 4;
      let x2 = 69 + i * 3.3;
      line(x1, y, x2, y); 
      if (i == 7 || i == 13) {
        noStroke();
        fill(hue, 100, 100, map(sin(frameCount * 2), -1, 1, 50, 100)); 
        if (i == 7) {
          rect(x1, y, 80, 10); 
          rect(x2, y, 260, 10);
        } else if (i == 13) {
          rect(x1, y, 124, 8); 
          rect(x2, y, 260, 10);
        }
      } else if (i == 17) {
        noStroke();
        //Fading color
        fill(hue, 100, 100, map(sin(frameCount * 2), -1, 1, 50, 100)); 
        rect(x1, y, 154, 6); 
      }
    }),
    new DrawFunction(153, 530, -28, 54, (i, hue) => {
      noFill(); 
      //Gradient color
      let gradientColor = color(hue, 100, map(i, 0, 54, 50, 100)); 
      stroke(gradientColor); 
      //Pulsating line width
      strokeWeight(map(sin(frameCount * 0.5), -1, 1, 1, 4)); 
      let y = i * 6 + sin(frameCount * 0.1 + i) * 5; 
      let x1 = 0 + i * 4;
      let x2 = x1 + 50;
      line(x1, y, x2, y); 
    }),
    new DrawFunction(238, 712, -28, 20, (i, hue) => {
      if (i >= 10 && i < 14) {
        noStroke();
      } else {
        noFill(); 
        //Gradient color
        let gradientColor = color(hue, 100, map(i, 0, 20, 50, 100)); 
        stroke(gradientColor); 
        //Pulsating line width
        strokeWeight(map(sin(frameCount * 0.5), -1, 1, 1, 4)); 
      }
      let y = i * 6 + sin(frameCount * 0.1 + i) * 5; 
      let x1 = 0 + i * 5;
      let x2 = x1 + 1280;
      line(x1, y, x2, y); 
    }),
    new DrawFunction(144, 609, -28, 2, (i, hue) => {
      noFill(); 
      let gradientColor = color(hue, 100, 100); 
      stroke(gradientColor); 
      //Pulsating line width
      strokeWeight(map(sin(frameCount * 0.5), -1, 1, 1, 4)); 
      let y = i * 24 + sin(frameCount * 0.1 + i) * 10; 
      let x1 = 0 + i * 16;
      let x2 = x1 + 1200;
      line(x1, y, x2, y); 
    }),
    new DrawFunction(94, 651, -28, 9, (i, hue) => {
      noFill(); 
      //Gradient color
      let gradientColor = color(hue, 100, map(i, 0, 9, 50, 100)); 
      stroke(gradientColor); 
      //Pulsating line width
      strokeWeight(map(sin(frameCount * 0.5), -1, 1, 1, 4)); 
      let y = i * 6 + sin(frameCount * 0.1 + i) * 5; 
      let x1 = 0 + i * 5;
      let x2 = 440 - i * 3;
      line(x1, y, x2, y); 
    }),
    new DrawFunction(812, 423, -28, 1, (i, hue) => {
      noStroke(); 
      //Fading color
      fill(hue, 100, 100, map(sin(frameCount * 2), -1, 1, 50, 100)); 
      rect(0, 0, 311, 5); 
    })
  ];

  //Calculate the total number of lines to draw
  totalLines = blackLines.length + drawFunctions.reduce((sum, df) => sum + df.lines, 0);
}

function draw() {
  if (allLinesDrawn) {
    return; 
  }

  //Dynamic background color
  let bgHue = (frameCount * 0.1) % 360;
  background(bgHue, 50, 100);
  //Calculate scaling factor
  let scaleFactor = min(width / referenceWidth, height / referenceHeight); 
  translate(width / 2, height / 2); 
  scale(scaleFactor); 
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

  if (drawCounter >= totalLines) {
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
  drawingLines = !drawingLines; // Toggle between drawing lines and rectangles
}

// Resize canvas to fit window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
}