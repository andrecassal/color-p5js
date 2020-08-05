
const GOOGLE = 0;
const WEBTRENDS = 1;
const BLUEISH = 2;

class Palette {
  constructor() {
    this.__built=false;
    this.colors = this.palette();
    this.dict = {};
  }
  build() {
    for (let clr of this.colors) {
      clr.vect = createVector(red(clr), green(clr), blue(clr));
    }
    this.__built=true;
  }
  set alpha(v) {
    for (let clr of this.colors) {
      clr.setAlpha(v);
    }
  }
  get alpha() {
    return this.alpha;
  }
  random() {
    return random(this.colors);
  }
  index(index) {
    return this.colors[index];
  }
  nearest(clr) {
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
  palette(swatch){
    swatch = swatch || 0;
    let clr = [[
      color(0),
      color(118, 12, 232), //magenta
      color(239, 0, 52), //red
      color(2, 151, 106), //green
      color(246, 194, 3), //yellow
      color(255, 148, 165), //pink
      // color(222, 222, 222), //gray
      color(255)
    ],
    [
      color(250, 29, 45), //red
      color(149, 82, 20), //orange
      color(252, 198, 2), //yellow
      color(64, 205, 250), //light blue
      color(50, 127, 184), //dark blue
      color(60, 37, 121), //navy
      color(93, 80, 189), //magenta
      color(255)
    ]
    ];
    this.colors = clr[swatch];
    this.build();
    return this.colors;
  }
}




