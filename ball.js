function Ball(x, y, r, bcolor){
    options = {  
        restitution: 0.5,
        friction: 0,
        frictionStatic: 0.01,
        density: 0.4
    }

    this.body = Bodies.circle(x, y, r/2, options);
World.add(world, this.body);

 // delete balls
 this.removeFromWorld = function(){
    World.remove(world, this.body);
}

this.show = function(bc){

var pos = this.body.position;

if(bc==0){
fill(bcolor)
}
else if(bc==1){
    fill('#20ff00')
}
else if(bc == 2){
    fill('#ff0600')
}

noStroke()
    push();
    circle(pos.x, pos.y, r);
    pop();
}
}

