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
  