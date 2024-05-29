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