let leaves = [];
var c = document.getElementById("bgCanvas");
var ctx = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;

class Leaf {
    constructor() {
        this.img = document.createElement("img");
        if(Math.random() < 0.2){
            this.img.src = "leaf1.png";
        }
        else {
            this.img.src = "leaf2.png";
        }
        if(Math.random() < 0.5){
            this.img.style.transform = "scaleX(-1)";
        }
        this.t = 0;
        this.X = 0;
        this.Y = 0;
        this.xShift = Math.random()*screen.width;
        this.yShift = -50;
        this.xSwing = Math.random()*200 + 60;
        this.ySwing = Math.random()*100 + 30;
        this.speed = Math.random()*30 + 50;
    }
}

setInterval(update, 10);

function update(){
    if(leaves.length < 40 && Math.random() < 0.01 || leaves.length === 0){
        leaves.push(new Leaf());
    }
    move();
    render();
}

function move(){
    for(let i = 0; i < leaves.length; i++){
        if(leaves[i].Y > screen.height + 400){
            leaves[i].img.remove();
            leaves.splice(i,1);
            i--;
        }
        leaves[i].t++;
        let t = leaves[i].t * 0.01;
        leaves[i].X = leaves[i].xSwing * Math.cos(t) + leaves[i].xShift;
        leaves[i].Y = leaves[i].ySwing * Math.sin(t) + leaves[i].speed * t + leaves[i].yShift;
    }
}


function render(){
    ctx.clearRect(0, 0, c.width, c.height);
    for(let i = 0; i < leaves.length; i++){
        ctx.drawImage(leaves[i].img,leaves[i].X,leaves[i].Y,30,30);
    }
}

