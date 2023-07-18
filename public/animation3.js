import { Hill } from "./hill.js";
import { Sun } from "./sun.js";

export class Animation3 {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        document.body.style.backgroundColor = "#ffe9ec";
        document.getElementById('currentTime').style.color='black';
        document.getElementById('duration').style.color='black';

        this.isStopped = false;

        this.hills = [
            new Hill('#ff7a85', 0.2, 12),
            new Hill('#ff5675', 0.5, 8),
            new Hill('#ff1493', 1.4, 6)
        ];

        this.sun = new Sun();

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

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

        this.sun.resize(this.stageWidth, this.stageHeight);

        for(let i=0; i<this.hills.length; i++) {
            this.hills[i].resize(this.stageWidth, this.stageHeight);
        }
    }

    animate(t) {
        if (this.isStopped) {
            this.isStopped = false;
            this.canvas.parentNode.removeChild(this.canvas);
            return; // 애니메이션이 중지된 상태면 animate 함수를 빠져나감
        }

        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.sun.draw(this.ctx, t);

        let dots;
        for(let i=0; i<this.hills.length; i++) {
            dots = this.hills[i].draw(this.ctx);
        }
    }
}