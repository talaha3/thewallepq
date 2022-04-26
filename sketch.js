// module aliases
var Engine = Matter.Engine, 
    Runner = Matter.Runner, 
    World = Matter.Composite,
    Bodies = Matter.Bodies;

// engine creation
var engine;
var world;

// canvas dimensions
var w = 480.2;//canvas width to fit page  
var h = 617.4;//canvas height to fit page

// matter.js arrays for game
var pegs = []; 
var droppers =[];
var bucket = [];
var blocker = []; //top-blockers
var balls =[];
var prevent = []; //side preventers
var buttons = []; //left buttons
var option = []; //option buttons
let flakes = []; //confetti

var barbottom; //bottom border
var barleft; //left border
var barright; //right border


//HTML ELEMENTS
var db; //drop button
var nb; //next button
var pb; //play button
var cb; //credits button
var sb; //submit button
var tb; //toggle button
var pab; //play again button
var inp1; //player 1 name
var inp2; //player 2 name


//VARIABLES
var drop = false; //to check if dropbutton is pressed
var ballpos; //to decide which bucket to drop from i.e. 1 to 7
var score = 0; //to calculate instant score
var score1 = 0; //player 1 score
var score2 = 0; //player 2 score
var sumpos; //to calculate sum of y position of balls
var dropped = false; //to check if balls have reached the end i.e. sumpos>= 4100
var calcscore = false; //to start timeoutfucntion for score calculate
var bx; //ballposition x
var scorestart = true; //start calculating score 
var displayscore = false; //check whether to display score or not
var tr = 0; //score display animation
var sr = 0;
var next = 1;//checking how many times it is pressed
var ballcolor = '#20ff00'; //green
var phaseno = 0; //which slide
var roundno = 1; //which round
var name1;
var name2;
var empty = false; //checking if input is typed or not
var limit = 0; //limit of balls for that round
var winner;



//QUESTIONS
var butpres = false; //to see if option selected
var cor = false; //to see if3 seconds are over to reveal whether correct or not
var optpres; //to store selected option from player
var queno; //store randomly generated question number
var opt1, opt2, opt3, opt4, que, ans; //store values from question database
var revque = false; //to see if 'reveal question' button pressed
var showquestion = false; //to toggle question and options showing and hiding
var noqs; //number of questions in question bank



//FINAL SLIDE
var displayi = false
var displayt = false
var displayw = false



//COLOURS
var c1;
var c2; 
var newc;
var n;



// PRELOAD
let logo;
let dd1, dd2, dd3, dd4, dd5;//danny dyer
let wo1, wo2, wo3, wo4, wo5;//speech bubbles
let welc, superdrop //11:39 series 4 versus celebrities;
let questions;


//images display
var welcome = false


// other values
var sp = w/15;// space between each peg
var moneyvalues = ['1', '500', '100', '1K', '10', '2.5K', '1', '5K', '1', '10K', '10', '15K', '100', '25K', '1']
var moneyvalue = [1, 500, 100, 1000, 10, 2500, 1, 5000, 1, 10000, 10, 15000, 100, 25000, 1]





function preload(){
    //images
logo = loadImage('images/logo.png')
dd1 = loadImage('images/dd1.png')
dd2 = loadImage('images/dd2.png')
dd3 = loadImage('images/dd3.png')
dd4 = loadImage('images/dd4.png')
dd5 = loadImage('images/dd5.png')
wo1 = loadImage('images/wo1.png')
wo2 = loadImage('images/wo2.png')
wo3 = loadImage('images/wo3.png')
wo4 = loadImage('images/wo4.png')
wo5 = loadImage('images/wo5.png')

    //sounds
welc = loadSound('sounds/welc.mp3')
    //question bank
questions = loadJSON('quest.json')
}




function setup(){
    var cnv = createCanvas (w+400, h);
    cnv.parent('holder')
    engine = Engine.create();
    world = engine.world
    Runner.run(engine);
    world.gravity = 0.1;

    c1 = color('#0897f7');
    c2 = color('#1f04fb'); 




function drawboard(){
    // #drawing pegs. inner loop is vertical pegs, outer is horizontal
    for (let i = 0; i<=15; i++){
        fill(255);
        for (let j = 1; j<=13; j++){
        if(j%2 == 1)
        pegs.push(new Peg (i*sp-sp/2, 3*sp + j*sp, 10)); //circle(i*sp-sp/2, 3*sp + j*sp, 10)//space(x coordinate) between peg increases by a 15th of the window for equality, height increases by same for uniformity. half sp subtracted to alternate pegs and place odd rows exactly half way between two pegs
        else if(j<13)
        pegs.push(new Peg (i*sp, 3*sp + j*sp, 10)); //circle(i*sp, 3*sp + j*sp, 10)//space(x coordinate) between peg increases by a 15th of the window for equality, height increases by same for uniformity.
        else
        pegs.push(new Peg(i*sp, 3*sp + j*sp, 8, true))//if j=14, egs become blue, and acts as a smooth suface forr ball to slide on
        }
    }
    
     // #drawing top droppers
     for (let i = 1; i<=8; i++){
        droppers.push(new Rect(3*sp +  i*sp, 3*sp/2, 10, 3*sp, CENTER,0, 0, 5 , 5))// 3sp to start from the 4th peg in the second row, y coordinate is half way from 0 to first row which is places at 3*sp
    }

    // #drawing bottom buckets
    for (let i = 0; i<=15; i++){
        bucket.push(new Rect(i*sp, h-sp, 4,3*sp, CENTER,5, 5,0,0))//height is one space from bottom - not much importance as bar overflows anyways
    }

    // #drawing bottom, left, right bar
     barbottom = new Rect(w/2,h+20, w, 50, CENTER,0,0,0,0);
    barleft = new Rect(0,h/2, 8, h, CENTER,5,100,0,0);
    barright = new Rect(w,h/2, 8, h, CENTER,100, 5,0,0)



    // #drawing blocker
    for (let i =0; i<=6; i++){
        blocker.push(new Rect (4.5*sp  + i*sp, 3*sp, 0.5*sp, 0.25*sp, CENTER, 5,5,5,5))
    }
    

    // #drawing ball-getting-stuck preventers
    for (let i =0; i<12; i++){
        if(i<6)
        prevent.push(new Peg(sp/4, 5.5*sp+i*2*sp, 5))
        else
        prevent.push(new Peg(w-sp/4, 5.5*sp+(i-6)*2*sp, 5))

    }

}


function drawbuttons(){    

    
    function leftbuttons(){
        //drawing left buttons
for (i = 0; i<7; i++){
    buttons[i] = createButton(i+1); 
    buttons[i].parent('holder')   
    buttons[i].position(0, i*h/7)    
    buttons[i].style('font-size: 40px')
    buttons[i].style('color: white')
    buttons[i].style('background-color: black')
    buttons[i].style('border: 4px solid #00ff2e');    
    buttons[i].style('width: 96px')  
    buttons[i].style('height: 88px')
    buttons[i].style('display: none') 
    buttons[i].pressed = 0    
     }

     //checking pressed     
     for (let i = 0; i<7; i++){
        buttons[i].mousePressed(function(){
            //if (buttons[i].pressed == 0){           
            //buttons[i].pressed = 1  
            if(balls.length<limit){
            buttons[i].style('background-color: #4CAF50');
            drop = true;
            ballpos = i+1;
            }
            //}
            
        })}
    }


    function dropbuttons(){
        //drawing drop button  
        db = createButton('Drop'); 
        db.parent('holder')   
        db.position(w+107, 3*h/7)    
        db.style('font-size: 20px')
        db.style('color: white')
        db.style('background-color: black')
        db.style('border: 4px solid #00ff2e');    
        db.style('width: 92px')  
        db.style('height: 88px') 
        db.style('display: none')
        db.pressed = 0    
     

        //checking pressed
        db.mousePressed(function(){  

            tb.style('display: block')

            if(next<3 || next > 4) {
            if(balls.length >=  limit)  { 
            db.style('background-color: #4CAF50');
            for (i = 0; i < balls.length; i++) {
                balls[i].body.position.x = balls[i].body.position.x + Math.random();
                      }
                for (i = 0; i < blocker.length; i++) {
                  blocker[i].removeFromWorld();
                  blocker.splice(i, 1);
                  i--;          
                }
            }
        }
            else{
                if(cor)  { 
                    db.style('background-color: #4CAF50');
                    for (i = 0; i < balls.length; i++) {
                        balls[i].body.position.x = balls[i].body.position.x + Math.random();
                              }
                        for (i = 0; i < blocker.length; i++) {
                          blocker[i].removeFromWorld();
                          blocker.splice(i, 1);
                          i--;          
                        }
                    }
                }
            
        })
    }


    function nextbutton(){
     //drawing next button
     nb = createButton('Next'); 
     nb.parent('holder')   
     nb.position(w+107, 3*h/7)    
     nb.style('font-size: 20px')
     nb.style('color: white')
     nb.style('background-color: black')
     nb.style('border: 4px solid #00ff2e');    
     nb.style('width: 92px')  
     nb.style('height: 60px') 
     nb.style('display: none')
        

     //checking pressed
     nb.mousePressed(function(){
        
        
        tb.style('display: none')


        //green superdrop
        if(next==1){
            score1= score1+score
        }
        else if(next==2){
            score2=score2+score;
            roundno = 2

            


            rb.style('display: block') 
            showquestion = true;  
            limit = 1;    
            
           
            moneyvalues = ['1', '2.5K', '100', '5K', '10', '10K', '1', '15K', '1', '20K', '10', '25K', '100', '50K', '1']
            moneyvalue = [1, 2500, 100, 5000, 10, 10000, 1, 15000, 1, 20000, 10, 25000, 100, 50000, 1]
        }
        //question 1
        else if(next == 3){
            for(i=0;i<7;i++){
                buttons[i].style('background-color: black')
            }

            if(optpres==ans){
            score1= score1+score
            }
            else{
                score1= score1-score
            }
            if(score1<0){
                score1=0
            }

            


            showquestion = true;
            revque = false;
            butpres = false;
            cor = false;
            rb.style('display: block')
            
            for(i=0;i<option.length;i++){
                option[i].style('background-color: black')
            }
        }
        else if(next==4){
            for(i=0;i<7;i++){
                buttons[i].style('background-color: black')
            }

            if(optpres==ans){
            score2= score2+score
            }
            else{
                score2= score2-score
            }
            if(score2<0){
                score2=0
            }


            

            showquestion = true;
            revque = false;
            butpres = false;
            cor = false;
            rb.style('display: block')
            
            for(i=0;i<option.length;i++){
                option[i].style('background-color: black')
            }

            limit = 2

            
        }
        //question 2
        else if(next==5){
            for(i=0;i<7;i++){
                buttons[i].style('background-color: black')
            }

            if(optpres==ans){
            score1= score1+score
            }
            else{
                score1= score1-score
            }
            if(score1<0){
                score1=0
            }


            


            showquestion = true;
            revque = false;
            butpres = false;
            cor = false;
            rb.style('display: block')
            
            for(i=0;i<option.length;i++){
                option[i].style('background-color: black')
            }
        }
        else if(next==6){
            for(i=0;i<7;i++){
                buttons[i].style('background-color: black')
            }

            if(optpres==ans){
            score2= score2+score
            }
            else{
                score2= score2-score
            }
            if(score2<0){
                score2=0
            }




            showquestion = true;
            revque = false;
            butpres = false;
            cor = false;
            rb.style('display: block')
            
            for(i=0;i<option.length;i++){
                option[i].style('background-color: black')
            }

            limit = 3
        }
        //question 3
        else if(next==7){
            for(i=0;i<7;i++){
                buttons[i].style('background-color: black')
            }

            if(optpres==ans){
            score1= score1+score
            }
            else{
                score1= score1-score
            }
            if(score1<0){
                score1=0
            }

           


            showquestion = true;
            revque = false;
            butpres = false;
            cor = false;
            rb.style('display: block')
            
            for(i=0;i<option.length;i++){
                option[i].style('background-color: black')
            }
        }
        else if(next==8){
            for(i=0;i<7;i++){
                buttons[i].style('background-color: black')
            }

            if(optpres==ans){
            score2= score2+score
            }
            else{
                score2= score2-score
            }
            if(score2<0){
                score2=0
            }

            showquestion = false;        
            moneyvalues = ['1', '500', '100', '1K', '10', '2.5K', '1', '5K', '1', '10K', '10', '15K', '100', '25K', '1']
            moneyvalue = [1, 500, 100, 1000, 10, 2500, 1, 5000, 1, 10000, 10, 15000, 100, 25000, 1]
        }
        //red superdrop
        else if(next==9){
            score1= score1-score

            if(score1<0){
                score1=0
            }
        }
        else if(next==10){
            score2=score2-score;
            if(score2<0){
                score2=0
            }
            phaseno = 3;
        }


dropped = false; 
calcscore = false; 
next = next+1;
drop = false;
score = 0;
tr = 0;
displayscore = false;

if(next>=2 && next<=8){
    if(next!=2){
        questions[queno]='';
        delete questions[''];
    }
    noqs =  Object.keys(questions).length
    queno = Math.floor(Math.random()*noqs)
    que = questions[queno].question
    opt1 = questions[queno].A
    opt2 = questions[queno].B
    opt3 = questions[queno].C
    opt4 = questions[queno].D
    ans = questions[queno].answer.charCodeAt(0) - 65;
}


        for(i=0;i<balls.length;i++){
            balls[i].removeFromWorld()
            balls.splice(i, 1);
              i--;  
        }

        for (let i =0; i<=6; i++){
            blocker.push(new Rect (4.5*sp  + i*sp, 3*sp, 0.5*sp, 0.25*sp, CENTER, 5,5,5,5))
        }

        if(next<=2){
        for (i=1; i<=7;i++){
            balls.push(new Ball(210 +  i*sp + Math.random(), 0, 19.5, ballcolor))
            }
        }
        else if(next >8)
        {   
            ballcolor = '#ff0600'
            for (i=1; i<=7;i++){
                balls.push(new Ball(210 +  i*sp + Math.random(), 0, 19.5, ballcolor))
                }
        }
        else{
            for(i = 0; i<buttons.length;i++){
                buttons[i].style('display: block')
            }
        }
        nb.style('display: none')
        db.style('background-color: black')
        if(next<=2 || next >8)
        db.style('display: block')
        
        



    })



    }


    function playbutton(){
     //drawing play button
     pb = createButton('Start'); 
     pb.parent('holder')   
     pb.position(width/2 -200, height/2+60)    
     pb.style('font-size: 20px')     
     pb.style('color: white')
     pb.style('background-color: black')
     pb.style('border: 4px solid #00ff2e');    
     pb.style('width: 400px')  
     pb.style('height: 60px') 
     pb.style('border-radius: 12px')
     pb.mouseOver(function(){
        pb.style('background-color: white')
        pb.style('color: black')
        pb.style('box-shadow: 5px 5px grey')
     })
     pb.mouseOut(function(){
        pb.style('color: white')
        pb.style('background-color: black')
        pb.style('box-shadow: none')
     })
     //pb.style('display: none')


     //checking pressed
     pb.mousePressed(function(){


        //welc.setVolume(0.5)
        welc.play();          
        setTimeout(function(){
          //welc.stop();
        phaseno = phaseno + 1;
        pb.style('display: none')
        cb.style('display: none')
        inp1.style('display : block')
        inp2.style('display : block')
        sb.style('display: block')
        },4000)
        
       
        
    })

    }


    function creditsbutton(){
    //drawing credits button
    cb = createButton('Credits'); 
    cb.parent('holder')   
    cb.position(width/2 -200, height/2+135)    
    cb.style('font-size: 20px')
    cb.style('color: white')
    cb.style('background-color: black')
    cb.style('border: 4px solid #00ff2e');    
    cb.style('width: 400px')  
    cb.style('height: 60px') 
    cb.style('border-radius: 12px')
    cb.mouseOver(function(){
    cb.style('background-color: white')
    cb.style('color: black')
    cb.style('box-shadow: 5px 5px grey')
    })
    cb.mouseOut(function(){
    cb.style('color: white')
    cb.style('background-color: black')
    cb.style('box-shadow: none')
    })


    //checking pressed

    }


    function inputnames(){
    //taking player names
    inp1 = createInput('');
    inp1.position(w/2+100 , h/2-100);
    inp1.style('width : 400px')
    inp1.style('height : 60px')
    inp1.style('display : none')
    inp1.style('border: 1px solid black')
    inp1.style('border-radius: 4px')
    inp1.attribute('placeholder', 'Enter Name');     

    inp2 = createInput('');
    inp2.position(w/2+100 , h/2+50);
    inp2.style('width : 400px')
    inp2.style('height : 60px')
    inp2.style('display : none')
    inp2.style('border: 1px solid black')
    inp2.style('border-radius: 4px')
    inp2.attribute('placeholder', 'Enter Name');
    }
     
     
    function submitbutton(){
        //drawing submit button     
     sb = createButton('Continue'); 
     sb.parent('holder')   
     sb.position(width/2 -200, height-135)    
     sb.style('font-size: 20px')
     sb.style('color: white')
     sb.style('background-color: black')
     sb.style('border: 4px solid #00ff2e');    
     sb.style('width: 400px')  
     sb.style('height: 60px') 
     sb.style('border-radius: 12px')
     sb.style('display: none')     
     sb.mouseOver(function(){
         if(empty){
        sb.style('background-color: white')
        sb.style('color: black')
        sb.style('box-shadow: 5px 5px grey')
         }
     })    
     sb.mouseOut(function(){
        sb.style('color: white')
        sb.style('background-color: black')
        sb.style('box-shadow: none')
     })
    

     //checking pressed
     sb.mousePressed(function(){ 
        if(empty)    {   
name1 = inp1.value();
name2 = inp2.value();
phaseno = phaseno +1;
            db.style('display: block')
            inp1.style('display : none')
            inp2.style('display : none')
            sb.style('display : none')
            for (i=1; i<=7;i++){
                balls.push(new Ball(210 +  i*sp + Math.random(), 0, 19.5, ballcolor))
                }
            
    }

})
    }


    function revealbutton(){
        //drawing reveal question button     
     rb = createButton('Reveal Question'); 
     rb.parent('holder')   
     rb.position(width/2 -300, height-135)    
     rb.style('font-size: 20px')
     rb.style('color: white')
     rb.style('background-color: black')
     rb.style('border: 4px solid #00ff2e');    
     rb.style('width: 400px')  
     rb.style('height: 60px') 
     rb.style('border-radius: 12px')
     rb.style('display: none')

     //checking pressed
     rb.mousePressed(function(){
        if(balls.length ==  limit){
        revque = true;
        rb.style('display: none')
        for(i=0; i<4; i++){
            option[i].style('display: block')
        }

        for(i=0; i<7; i++){
            buttons[i].style('display: none')
        }
       

    }
    })
    
    }
        
     
    function optionbutton(){

        for(i = 0; i<4; i++){
            option[i] = createButton(String.fromCharCode(65+i)); 
            option[i].parent('holder')   
            option[i].position(140+105*i, 490)    
            option[i].style('font-size: 40px')
            option[i].style('color: white')
            option[i].style('background-color: black')
            option[i].style('border: 4px solid #00ff2e');    
            option[i].style('width: 96px')  
            option[i].style('height: 88px')
            option[i].style('cursor: pointer')
            option[i].style('display: none') 
         }

         for (let i=0; i<4; i++){
         
            option[i].mousePressed(function(){   
                if(!butpres)  {       
                option[i].style('background-color: #f7ab08'); 
                option[0].style('cursor: default')  
                option[1].style('cursor: default')  
                option[2].style('cursor: default')  
                option[3].style('cursor: default')  
                butpres = true;
                optpres = i;    
                }
            })


            }


    } 
     

    function togglebutton(){
        //drawing credits button
        tb = createButton(''); 
        tb.parent('holder')   
        tb.position(0, height-30)    
        tb.style('font-size: 20px')
        tb.style('color: white')
        tb.style('background-color: #1f04fb')
        tb.style('border: 0px');    
        tb.style('width: 60px')  
        tb.style('height: 30px') 
        tb.style('border-radius: 12px')        
        tb.style('display: none')
        //checking pressed
        tb.mousePressed(function(){
            for(i=0;i<balls.length;i++){
                balls[i].body.position.x =  balls[i].body.position.x -1
            }
        })

        }
    

    function playagainbutton(){
            //drawing credits button
            pab = createButton('Play Again'); 
            pab.parent('holder')   
            pab.position(width/2-87.5, height-50)    
            pab.style('font-size: 20px')
            pab.style('color: white')
            pab.style('background-color: black')
            pab.style('border: 4px solid #00ff2e');    
            pab.style('width: 150px')  
            pab.style('height: 40px') 
            pab.style('border-radius: 12px')        
            pab.style('display: none')
            //checking pressed
            pab.mousePressed(function(){
                location.reload()
            })
    
        }
        
    
        
    

leftbuttons();
dropbuttons();
nextbutton();
playbutton();
creditsbutton();
inputnames();
submitbutton();
revealbutton();
optionbutton();  
togglebutton();
playagainbutton();
}
    
function coverimage(){
    for(y=0; y<height; y++){
        n = map(y,0,height,0,1);
        newc = lerpColor(c1,c2,n);
        stroke(newc);
        line(width,y,w+200, y);
      }
}



drawboard();
drawbuttons();

}



function draw(){

    

    




    if(phaseno == 0){
        //background ('#1E62F5');//light-blue   
        //image(mute, 10, height-50, 40, 40)
        //image(unmute, 10, height-50, 40, 40)

        //gradient background
    for(y=0; y<height; y++){
        n = map(y,0,height,0,1);
        newc = lerpColor(c1,c2,n);
        stroke(newc);
        line(0,y,width, y);
      }

         

      
      image(dd5, -75, h-400, 300, 400);
     
      

      
          image(wo5, -40, -20, 325, 300);
          textSize(40)
          textAlign(CENTER)
          text('Welcome to...', 130, 110)//sound clip
          textAlign(LEFT)


          
       
      image(logo, width/2-215, 5, 430, 335) 
      /*image(dd3, w+200, h-400, 300, 400);
      image(wo3, w+100, -20, 325, 300);
      textSize(30)
      textAlign(CENTER)
      text('Welcome to The Wall', w+150, 20)
*/




    }    
        
    
    if(phaseno == 1){
        
      
    //gradient background   
    for(let y=0; y<height; y++){
      n = map(y,0,height,0,1);
      newc = lerpColor(c1,c2,n);
      stroke(newc);
      line(0,y,width, y);
    }
    
    
    image(logo, width/2-107, 5, 215, 167)
    
    noStroke()
    fill(255)
    textSize(50)
    
     
    
    
    textStyle(BOLD)
    text('VS.', w/2+255, h/2+20)
    textStyle(NORMAL)
    text('Player 1', 110, h/2-60)
    text('Player 2', 110, h/2 + 95)
    
    
    
    if(inp1.value()=='' || inp2.value()== ''){
        sb.style('cursor: not-allowed')    
    }
    else{
        sb.style('cursor: pointer')
        empty = true;
    }
    
    }
    
    
    if(phaseno == 2){    
        

    //gradient background
    for(let y=0; y<height; y++){
      n = map(y,0,height,0,1);
      newc = lerpColor(c1,c2,n);
      stroke(newc);
      line(0,y,width, y);
    }
    
    

        if(next<2){
            ballcolor = '#20ff00'
        }
        else if(next>=2&&next<=8){
            ballcolor = '#ffffff'
        }
        else if(next>8){
        
            
        for(i=0;i<balls.length;i++){
            balls[i].show(0);
        }
        
        }
    
       
    
    
        noStroke();
        angleMode(DEGREES);
    
        // #showing each peg
        for (let i = 0; i<pegs.length; i++){
            if(pegs[i].body.position.x>95&&pegs[i].body.position.x<105+w )//to hide pegs out of bounds
            pegs[i].show();
        }
    
    
        // #showing each top dropper
        for (let i = 0; i<droppers.length; i++)
        {
            droppers[i].show();
        }
       
        
        // #showing each bottom bucket
        for (let i = 0; i<bucket.length; i++)
        {
            bucket[i].show();
        }
            
    
        // #showing bottom bar
        barbottom.show()//-5 to make the bottom bar visible
        barleft.show()//-5 to make the bottom bar visible
        barright.show()//-5 to make the bottom bar visible
    
    
        
        // #showing blocker
        for (let i = 0; i<blocker.length; i++){
            blocker[i].show();
        }
        
        
        // #showing balls
        for (let i = 0; i<balls.length; i++){
            balls[i].show(0);
        }



        // #showing ball-getting-stuck preventers
        for (let i = 0; i<prevent.length; i++){
            prevent[i].show();
        }
        
    
        // #hide protruding pegs        
        fill('#e0a400');//gold
        rect(96, h/2, 4,h);
        rect(w+105, h/2, 4,h)
    
    
    
    
        if(balls.length < limit){
        if (drop){
            balls.push(new Ball(210 +  ballpos*sp + Math.random(), 0, 19.5, ballcolor))
                drop = false;                 
        }
    }
    
    
    fill(255)
    noStroke()
    // #writing values for dropper
    for (let i =1; i<=7;i++){
        text(i, 100 + 3.35*sp  + i*sp, 3*sp/4)
    }
    
    
  
  

    //checking if balls have reached the end
    if(dropped == false){
        for(let i= 0; i<balls.length; i++){
            
        sumpos = sumpos + balls[i].body.position.y   
        
        if(sumpos >= 585*balls.length){
            console.log('hello')
            db.style('display: none')    
            dropped = true;
            sumpos = 0;
            calcscore = true;
            scorestart = true;
        }
        if(i==balls.length - 1){
            sumpos = 0;
        }
        }
        }
    
    //calculating the score after drop   
    if (calcscore == true){
            setTimeout(function(){
                if(scorestart == true){
        for (let i = 0;i<balls.length; i++){
    
            bx = balls[i].body.position.x
          
            if(bx >= 105 && bx<=129){
                score = score + moneyvalue[0]
            }
            else if (bx >= 134 && bx<=160){
                score = score + moneyvalue[1]
            }
            else if (bx >= 165 && bx<=194){
                score = score + moneyvalue[2]
            }
            else if (bx >= 198 && bx<=225){
                score = score + moneyvalue[3]
            }
            else if (bx >= 230 && bx<=256){
                score = score + moneyvalue[4]
            }
            else if (bx >= 261 && bx<=289){
                score = score + moneyvalue[5]
            }
            else if (bx >= 294 && bx<=321){
                score = score + moneyvalue[6]
            }
            else if (bx >= 326 && bx<=353){
                score = score + moneyvalue[7]
            }
            else if (bx >= 358 && bx<=385){
                score = score + moneyvalue[8]
            }
            else if (bx >= 390 && bx<=417){
                score = score + moneyvalue[9]
            }
            else if (bx >= 422 && bx<=450){
                score = score + moneyvalue[10]
            }
            else if (bx >= 455 && bx<=482){
                score = score + moneyvalue[11]
            }
            else if (bx >= 486 && bx<=513){
                score = score + moneyvalue[12]
            }
            else if (bx >= 518 && bx<=545){
                score = score + moneyvalue[13]
            }
            else if (bx >= 550 && bx<=575){
                score = score + moneyvalue[14]
            }
    
            if(i==balls.length-1){
                console.log(score)
                displayscore = true;
                scorestart = false;            
            }
        }
        }
        }, 3000)
            
        }
            
    //displaying the score after calculating score    
    if(displayscore == true){
        rectMode(CENTER)
        if(next<=2){
        fill('#0bb313')
        }
        else if(next>8){
            fill('#ad0101')
        }
        else if(optpres == ans){
    fill('#0bb313')
        }
        else{
            fill('#ad0101')  
        }
    
        strokeWeight(4)
        stroke(255)
        
        
        if(tr<=100){
            tr = tr+5
            rect(width/2-100,height/2, tr*2, tr,20)            
        }
        else{
            rect(width/2-100,height/2, 200, 100, 20)
            noStroke()
            fill(255)
            textSize(50);
            textStyle(BOLD);
            textAlign(CENTER)
            text('\u00A3'+ score,width/2-95,height/2+20)
            textAlign(LEFT)
            nb.style('display: block')
            if(next==1){
                textSize(25);
        textStyle(NORMAL);    
            }      
            else if(next==2){
                textSize(25);
        textStyle(NORMAL);    
            }             
        }
       
    
        }
        

    //Round 2    
        if(roundno == 2){
            
            
    
            if(showquestion){
            rectMode(CENTER)
            textStyle(NORMAL)
            
            textWrap(WORD)
            if(sr<=100){
                fill(0)
                sr = sr+5
                rect(width/2-100,height/2 -100, sr*4+5, sr/2,20)
                rect(width/2-210,height/2, sr*2, sr,20)
                rect(width/2+10,height/2, sr*2, sr,20)
                rect(width/2-210,height/2+110, sr*2, sr,20)
                rect(width/2+10,height/2+110, sr*2, sr,20)         
            }
            else{
                fill(0)
                rect(width/2-100,height/2 - 100, sr*4+5, sr/2,20)    
                rect(width/2-210,height/2, sr*2, sr,20)
                rect(width/2+10,height/2, sr*2, sr,20)  
                rect(width/2-210,height/2 + 110, sr*2, sr,20)          
                rect(width/2+10,height/2 + 110, sr*2, sr,20)
                noStroke() 
                fill(255)
                textSize(30)
                if((next-2)%2==0){
                text('Player 2 : Question '+ ((next-2)/2), width/2-25, h/2-110, sr*4+5) 
                }
                else{
                    text('Player 1 : Question '+ ((next-1)/2), width/2-25, h/2-110, sr*4+5) 

                }
                textSize(20)
                text('A. ' +opt1, width/2-205, h/2, sr*2)
                text('B. '+opt2, width/2+15, h/2, sr*2)       
                text('C. ' +opt3, width/2-205, h/2+110, sr*2)
                text('D. ' +opt4, width/2+15, h/2+110, sr*2)
            }
            
            
            
            if(revque){
                fill(0)
                rect(width/2-100,height/2 - 125, sr*4+5, 100,20)
                noStroke() 
                fill(255)
                textSize(20)
                text(que, w/2+110, h/2-150, sr*4+5) 
            }
            
            
            if(butpres){
            
            setTimeout(function(){
            cor = true
            }, 3000)
            }
            
            if(cor){
                if(optpres==ans){
                    fill('#4CAF50')
                    rect(width/2-100,height/2 - 125, sr*4+5, 100,20)
                    rect(width/2-210,height/2, sr*2, sr,20)
                    rect(width/2+10,height/2, sr*2, sr,20)  
                    rect(width/2-210,height/2 + 110, sr*2, sr,20)          
                    rect(width/2+10,height/2 + 110, sr*2, sr,20)
                    noStroke() 
                    fill(255)
                    textSize(20)
                    text(que, w/2+110, h/2-150, sr*4+5) 
                    textSize(20)
                    text('A. ' +opt1, width/2-205, h/2, sr*2)
                text('B. '+opt2, width/2+15, h/2, sr*2)       
                text('C. ' +opt3, width/2-205, h/2+110, sr*2)
                text('D. ' +opt4, width/2+15, h/2+110, sr*2)
                
                
                
    
    
                option[optpres].style('background-color : #4CAF50')
                
                
                setTimeout(function(){
                    showquestion = false;
                    for(i=0;i<4;i++){
                        option[i].style('display: none');
                    }
                    db.style('display: block')
                    }, 4000)    
                }
                else{
                    fill('#ad0101')
                    rect(width/2-100,height/2 - 125, sr*4+5, 100,20)
                    rect(width/2-210,height/2, sr*2, sr,20)
                    rect(width/2+10,height/2, sr*2, sr,20)  
                    rect(width/2-210,height/2 + 110, sr*2, sr,20)          
                    rect(width/2+10,height/2 + 110, sr*2, sr,20)
                    noStroke() 
                    fill(255)
                    textSize(20)
                    text(que, w/2+110, h/2-150, sr*4+5) 
                    textSize(20)
                    text('A. ' +opt1, width/2-205, h/2, sr*2)
                text('B. '+opt2, width/2+15, h/2, sr*2)       
                text('C. ' +opt3, width/2-205, h/2+110, sr*2)
                text('D. ' +opt4, width/2+15, h/2+110, sr*2)
                option[optpres].style('background-color : #ad0101')
                option[ans].style('background-color : #4CAF50')
                setTimeout(function(){
                    showquestion = false;
                    for(i=0;i<4;i++){
                        option[i].style('display: none');
                    }
                    db.style('display: block')
                    }, 4000)    
                }
            }
            
            textStyle(BOLD)
        }
    
        }
    
    
    if(next<9){
        if(butpres){
            if(!showquestion){
        if(optpres==ans){
            for(i=0;i<balls.length;i++){
                balls[i].show(1)
            }
        }
          else {
            for(i=0;i<balls.length;i++){
                balls[i].show(2)             
        }}
            }
       
    }
}



        //dsiplaying name and score
        noStroke()
        fill('#f1ff22')
        textSize(25);
        textStyle(BOLD);
        textAlign(CENTER)
        text(name1, 110+1.5*sp,40)
        text(name2, w+1*sp,40)  
        fill(255)
        textStyle(NORMAL);        
        text('\u00A3' + score1, 110+1.5*sp,70) 
        text('\u00A3' + score2, w+1*sp,70) 
        textAlign(LEFT)
     
    
       
        
      
   
        noStroke()
        fill('#f1bb0e')//yellow-gold
        // #writing values for each bucket    
        textSize(0.58*sp);
        textStyle(BOLD);
        translate(100+5*sp/7,h-0.9*sp)
        rotate (270) 
        for (let i = 0; i<=14; i++){     
        text(moneyvalues[i], 0 , i*sp)    
        }
        
        
       
            
    }
    
    if (phaseno == 3){
//gradient background   
for(let y=0; y<height; y++){
    n = map(y,0,height,0,1);
    newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
  db.style('display: none')
       if(score1>score2){
           winner = name1
       }
       else if(score2>score1){
           winner = name2
       }
       else{
           winner = 'NO-ONE'
       }


          
       
       noStroke()
       textAlign(CENTER)


       setTimeout(function(){  
       displayt = true
            setTimeout(function(){    
                displayi = true
                setTimeout(function(){ 
                  displayw = true;
                

                    } ,2000)
            },  1000)
       }, 1000)

     
    if(displayt){
        fill(255)   
        textStyle(NORMAL)
        textSize(40)   
        text('The winner of', width/2, 75)
               
            image(logo, width/2-215, 100, 430, 335)
    }
    if(displayi){
        fill(255)
        textStyle(NORMAL)
        textSize(40)    
        text('is...', width/2, 475)
    }
    if(displayw){




        fill(255)
        textStyle(BOLD)
        textSize(60)      
        text(winner + '!', width/2, 540)

        pab.style('display: block')
        


        //confetti
        let t = frameCount / 60; // update time

        // create a random number of snowflakes each frame
        for (i = 0; i < random(5); i++) {
          flakes.push(new Flake()); // append snowflake object
        }
      
        // loop through snowflakes with a for..of loop
        for (let flake of flakes) {
          flake.update(t); // update snowflake position
          flake.display(); // draw snowflake         
        } 
    }
    }
    
    

    
    
    }  
    







