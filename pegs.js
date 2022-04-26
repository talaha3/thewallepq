function Peg(x, y, r, color) {
var options = {
    isStatic: true,
    restitution: 1,
    friction: 0,
    frictionStatic: 0

}
this.body = Bodies.circle(x +100, y, r/2, options);
World.add(world, this.body);

this.show = function(){
    var pos = this.body.position;

    push();
    
    if (color)
    fill('#0C06F5');//dark-blue
    else
    fill(255);//white

    circle(pos.x, pos.y,r);
    pop();
}
}