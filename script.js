let leaves = [];
var c = document.getElementById("bgCanvas");
var ctx = c.getContext("2d");
c.width = window.outerWidth;
c.height = window.outerHeight;

class Leaf {
    constructor() {
        this.t = 0;
        this.X = 0;
        this.Y = 0;
        this.a = 0;
        this.size = Math.random()*15 + 15;
        this.xShift = Math.random()*screen.width;
        this.yShift = -50;
        this.xSwing = Math.random()*200 + 60;
        this.ySwing = Math.random()*100 + 30;
        this.speed = Math.random()*30 + 50;
        this.img = document.createElement("img");
        if(Math.random() < 0.2){
            this.img.src = "leaf1.png";
        }
        else {
            this.img.src = "leaf2.png";
        }
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
        leaves[i].t++;
        leaves[i].a = leaves[i].t * 0.01;
        leaves[i].X = leaves[i].xSwing * Math.cos(leaves[i].a) + leaves[i].xShift;
        leaves[i].Y = leaves[i].ySwing * Math.sin(leaves[i].a) + leaves[i].speed * leaves[i].a + leaves[i].yShift;
        if(leaves[i].Y > screen.height + 400){
            leaves[i].img.remove();
            leaves.splice(i,1);
            i--;
        }
    }
}


function render(){
    ctx.clearRect(0, 0, c.width, c.height);
    for(let i = 0; i < leaves.length; i++){
        const image = leaves[i].img;
        let x = leaves[i].X;
        let y = leaves[i].Y;
        let width = image.size;
        let height = image.size;

        ctx.translate(x, y);
        ctx.rotate(leaves[i].a);
        ctx.drawImage(image, 0, 0, leaves[i].size, leaves[i].size);
        ctx.rotate(-leaves[i].a);
        ctx.translate(-x, -y);
    }
}