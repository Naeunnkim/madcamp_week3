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
<p>
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/c60c0666-7964-4a60-a2c0-443c6a6742fc">
</p>
<br/>

### Dashboard 화면
#### 핵심 기능
- 본인이 작성한 일기를 공유할 수 있는 공간이다.
- 화면 왼쪽에는 유저들이 작성한 일기의 기분을 불러와 기분별 그래프로 보여준다.
- 화면 오른쪽에는 유저들이 공유한 일기가 보인다.
- 비회원도 열람 가능하다.
   - 좋아요 및 댓글 작성 기능은 이용 불가하다.
- 게시판의 일기 카드 클릭시 상세페이지로 넘어갈 수 있다.
  - 내가 작성한 일기라면 일기 수정이 가능하다.
  - 다른 유저가 쓴 일기에 좋아요를 누르고 댓글을 작성할 수 있다.
  - 댓글에도 좋아요를 누를 수 있으며, 내가 작성한 댓글은 삭제가 가능하다.

#### 기능 설명
- addEventListener를 이용해서 좋아요 클릭시 좋아요 수 및 아이콘이 변하도록 했다
  - 서버의 부하를 줄이기 위해 해당 창을 나가거나 새로고침 시에만 DB가 업데이트 되도록 구현했다.
  - 자바스크립트의 fetch 함수를 이용하여 서버에 요청을 보내고 response를 받아와 처리했다.
- 댓글 삭제 시 modal을 띄워 삭제하는게 맞는지 확인 후 삭제되도록 구현했다.
  - 자바스크립트에 자체 modal이 존재하지 않아 display: none으로 스타일을 지정해놓고 클릭 시 보이도록 했다. 
- 게시판은 CSS의 grid display를 활용했다. 
  - grid-template-column에 repeat과 auto-fit을 활용하여 창의 크기에 따라 한 행에 보이는 카드 수를 조절했다.
  - 일기 카드마다 사이즈를 다르게 구현하여 카드간 공백을 줄이기 위해 alignToBaseline이라는 함수를 만들어 이용했다.

//alignToBaseline 코드

### Diary 화면
<p>
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/67307bea-3076-4eff-a365-9aeb1f96d3fa" width="32%">
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/91aa0ce2-a39c-4cfa-ab87-2937c670a10b" width="32%">
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/bc4c79b2-1197-478d-a26b-53ecb2cc7c0d" width="32%">
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/aad47a5b-0ca6-475f-9330-c2c78ccd5aa2" width="32%">
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/86c20ce5-771b-475a-b6d4-83a5d8ce6853" width="32%">
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/f2bf6f3b-b8fa-45ff-a8bf-8ee1a80c90e9" width="32%">
</p>
<br/>

#### 핵심 기능
- 본인이 작성한 일기를 볼 수 있는 페이지이다.
  - 비회원의 경우 회원가입을 해야 일기를 작성할 수 있다는 메세지를 표시한다.
- 오늘 하루 기록하기 버튼을 누르면 기록 페이지로 이동한다.
- 기록 페이지에서는 날짜, 기분, 게시판 표시 여부 등을 선택할 수 있으며, 최대 1장의 사진과 텍스트를 넣을 수 있다.
  - 이미 일기를 작성한 날짜에는 또다른 일기를 작성 할 수 없다.
  - 기분을 선택하지 않으면 저장 되지 않는다.
  - 게시판 표시를 체크하면 diary와 dashboard 화면에서 모두 확인이 가능하며, 체크하지 않으면 작성자만 볼 수 있다.

#### 기능 설명
- CSS의 grid display를 활용해 일기 정보를 표시한다.
  - DB에서 order by date 쿼리를 통해 최근 날짜에 해당하는 일기가 상단에 뜨도록 하였다.
  - grid-template-column에 repeat과 auto-fit을 활용하여 창의 크기에 따라 한 행에 보이는 카드 수를 조절했다.
  - 일기 카드마다 사이즈를 다르게 구현하여 카드간 공백을 줄이기 위해 alignToBaseline이라는 함수를 만들어 이용했다.
- 각각의 일기 카드를 클릭하면 일기 정보를 자세히 보여주는 상세 페이지로 이동한다.
  - 우측 상단 수정 버튼을 클릭하면 글 작성 페이지로 이동하며, 이 때 fetch함수를 이용해 해당 일기의 날짜, 감정, 게시판 표시여부, 텍스트 정보를 받아와 수정 페이지로 전달한다. 등록한 사진의 경우 이미지 정보의 전달이 불가능해 사진이 유지되지 않으니 다시 선택하라는 alert를 띄운다.
  - 우측 상단 삭제 버튼을 클릭하면 modal을 띄워 삭제하는게 맞는지 확인 후 삭제되도록 구현했다.


### Meditation 화면
<p>
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/e6080eb5-289f-4b11-991c-f58484f6b128" width="32%">
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/71755db3-8557-4d91-9844-e88df46c562c" width="32%">
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/2edc08d2-d8fd-4ec3-89da-8146f04d052c" width="32%">
</p>
<br/>

#### 핵심 기능
- 상단 네비게이션 바에서 meditation 클릭 시 보이는 화면으로, 명상을 위한 음악과 느린 애니메이션이 재생된다.
- 음악 재생 버튼 아래의 탭 버튼을 통해 탭에 따라 서로 다른 3개의 애니메이션이 표시된다.

#### 기능 설명
- 음악 재생
  - autoplay를 이용해 화면이 전환되면 자동으로 음악이 재생되도록 했다.

- 애니메이션
  - Tab1의 애니메이션은 quadraticCurveTo를 이용해 점들을 곡선으로 연결하였고, 각각의 점들은 sine함수를 따라 움직이도록 구현하였다.
  - Tab2의 애니메이션은 공의 경계선 좌표가 브라우저 화면에 닿을 때 방향 좌표에 -1을 곱해주어 반대 방향으로 움직이도록 구현하였다.
  - Tab3의 애니메이션은 산 경계선의 y좌표를 랜덤하게 생성해 이 점들을 quadraticCurveTo를 이용해 연결하였다. 태양의 이글거리는 경계선은 sine함수와 cosine함수를 통해 랜덤하게 생성한 점들을 직선으로 잇고, 이 함수가 한 프레임마다 실행되도록 설정해 매 프레임 다른 이미지를 띄워 이글거리는 느낌을 준다.
  - Reference: 유튜브 interactive developer
