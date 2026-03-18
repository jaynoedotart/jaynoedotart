let leaves = [];
let wind = 0;

class Leaf {
    constructor() {
        this.img = document.createElement("img");
        this.img.style.overflow = "hidden";
        if(Math.random() < 0.2){
            this.img.src = "leaf1.png";
        }
        else {
            this.img.src = "leaf2.png";
        }
        if(Math.random() < 0.5){
            this.img.style.transform = "scaleX(-1)";
        }
        this.img.style.position = 'absolute';
        this.img.style.width = (Math.random()*20 + 30)+'px';
        this.img.style.zIndex = '-999';
        document.body.appendChild(this.img);
        this.X = Math.random()*screen.width;
        this.Y = -120;
        this.a = 235;
        this.t = 0;
        this.fallspeed = Math.random() * 0.6 + 0.1;
        this.swing = Math.random() * 40 + 40;
        this.arc = Math.random()*50;
        this.dir = Math.floor(Math.random()*2)*2-1;
    }
}

setInterval(update, 10);

function update(){
    wind += Math.random()*0.2-0.1;
    if(wind > 2){
        wind = 2;
    }
    if(wind < -2){
        wind = -2;
    }
    if(leaves.length < 40 && Math.random() < 0.01 || leaves.length === 0){
        leaves.push(new Leaf());
    }
    move();
}

function move(){
    for(let i = 0; i < leaves.length; i++){
        if(leaves[i].Y > screen.height + 400){
            leaves[i].img.remove();
            leaves.splice(i,1);
            i--;
        }
        if(leaves[i].X < -200 || leaves[i].X > screen.width + 200){
            leaves[i].X = screen.width-leaves[i].X;
        }
        leaves[i].t += Math.random() * 3;
        leaves[i].a = 235 + leaves[i].arc * Math.sin(leaves[i].t * 0.02);
        leaves[i].X += leaves[i].dir*(wind * Math.random());
        leaves[i].Y += leaves[i].fallspeed;
        leaves[i].img.style.left = leaves[i].X + leaves[i].swing*Math.cos(leaves[i].a * 0.02);
        leaves[i].img.style.top = leaves[i].Y - leaves[i].swing*Math.sin(leaves[i].a * 0.02);
        leaves[i].img.style.transform = "rotate("+(-90+leaves[i].a*-1)+"deg)";
    }
}