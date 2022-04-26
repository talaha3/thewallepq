
function Rect(x, y, w, h, mode, t_l, t_r, b_r, b_l){
    var options = {
        isStatic: true,
        restitution: 1,        
        frictionStatic: 0.01,
        
    }

    
    
    
    this.body = Bodies.rectangle(x+100, y, w, h, options);
    World.add(world, this.body);

      //to delete from world - only for ball stopper
      this.removeFromWorld = function(){
        World.remove(world, this.body);
    }

    this.show = function(){

        var pos = this.body.position;
        fill(0);//dark-blue
        rectMode(mode);
        push();
        rect(pos.x, pos.y, w, h, t_l, t_r, b_r, b_l)
        pop()
    }


}