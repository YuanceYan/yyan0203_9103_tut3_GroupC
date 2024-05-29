//Define the BlackLine class to represent black lines with adjustable parameters
class BlackLine {
  constructor(x, y, w, h, adjustW) {
    this.x = x;       
    this.y = y;        
    this.w = w;        
    this.h = h;  
    //Adjustment for width      
    this.adjustW = adjustW; 
  }

  //Method to draw the black line
  draw(hue) {
    //Save the current drawing style settings and transformations
    push();      
    //Move the origin to the (x, y) position               
    translate(this.x, this.y);  
    //Rotate the drawing context
    rotate(-28);                
    noStroke();       
    //Set the fill color based on hue          
    fill(hue, 100, 100);    
    //Draw a rectangle representing the line    
    rect(0, 0, this.w + this.adjustW, this.h); 
    pop();                      
  }
}

//Define the DrawFunction class to encapsulate drawing functions with specific configurations
class DrawFunction {
  constructor(x, y, rotation, lines, config) {
    this.x = x;            
    this.y = y;            
    this.rotation = rotation; 
    this.lines = lines;    
    this.config = config;  
  }

  //Method to draw lines based on the configuration function
  draw(hue, drawCount) {
    //Save the current drawing style settings and transformations
    push();                    
    //Move the origin to the (x, y) position
    translate(this.x, this.y);  
    //Rotate the drawing context
    rotate(this.rotation);      

    //Draw the specified number of lines
    for (let i = 0; i < this.lines && drawCount > 0; i++) {
      //Call the configuration function to draw a line
      this.config(i, hue); 
      drawCount--;         
    }

    pop();                
    return drawCount;  
  }
}

//Define variables and setup the canvas
let referenceWidth = 1280; 
let referenceHeight = 720; 
let drawCounter = 0;       
let totalLines = 0;        
let allLinesDrawn = false; 
let blackLines;            
let drawFunctions;        

//Setup canvas
function setup() {
  //Create a canvas with window size
  createCanvas(windowWidth, windowHeight); 
  colorMode(HSB, 360, 100, 100); 
  angleMode(DEGREES);            

  //Initialize instances of BlackLine
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

  //Initialize instances of DrawFunction
  drawFunctions = [
    new DrawFunction(68, 575, -28, 22, (i, hue) => {
      noFill();
      stroke(hue, 100, 100);
      let y = i * 6;
      let x1 = 0 + i * 4.5;
      let x2 = 480 - i * 3.7;
      line(x1, y, x2, y);
    }),
    new DrawFunction(843, 154, -28, 57, (i, hue) => {
      if (i >= 20 && i < 33) {
        noStroke();
      } else {
        noFill();
        stroke(hue, 100, 100);
      }
      let y = i * 6;
      let x1 = 0 - i * 4;
      let x2 = 69 + i * 3.3;
      line(x1, y, x2, y);
      if (i == 7 || i == 13) {
        noStroke();
        fill(hue, 100, 100);
        if (i == 7) {
          rect(x1, y, 80, 10);
          rect(x2, y, 260, 10);
        } else if (i == 13) {
          rect(x1, y, 124, 8);
          rect(x2, y, 260, 10);
        }
      } else if (i == 17) {
        noStroke();
        fill(hue, 100, 100);
        rect(x1, y, 154, 6);
      }
    }),
    new DrawFunction(153, 530, -28, 54, (i, hue) => {
      noFill();
      stroke(hue, 100, 100);
      let y = i * 6;
      let x1 = 0 + i * 4;
      let x2 = x1 + 50;
      line(x1, y, x2, y);
    }),
    new DrawFunction(238, 712, -28, 20, (i, hue) => {
      if (i >= 10 && i < 14) {
        noStroke();
      } else {
        noFill();
        stroke(hue, 100, 100);
      }
      let y = i * 6;
      let x1 = 0 + i * 5;
      let x2 = x1 + 1280;
      line(x1, y, x2, y);
    }),
    new DrawFunction(144, 609, -28, 2, (i, hue) => {
      noFill();
      stroke(hue, 100, 100);
      let y = i * 24;
      let x1 = 0 + i * 16;
      let x2 = x1 + 1200;
      line(x1, y, x2, y);
    }),
    new DrawFunction(94, 651, -28, 9, (i, hue) => {
      noFill();
      stroke(hue, 100, 100);
      let y = i * 6;
      let x1 = 0 + i * 5;
      let x2 = 440 - i * 3;
      line(x1, y, x2, y);
    }),
    new DrawFunction(812, 423, -28, 1, (i, hue) => {
      noStroke();
      fill(hue, 100, 100);
      rect(0, 0, 311, 5);
    })
  ];

  //Calculate the total number of lines to draw
  totalLines = blackLines.length + drawFunctions.reduce((sum, df) => sum + df.lines, 0);
}

//Define the draw function
function draw() {
  //Check if all lines are drawn
  if (allLinesDrawn) {
    return; 
  }

  //Set background color to light beige
  colorMode(RGB);
  background(247, 241, 223); 

  //Scale and translate canvas to fit the window
  let scaleFactor = min(width / referenceWidth, height / referenceHeight);
  translate(width / 2, height / 2);
  scale(scaleFactor);
  translate(-referenceWidth / 2, -referenceHeight / 2);

  colorMode(HSB, 360, 100, 100);
  //Calculate hue based on frame count
  let hue = (frameCount % 360); 

  let remainingDraws = drawCounter; 

  //Draw blacklines
  blackLines.forEach(line => {
    if (remainingDraws > 0) {
      line.draw(hue); 
      remainingDraws--; 
    }
  });

  //Draw lines using draw functions
  drawFunctions.forEach(drawFunc => {
    if (remainingDraws > 0) {
      remainingDraws = drawFunc.draw(hue, remainingDraws);
    }
  });

  drawCounter++;

  // Check if all lines are drawn
  if (drawCounter >= totalLines) {
    allLinesDrawn = true;
    drawCounter = 0;      

    // Clear the canvas after a brief pause
    let clearCanvasTimeout = () => {
      background(247, 241, 223); 
      allLinesDrawn = false;    
    };
    
    // Set a timeout to clear the canvas
    setTimeout(clearCanvasTimeout, 1000); 
  }
}