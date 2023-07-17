import { WaveGroup } from "./wavegroup.js";

export class Animation1 {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        document.body.style.backgroundColor = "#ffffff";
        document.getElementById('currentTime').style.color='black';
        document.getElementById('duration').style.color='black';

        this.waveGroup = new WaveGroup(

        );
        this.isStopped = false;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        //animtaion 시작
        requestAnimationFrame(this.animate.bind(this));
    }
    stop(){
        this.isStopped = true;
    }


    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
    
        //캔버스를 더블사이즈로 지정해서 레티나 디스플레이에서도 잘 보이도록 함
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2,2);

        this.waveGroup.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {

        if (this.isStopped) {
            this.isStopped = false;
            this.canvas.parentNode.removeChild(this.canvas);
            return; // 애니메이션이 중지된 상태면 animate 함수를 빠져나감
        }

        this.ctx.clearRect(0,0,this.stageWidth, this.stageHeight); //캔버스 클리어

        // //애니메이션 업데이트 로직 실행
        // setTimeout(() => {
        //     requestAnimationFrame(this.animate.bind(this));
        // }, 1000 / 30);
        this.waveGroup.draw(this.ctx);
        const interval = 1000 / 30;

        setTimeout(() => {
            requestAnimationFrame(this.animate.bind(this));
        }, interval);
    }

    
    
}

// window.onload = () => {
//     new Animation1(); //앱 생성
// }
