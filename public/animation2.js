//import { Block } from "./block.js";
import { Ball } from "./ball.js";

export class Animation2 {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        document.body.style.backgroundColor = "#384c79";
        document.getElementById('currentTime').style.color='white';
        document.getElementById('duration').style.color='white';

        this.isStopped = false;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 5);
        //this.block = new Block(700, 30, 150, 200);
        window.requestAnimationFrame(this.animate.bind(this));
    }
    
    stop(){
        this.isStopped = true;
    }
 
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2 ;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2);
    }

    animate(t) {

        if (this.isStopped) {
            this.isStopped = false;
            this.canvas.parentNode.removeChild(this.canvas);
            return; // 애니메이션이 중지된 상태면 animate 함수를 빠져나감
        }

        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0,0,this.stageWidth, this.stageHeight);

        //this.block.draw(this.ctx);
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight);
    }
}

// window.onload = () => {
//     new Animation2();
// }