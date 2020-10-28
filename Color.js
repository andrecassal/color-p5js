const GOOGLE = 0;
const WEBTRENDS = 1;
const BLUEISH = 2;
 
class Palette {
  constructor() {
    this.colors = this.swatch();
    this.dict = {};
		this.n = 0;
		this.__alpha = 255;
  }
  buildDictionary() {
		if(this.__built) return;
    for (let clr of this.colors) {
      clr.vect = createVector(red(clr), green(clr), blue(clr));
    }
    this.__built = true;
  }
  setAlpha(v) {
    for (let clr of this.colors) {
      clr.setAlpha(v);
    }
		this.__alpha = v;
  }
  getAlpha() {
    return this.__alpha;
  }
  getLength() {
    return this.colors.length;
  }
  map(value, min, max) {
    let m = map(value, min, max, 0, this.length - 1);
    return this.index(floor(m));
  }
  index(index) {
		this.n = index;
    return this.colors[index];
  }
	bg(){
		return this.index(0);
	}
  random() {
		this.n = floor(random( this.colors.length-1 ));
    return this.index(this.n);
  }
	next(){
		this.n = this.n+1 == this.colors.length ? 0 : this.n+1;
		return this.colors[ this.n ];
	}
  nearest(clr) {
		this.buildDictionary();
    if (this.dict.hasOwnProperty(clr.toString())) {
      return this.dict[clr.toString()];
    }
    let c1 = createVector(red(clr), green(clr), blue(clr))
    let d = 0;
    let dist = c1.dist(this.colors[d].vect);
    for (let i = 1; i < this.colors.length; i++) {
      if (c1.dist(this.colors[i].vect) < dist) {
        d = i;
      }
    }
    this.dict[clr.toString()] = this.colors[d];
    return this.colors[d];
  }
  swatch(swatch = 0) {
    let clr = [
      [
        // color(0),
        color(118, 12, 232), //magenta
        color(239, 0, 52), //red
        color(2, 151, 106), //green
        color(246, 194, 3), //yellow
        color(255, 148, 165), //pink
        color(222, 222, 222), //gray
        // color(255)
      ],
      [
        color(250, 29, 45), //red
        color(149, 82, 20), //orange
        color(252, 198, 2), //yellow
        color(64, 205, 250), //light blue
        color(50, 127, 184), //dark blue
        color(60, 37, 121), //navy
        color(93, 80, 189), //magenta
        // color(255)
      ],
      [
        color(255, 193, 178), //pink
        color(30, 30, 84), //dark blue
        color(82, 100, 246), //light blue
        color(64, 205, 250), //blue
        color(252, 104, 94), //red
        color(162, 184, 244), //very light blue
        // color(255)
      ]
    ];
    this.colors = clr[swatch];
    return this.colors;
  }
}




function linearGradient(clr=[], x1,y1,x2,y2){
	let ctx = drawingContext; // global canvas context p5.js var

	x1 = x1 || 0;
	y1 = y1 || 0;
	x2 = x2 || 0;
	y2 = y2 || height;	

	let grd = ctx.createLinearGradient(x1, y1, x2, y2);
	if(grd && clr && clr.length>1){
		for(let i=0;i<clr.length;i++){
			let s = map(i,0,clr.length-1,0,1,true)
			grd.addColorStop(s, clr[i].toString());
		}
		ctx.fillStyle = grd;			
	}
}

function radialGradient(clr=[], x1, y1, r1, x2, y2, r2){
		let ctx = drawingContext; // global canvas context p5.js var
		let c2 = sqrt(width*height);
		let c1 = c2/2;
		x1 = x1 || c1;
		y1 = y1 || c1;
		r1 = r1 || 0;
		x2 = x2 || c2;
		y2 = y2 || c2;	
		r2 = r2 || c2;

	
		// let cx = x1 + (x2 - x1) / 2;
		// let cy = y1 + (y2 - y1) / 2;
		let grd = ctx.createRadialGradient(x1, y1, r1, x2, y2, sqrt(width*height));
		if(grd && clr && clr.length>1){
			for(let i=0;i<clr.length;i++){
				let s = map(i,0,clr.length-1,0,1,true)
				grd.addColorStop(s, clr[i].toString());
			}
			ctx.fillStyle = grd;
		}
		
		return [x1,y1,x2,y2]
	
	}












