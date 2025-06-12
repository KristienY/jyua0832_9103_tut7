//Got inspiration from Week 12 Tutorial, Part 5 Controlling our shape class with FFT
let song; //audio file
let fft; //hold FFT object
let amp1; //amplitude analyzer for overall volume
let button1;//play/pause button

const smoothing = 0.8;
const numBins = 128;

let shapes = [];//store all our custom circle objects

function preload() {
  song = loadSound('assets/788185__cvltiv8r__flute-beat-by-cvltiv8r-93bpm-30.wav');
  //music from freemusic website
}

function setup() {
  const cnv = createCanvas(750, 500);
  cnv.parent('canvas-container'); // puts inside the <div id="canvas-container">

  //FFT 
  fft = new p5.FFT(smoothing, numBins);
  fft.setInput(song); // tell the FFT which sound to analyze
  amp1 = new p5.Amplitude();
  amp1.setInput(song);// volume tracker
  song.connect(fft); //connect audio node to FFT
  song.connect(amp1);   // connect it to amplitude node
  button1 = select('#play-pause');
  button1.mousePressed(play_pause); // grab that “🎵” button in the DOM and call play_pause() when it’s clicked

 
  // set up cora's color palette extracted from our reference first for future use
  let fullPalette = [
    "#E53935", "#FF5252", "#0097A7", "#5C91A1", "#B2DFDB", "#4E2424",
    "#FFB300", "#F48FB1", "#0D0477", "#BA68C8", "#AED581", "#7C2945",
    "#FB8C00", "#FFEB3B", "#0D0477", "#AB47BC", "#F0F4C3", "#4A154B",
    "#FF3D00", "#FF4081", "#004D61", "#A67C52", "#E1BEE7", "#103A44"
  ];

  // push into shapes
  // cora's circles
  shapes.push(new PatternedCircle(130, 250, 120, fullPalette));
  shapes.push(new PatternedCircle(670, 180, 50, fullPalette));
  shapes.push(new PatternedCircle(600, 300, 90, fullPalette.slice(8, 16)));
  shapes.push(new PatternedCircle(80, 400, 30, fullPalette.slice(8, 16)));
  shapes.push(new PatternedCircle(280, 310, 50, fullPalette.slice(8, 16)));
  // I added more to strenghen visual

  // Kristien's circles
  shapes.push(new KristienSpiralCircle(350, 160, 200));
  shapes.push(new KristienEyeCircle1(350, 350, 100, 65));
  shapes.push(new KristienEyeCircle2(80, 40, 100, 65));
  shapes.push(new KristienEyeCircle3(580, 240, 100, 65));
  shapes.push(new KristienEyeCircle4(350, 160, 100, 75));

  // Yin's circles
  shapes.push(new YinCircle(570, 100, 50));
  shapes.push(new YinCircle(190, 430, 50));
  shapes.push(new YinCircle(640, 430, 25));

}

//[Cora] 2 circle

let circlecora1;
let circlecora2;

class PatternedCircle {
  constructor(x, y, r, palette) { //// store its center coordinates, radius, and which color palette to use
    this.x = x;             
    this.y = y;             
    this.r = r;             
    this.palette = palette; 
  }

  display(scaleFactor) { // // move to its position, scale by the audio amplitude, then draw it
    push();
    translate(this.x, this.y);
    scale(scaleFactor);
    this.drawLayeredPacitaCircle();
    pop();
  }

  drawLayeredPacitaCircle() {

    // white base background 
    fill("white");
    ellipse(0, 0, this.r * 2);

    // with center black + green circles 
    fill("black");
    ellipse(0, 0, this.r * 0.4);
    fill("green");
    ellipse(0, 0, this.r * 0.25);

    // then rainbow ring outlines
    noFill();
    strokeWeight(4);
    let ringColors = this.palette.slice(0, 6);
    for (let i = 0; i < ringColors.length; i++) {
      stroke(ringColors[i]);
      ellipse(0, 0, this.r * (0.5 + 0.1 * i)); 
    }

    // also some dotted outer rings 
    let layers = 5;                          
    let startRadius = this.r * 0.55;        
    let endRadius = this.r * 0.95;           
    let step = (endRadius - startRadius) / (layers - 1);
    let maxDotSize = 10;
    let spacingFactor = 1.1;                 // controls how tight the dots are

    noStroke(); // dots don't need outlines

    for (let l = 0; l < layers; l++) {
      let radius = startRadius + l * step;
      let dotSize = min(maxDotSize, TWO_PI * radius / 20); // auto-scale dot size
      let numDots = floor(TWO_PI * radius / (dotSize * spacingFactor));
      fill(this.palette[l % this.palette.length]); // used different color for each ring

      let angleOffset = 0; // for now is no rotation - in a static mode

      for (let i = 0; i < numDots; i++) {
        let angle = TWO_PI * i / numDots + angleOffset;
        let x = cos(angle) * radius;
        let y = sin(angle) * radius;
        ellipse(x, y, dotSize); // draw each dot
      }
    }
  }
}

// ===== end Cora's circle ========

//[Kristien] 2 circle

//Kristien Circle1 with spiral
class KristienSpiralCircle {
  constructor(x, y, r) {
    this.x = x; this.y = y; this.r = r;
  }

 display(scaleFactor) {
    push();
    translate(this.x, this.y);
    scale(scaleFactor);
    this.drawSpiralCircle();
    pop();
  }

drawSpiralCircle() {
  noStroke();
  
    fill("rgb(240,248,108)"); 
    circle(0, 0, this.r);

    fill("#4B99F8E0");       
    circle(0, 0, this.r - 10);

    fill("#fc558b");         
    circle(0, 0, this.r - 20);

    fill("#f1b62e");         
    circle(0, 0, this.r - 30);

    fill("#4B99F8E0");       
    circle(0, 0, this.r - 40);

    fill("#222222");         
    circle(0, 0, this.r - 50);

    fill("#fc558b");         
    circle(0, 0, this.r - 120);
  
//sunray (x,y, inner,outer, count, colorName, weight)
  drawSunRays(0, 0, this.r * 0.46, this.r * 0.69, 40, '#E7DFDF', 2);

//generate point within the circle
  drawCirclePoints(0, 0, this.r * 0.63, 40, 'purple',     15);
  drawCirclePoints(0, 0, this.r * 0.55, 40, 'deepskyblue',10);
  drawCirclePoints(0, 0, this.r * 0.48, 20, '#e74a1f',    15);
  drawCirclePoints(0, 0, this.r * 0.39, 30, 'white',10);
  drawCirclePoints(0, 0, this.r * 0.32, 18, '#6f6dc1',    13);
  drawCirclePoints(0, 0, this.r * 0.25, 30, 'deepskyblue',8);

// inner circle snail shell 
  drawSpiral(0, 0, 1.2, 5 * TWO_PI);
  }
}

function drawSunRays(cx, cy, innerR, outerR, count, colorName, weight) {
  stroke(colorName);
  strokeWeight(weight);

  for (let i = 0; i < count; i++) {
    let angle = i * TWO_PI / count;
    let x1 = cx + innerR * cos(angle);
    let y1 = cy + innerR * sin(angle);
    let x2 = cx + outerR * cos(angle);
    let y2 = cy + outerR * sin(angle);
    line(x1, y1, x2, y2);
  }
}

function drawCirclePoints(cx, cy, r, count, colorName, weight) {
  stroke(colorName);
  strokeWeight(weight);

  for (let i = 0; i < count; i++) {
    let angle = i * (TWO_PI / count); 
//divides the circle into equal slices and each individual point is evenly spaced around the circle
    let radius = r;
// all the points will lie exactly on the circle with radius r, and form a perfect ring.
    let x = cx + radius * cos(angle);
    let y = cy + radius * sin(angle);
    point(x, y);
  }
}

function drawSpiral(cx, cy, k, maxAngle) {
  noFill();
  stroke('#ffffff');
  strokeWeight(3);

  beginShape();
  for (let angle = 0; angle < maxAngle; angle += 0.05) {
    let r = k * angle;
    let x = cx + r * cos(angle);
    let y = cy + r * sin(angle);
    vertex(x, y);// reference: https://p5js.org/reference/p5/vertex/, learn from p5.js website
  }
  endShape();
}

//Kristien Circle2 with eye

class KristienEyeCircle1 {
  constructor(x, y, w, h) {
    this.x = x; this.y = y; this.w = w; this.h = h;
  }

  display(scaleFactor) {
    push();
    translate(this.x, this.y);
    scale(scaleFactor * 1.5);
    this.drawEye();
    pop();
  }


// I chose to draw an eye because the artist has a multicultural background. To me,the eye represents observation, identity, and perception across different cultures. It's a symbol of seeing the world through multiple lenses — personal, cultural, and spiritual.
drawEye() {
  let cx = this.w / 2, cy = this.h / 2;
  let left = 0, right = this.w, top = 0, bottom = this.h;
  
//shapes around eyes
  let maxLayers = 7; // wanna 7 layer
  let startR = 80; // outer R
  let layerGap = 10; // 
  
  for (let layer = 0; layer < maxLayers; layer++) {
  let r = startR - layer * layerGap; 
  let count = 40 + layer * 5; 
  
  for (let i = 0; i < count; i++) {
    let angle = TWO_PI * i / count;
    let x = cx + r * cos(angle);
    let y = cy + r * sin(angle);

    if (i % 3 === 0) {
      fill('#e76f51');
      noStroke();
      circle(x, y, 8);
    } else if (i % 3 === 1) {
      fill('#90d4ff');
      noStroke();
      rect(x - 4, y - 4, 8, 8);
    } else {
      fill('#2c75ff');
      noStroke();
      triangle(x, y - 5, x + 5, y + 5, x - 5, y + 5);
    }
  }
}

// outer eye
  fill('#yellow');
  stroke('#111111');     
  strokeWeight(4); 
  beginShape();
  // up line
  vertex(left, cy);
  bezierVertex(cx - this.w * 0.2, top, cx + this.w * 0.2, top, right, cy);
  // got inspiration from website p5.js moon shape: https://p5js.org/reference/p5/bezierVertex/
  // down line
  bezierVertex(cx + this.w * 0.2, bottom, cx - this.w * 0.2, bottom, left, cy);
  endShape(CLOSE);
  
// middle
  let eyeRadius = min(this.w, this.h) / 1.5;//Let the eyeball occupy approximately half of the eye shape's width or height.
  drawMultiColorEyeball(cx, cy, eyeRadius);
  
function drawMultiColorEyeball(cx, cy, maxRadius) {
  let colors = [
  '#90d4ff',  
  '#3e9efc', 
  '#2c75ff', 
  '#6540f5',
  '#4b2ca7', 
  '#2b185a', 
  '#111111' ];

  noStroke();
  for (let i = 0; i < colors.length; i++) {
    let r = maxRadius * (1 - i * 0.15); // reduce 15% each layer
    fill(colors[i]); //colour list i made
    circle(cx, cy, r);
  }
}
  
// crucifix reflects the artist’s respect for all spiritual and cultural beliefs
  stroke('#ffffff');
  strokeWeight(2);
  line(cx - 4, cy, cx + 4, cy);
  line(cx, cy - 4, cx, cy + 9); 
      
 }
}


//Kristien Circle3 with eye
//easy writing way for same circle but different size

class KristienEyeCircle2 extends KristienEyeCircle1{
  display(scaleFactor) {
    push();
      translate(this.x, this.y);
      scale(0.5);
      super.display(scaleFactor);
    pop();
  }
}


//Kristien Circle4 with eye

class KristienEyeCircle3 extends KristienEyeCircle1{
  display(scaleFactor) {
    push();
      translate(this.x, this.y);
      scale(0.2);
      super.display(scaleFactor);
    pop();
  }
}

//Kristien Circle5 with eye

class KristienEyeCircle4 extends KristienEyeCircle1{
  display(scaleFactor) {
    push();
      translate(this.x, this.y);
      scale(0.35);
      super.display(scaleFactor);
    pop();
  }
}

// ===== end Kristien's circle ========


//[Yin] Draw a multi‐layered circle with each layer corresponds to one ring of the cicle, using dots, rectangle, zigzags, squares, beams and stitching like wavy lines inspired by pacita abad's artwork.
class YinCircle {
  constructor(cx, cy, radius) {
    this.cx = cx; 
    this.cy = cy; 
    this.r = radius;
  }

  display(scaleFactor) {
    push();
    translate(this.cx, this.cy);
    scale(scaleFactor);
    this.drawCircleYin1(0, 0, this.r);
    pop();
  }

  drawCircleYin1(cx, cy, radius) {
  //small filled circle at the centre
  noStroke();
  fill('#F764AD');
  //at exactly (cx, cy) the center,diameter=radius*0.3
  circle(cx, cy, radius * 0.3);
  
  //Green dots ring 
  noStroke();
  fill('#8FC79B');
  //28 dots placed on a circle of radicus 0.3*circlr radius from centre
  for (let i = 0; i < 28; i++) {
    let angle = TWO_PI * i/28;
    //where θ increments by that fixed step each iteration
    let x = cx + radius*.3 * cos(angle);
    let y = cy + radius*.3 * sin(angle);
    circle(x, y, radius * 0.05);
  }

  //Teal dots ring
  fill('#048A9D');
  //18 dots evenly spaced on a circle of 0.4*circle radius from centre
  for (let i = 0; i < 18; i++) {
    let angle = TWO_PI * i/18 + 0.1;
    let x = cx + radius*0.4 * cos(angle);
    let y = cy + radius*0.4 * sin(angle);
    circle(x, y, radius * 0.1);
  }

  //Coloured beams
  //Divide the full circle into 30 equal slices.
  let beamCount = 30;
  let beamColors = ['#F4B205','#E12C25','#4FC3F7','#8FC79B','#081487'];
  let innerR = radius * 0.45;
  let outerR = radius * 0.85;
  noStroke();
  for (let i = 0; i < beamCount; i++) {
    let startA = TWO_PI * i / beamCount;
    let endA = TWO_PI * (i + 1) / beamCount;
    fill(beamColors[i % beamColors.length]);
    let x1 = cx + innerR * cos(startA);
    let y1 = cy + innerR * sin(startA);
    let x2 = cx + outerR * cos(startA);
    let y2 = cy + outerR * sin(startA);
    let x3 = cx + outerR * cos(endA);
    let y3 = cy + outerR * sin(endA);
    let x4 = cx + innerR * cos(endA);
    let y4 = cy + innerR * sin(endA);
    //Draw the shape with following:
    quad(x1, y1, x2, y2, x3, y3, x4, y4);
  }

  //Zigzag threads
  stroke('#457B9D');
  strokeWeight(1);
  noFill();
  //24 zigzag “threads" evenly places on a circle radius from centre
  for (let i = 0; i < 24; i++) {
    let baseAngle = TWO_PI * i / 24;
    //Start a custom shape
    beginShape();
    for (let j = 0; j < 6; j++) {
      //Alternating radial offset +5 or –5 pixels to create the zigzag
      let offset = (j%2===0?+5:-5);
      //step forward in small angular increments j*0.06
      let angle = baseAngle + j*0.06;
      let x = cx + (radius+offset)*cos(angle);
      let y = cy + (radius+offset)*sin(angle);
      vertex(x, y);
    }
    endShape();
  }

  //Pink rectangle ring
  noStroke();
  fill('#F495AF');
  //30 small rectangles evenly places on a circle radius from centre 
  for (let i = 0; i < 30; i++) {
    //a tiny phase shift +PI/95 which rotates the entire ring by about 0.033 radians
    let angle = TWO_PI * i/30 + PI/95;
    let x = cx + radius*1.2 * cos(angle);
    let y = cy + radius*1.2 * sin(angle);
    //each rectangle is rotated by a fixed PI/4 so they sit as diamonds
    push();
      translate(x, y);
      rotate(PI/4);
      rectMode(CENTER);
      rect(0, 0, radius*0.08, radius*0.1);
    pop();
  }
  
//Wavy ring between rectangles and outer green dots
  stroke('#F4B205');
  strokeWeight(2);
  noFill();
  //421 points around the circle waveCount+1
  let waveCount = 420;
  //Base radius
  let waveRad = radius * 1.3;
  //how far those sine peaks pull outward/inward
  let amplitude = 1;   
  let numberOfWaves = 60;       
  beginShape();
  for (let i = 0; i <= waveCount; i++) {
    let angle = TWO_PI * i / waveCount;
    //generate a repeating up-and-down pattern around the circle
    let rOff = amplitude * sin(numberOfWaves  * angle);
    let x = cx + (waveRad + rOff) * cos(angle);
    let y = cy + (waveRad + rOff) * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);

// Outer green dots
//similar to the inner rings to echo symmetry
  noStroke();
  fill('#D2D39B');
  for (let i = 0; i < 36; i++) {
    let angle = TWO_PI * i/36;
    let x = cx + radius*1.4 * cos(angle);
    let y = cy + radius*1.4 * sin(angle);
    circle(x, y, radius * 0.06);
  }
 }
}

//Yin circle 2

function drawCircleYin2(cx, cy, radius) {
  noStroke();
  fill('#F764AD');
  //at exactly (cx, cy) the center,diameter=radius*0.3
  circle(cx, cy, radius * 0.3);
  
  //Green dots ring 
  noStroke();
  fill('#8FC79B');
  //28 dots placed on a circle of radicus 0.3*circlr radius from centre
  for (let i = 0; i < 28; i++) {
    let angle = TWO_PI * i/28;
    //where θ increments by that fixed step each iteration
    let x = cx + radius*.3 * cos(angle);
    let y = cy + radius*.3 * sin(angle);
    circle(x, y, radius * 0.05);
  }

  //Teal dots ring
  fill('#048A9D');
  //18 dots evenly spaced on a circle of 0.4*circle radius from centre
  for (let i = 0; i < 18; i++) {
    let angle = TWO_PI * i/18 + 0.1;
    let x = cx + radius*0.4 * cos(angle);
    let y = cy + radius*0.4 * sin(angle);
    circle(x, y, radius * 0.1);
  }

  //Coloured beams
  //Divide the full circle into 30 equal slices.
  let beamCount = 30;
  let beamColors = ['#F4B205','#E12C25','#4FC3F7','#8FC79B','#081487'];
  let innerR = radius * 0.45;
  let outerR = radius * 0.85;
  noStroke();
  for (let i = 0; i < beamCount; i++) {
    let startA = TWO_PI * i / beamCount;
    let endA = TWO_PI * (i + 1) / beamCount;
    fill(beamColors[i % beamColors.length]);
    let x1 = cx + innerR * cos(startA);
    let y1 = cy + innerR * sin(startA);
    let x2 = cx + outerR * cos(startA);
    let y2 = cy + outerR * sin(startA);
    let x3 = cx + outerR * cos(endA);
    let y3 = cy + outerR * sin(endA);
    let x4 = cx + innerR * cos(endA);
    let y4 = cy + innerR * sin(endA);
    //Draw the shape with following:
    quad(x1, y1, x2, y2, x3, y3, x4, y4);
  }

  //Zigzag threads
  stroke('#457B9D');
  strokeWeight(1);
  noFill();
  //24 zigzag “threads" evenly places on a circle radius from centre
  for (let i = 0; i < 24; i++) {
    let baseAngle = TWO_PI * i / 24;
    //Start a custom shape
    beginShape();
    for (let j = 0; j < 6; j++) {
      //Alternating radial offset +5 or –5 pixels to create the zigzag
      let offset = (j%2===0?+5:-5);
      //step forward in small angular increments j*0.06
      let angle = baseAngle + j*0.06;
      let x = cx + (radius+offset)*cos(angle);
      let y = cy + (radius+offset)*sin(angle);
      vertex(x, y);
    }
    endShape();
  }

  //Pink rectangle ring
  noStroke();
  fill('#F495AF');
  //30 small rectangles evenly places on a circle radius from centre 
  for (let i = 0; i < 30; i++) {
    //a tiny phase shift +PI/95 which rotates the entire ring by about 0.033 radians
    let angle = TWO_PI * i/30 + PI/95;
    let x = cx + radius*1.2 * cos(angle);
    let y = cy + radius*1.2 * sin(angle);
    //each rectangle is rotated by a fixed PI/4 so they sit as diamonds
    push();
      translate(x, y);
      rotate(PI/4);
      rectMode(CENTER);
      rect(0, 0, radius*0.08, radius*0.1);
    pop();
  }
  
//Wavy ring between rectangles and outer green dots
  stroke('#F4B205');
  strokeWeight(2);
  noFill();
  //421 points around the circle waveCount+1
  let waveCount = 420;
  //Base radius
  let waveRad = radius * 1.3;
  //how far those sine peaks pull outward/inward
  let amplitude = 1;   
  let numberOfWaves = 60;       
  beginShape();
  for (let i = 0; i <= waveCount; i++) {
    let angle = TWO_PI * i / waveCount;
    //generate a repeating up-and-down pattern around the circle
    let rOff = amplitude * sin(numberOfWaves  * angle);
    let x = cx + (waveRad + rOff) * cos(angle);
    let y = cy + (waveRad + rOff) * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);

// Outer green dots
//similar to the inner rings to echo symmetry
  noStroke();
  fill('#D2D39B');
  for (let i = 0; i < 36; i++) {
    let angle = TWO_PI * i/36;
    let x = cx + radius*1.4 * cos(angle);
    let y = cy + radius*1.4 * sin(angle);
    circle(x, y, radius * 0.06);
  }
 }


// ===== end yin's circle ========


function draw() {
  background(0) //clear screen

  let level = amp1.getLevel(); //get current audoi volume
  let scaleFactor = map(level, 0, 1, 0.8, 1.3);

  for (let s of shapes) {
    s.display(scaleFactor); // // draw every shape with that scale
  }
}

//Play/pause handler
function play_pause() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.loop();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  button1.position(); //re-position the button if needed
}

