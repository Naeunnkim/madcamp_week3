// index.js 파일

import { Animation1 } from "./animation1.js";
import { Animation2 } from "./animation2.js";
import { Animation3 } from "./animation3.js";

const tab1Button = document.getElementById('tab1');
const tab2Button = document.getElementById('tab2');
const tab3Button = document.getElementById('tab3');

let currentAnimation;

currentAnimation = new Animation1();

// 탭1 버튼 클릭 시
tab1Button.addEventListener('click', () => {
    // 현재 애니메이션이 있으면 중지
    if (currentAnimation) {
        currentAnimation.stop();
    }
    
    // Animation1 생성
    currentAnimation = new Animation1();
});

// 탭2 버튼 클릭 시
tab2Button.addEventListener('click', () => {
    // 현재 애니메이션이 있으면 중지
    if (currentAnimation) {
        currentAnimation.stop();
    }
    
    // Animation2 생성
    currentAnimation = new Animation2();
});

// 탭3 버튼 클릭 시
tab3Button.addEventListener('click', () => {
    // 현재 애니메이션이 있으면 중지
    if (currentAnimation) {
        currentAnimation.stop();
    }
    
    // Animation3으로 추후 변경
    currentAnimation = new Animation3();
});
