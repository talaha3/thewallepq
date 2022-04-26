class Flake {
  
  constructor(){
    // initialize coordinates
    this.posX = 0;
    this.posY = random(-50, 0);
    this.initialangle = random(0, 2 * PI);
    this.size = random(2, 10);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = sqrt(random(pow(width / 2, 2)));
    this.color = color(random(255), random(255), random(255));
  }

  update(time) {
    // x position follows a circle
    let wi = 0.6; // angular speed
    let angle = wi * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = flakes.indexOf(this);
      flakes.splice(index, 1);
    }
  };

  display() {
    fill(this.color);
    ellipse(this.posX, this.posY, this.size);
  };
}
