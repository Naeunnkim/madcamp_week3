# madcamp_week3: 자유주제 - 웹개발
> 4분반 김혜연, 김나은

몰입캠프 3주차 과제는 자유주제로, 우리는 서버와 DB를 활용하는 감정기록 및 힐링 웹사이트를 개발했다.

<br/>

## 팀원

* 카이스트 전산학부 [김혜연](https://github.com/fairykhy)
* 한양대학교 컴퓨터소프트웨어학부 [김나은](https://github.com/Naeunnkim)

<br/>

## 개발 환경
- Front: Html, Css, Javascript
- IDE: Visual Studio Code
- Server: Node.js
- Database: MySQL

<br/>

## 웹사이트 소개 (Website introduction)

<p>
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/42da393a-e29c-4dc7-877c-5330d4dcc1b8" height="32%" width="32%">
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/5d9fe775-08ed-455e-9208-df864fd76d85" heigh="32%" width="32%">
</p>

Mood Record<br/><br/>
하루하루의 감정을 일기에 기록하고 원하는 경우 게시판에 공유할 수 있다.<br/>
마음이 편안해지는 영상과 음악을 감상하며 명상의 시간을 가질 수 있다. <br/>
***

### Home 화면

### Meditation 화면
<p>
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/e6080eb5-289f-4b11-991c-f58484f6b128" width="32%">
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/71755db3-8557-4d91-9844-e88df46c562c" width="32%">
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/2edc08d2-d8fd-4ec3-89da-8146f04d052c" width="32%">
</p>
<br/>

#### 핵심 기능
- 상단 네비게이션 바에서 meditation 클릭 시 보이는 화면으로, 명상을 위한 음악과 느린 애니메이션이 재생된다.
- 음악 재생 버튼 아래의 탭 버튼을 통해 다른 애니메이션이 보여지도록 구현했다.

#### 기능 설명
- 음악 재생
  - autoplay를 통해 화면이 전환되면 자동으로 재생되도록 했다.

- 애니메이션
  - Tab1의 애니메이션은 quadraticCurveTo를 이용해 점들을 곡선으로 연결하였고, 각각의 점들은 sine함수를 따라 움직이도록 구현하였다.
  - Tab2의 애니메이션은 공의 경계선 좌표가 브라우저 화면에 닿을 때 방향 좌표에 -1을 곱해주어 반대 방향으로 움직이도록 구현하였다.
  - Tab3의 애니메이션은 산 경계선의 y좌표를 랜덤하게 생성해 이 점들을 quadraticCurveTo를 이용해 연결하였다. 태양의 이글거리는 경계선은 sine함수와 cosine함수를 통해 랜덤하게 생성한 점들을 직선으로 잇고, 이 함수가 한 프레임마다 실행되도록 설정해 매 프레임 다른 이미지를 띄워 이글거리는 느낌을 준다.
  - Reference: 유튜브 interactive developer
