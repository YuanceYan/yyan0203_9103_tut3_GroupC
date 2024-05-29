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