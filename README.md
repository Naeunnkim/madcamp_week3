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

#### 핵심 기능
- 웹사이트 접속시 처음 보이는 화면으로, 감정 로고와 달력이 표시된다.
- 회원인 경우 작성한 일기에 대한 감정 아이콘이 날짜에 맞게 달력에 표시된다.

#### 기능 설명
- 상단 navigation bar를 이용해 원하는 화면으로 이동할 수 있도록 구현했다.
  - 로고 클릭시 홈 화면으로 돌아온다.
  - 각각의 버튼에 대해 hover를 주고 cursor를 pointer로 변경해 버튼 클릭을 용이하게 했다.
  - 회원의 경우 마이페이지와 로그아웃 버튼이, 비회원의 경우 로그인과 회원가입 버튼이 우측 상단에 표시된다.
- 달력에는 오늘 날짜와 이번 달 일기에 대한 감정 아이콘이 표시된다
  - 이전달, 다음달로 이동하면 해당 달에 맞게 달력이 업데이트 된다.
  - 달력을 구현하는 renderCalendar함수 내부에 diary로 부터 날짜와 감정을 받아와 이를 이미지로 표시하는 부분이 포함되어있다.

### Dashboard 화면
<p>
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/41eba320-a174-438e-a0c2-ad2692339052" width="32%">
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/0dca5fce-047e-430c-8453-590ed7cc8bd1" width="32%">
  <img src="https://github.com/Naeunnkim/madcamp_week3/assets/128071056/5e782b1f-22f1-4a38-a50e-e6b8f0be9d38" width="32%">
</p>

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
  - youtube iframe api를 활용하여 유튜브에서 영상을 가져와 재생한다.
  - 영상을 가져와 화면을 보이지 않도록 하여 음악만 재생되도록 한다.
  - autoplay를 이용해 화면이 전환되면 자동으로 음악이 재생되도록 했다.

- 애니메이션
  - Tab1의 애니메이션은 quadraticCurveTo를 이용해 점들을 곡선으로 연결하였고, 각각의 점들은 sine함수를 따라 움직이도록 구현하였다.
  - Tab2의 애니메이션은 공의 경계선 좌표가 브라우저 화면에 닿을 때 방향 좌표에 -1을 곱해주어 반대 방향으로 움직이도록 구현하였다.
  - Tab3의 애니메이션은 산 경계선의 y좌표를 랜덤하게 생성해 이 점들을 quadraticCurveTo를 이용해 연결하였다. 태양의 이글거리는 경계선은 sine함수와 cosine함수를 통해 랜덤하게 생성한 점들을 직선으로 잇고, 이 함수가 한 프레임마다 실행되도록 설정해 매 프레임 다른 이미지를 띄워 이글거리는 느낌을 준다.
  - Reference: 유튜브 interactive developer


### 회원 기능
#### 1. 회원 가입
#### 핵심 기능
- 필수 항목: 아이디, 비밀번호, 비밀번호 확인, 닉네임, 전화번호, 개인정보 수집 및 이용 동의 / 선택항목: 이메일
  - 필수 항목 미기재 시 기재가 필요하다는 멘트를 띄운다.
  - 아이디: 5~20자의 영문 소대문자, 숫자와 특수기호(_),(-) ; 중복 확인 필수
  - 비밀번호: 8\~20자의 영문 소대문자, 숫자와 특수기호 '~!@#$%^&*()_-'
  - 전화번호: 01로 시작하고 11자
  - 이메일: 영문,숫자, (-)(_)(.)
  - 개인정보 수집/이용 동의: 비동의 시 가입이 불가. 개인정보 처리방침 클릭시 처리방침 조회가 가능하다.
#### 기능 설명
- DB에서 아이디와 전화번호에 unique 설정을 하여 중복이 불가능하도록 하였다.
- 서버의 부하를 줄이기 위해 입력 형식 확인은 자바스크립트 내에서 처리하고 아이디 중복 확인 및 가입 완료 시에만 서버를 불러오도록 한다.
  - 입력 형식 확인 정규식을 이용했다.
  - 이메일의 경우 html의 select 태그와 option 태그를 활용하여 선택하거나 직접 입력하도록 했다.
- 회원가입 시 비밀번호는 해싱 후에 저장되어 DB에서 비밀번호 조회가 불가능하다.
  - hash의 경우 node.js의 bcrypt를 이용하여 구현하였다. (bcrypt.genSalt, bcrypt.hash)

```
async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('비밀번호 암호화 실패');
    }
};
```javascript
위는 자바스크립트로 구현한 비밀번호 해싱함수이다.

#### 2. 로그인
#### 핵심 기능
- 가입한 아이디와 비밀번호로 로그인이 가능하다.
- 회원가입 버튼을 누르면 회원 가입 페이지로 이동한다.

#### 기능 설명
- 아이디 또는 비밀번호에 오류가 있다면 alert를 이용해서 오류가 있다는 메시지를 띄운다.
- 로그인이 성공적으로 이루어지면 alert를 이용해서 로그인이 완료되었다는 메시지를 띄운다.
  - 새 페이지를 로드할 때마다 DB에서 회원 정보를 불러 오지 않고 로그인 시 회원 정보를 localStorage에 저장해두고 사용하도록 하여 서버의 부하를 줄인다.
- bcrypt.compare를 이용하여 DB에서 가져온 해싱된 비밀번호와 입력한 비밀번호를 비교한다.
```
const checkPassword = (submittedPassword, hashedPassword) => {
    return bcrypt.compare(submittedPassword, hashedPassword);
};
```javascript
위는 자바스크립트로 구현한 비밀번호 확인함수이다.

#### 3. 마이페이지
#### 핵심 기능
- 비밀번호, 닉네임, 전화번호, 이메일 수정과 회원 탈퇴가 가능하다.
- 회원 가입과 마찬가지로 비밀번호, 비밀번호 재확인, 닉네임, 전화번호가 필수항목, 이메일이 선택항목이다.

#### 기능 설명
- primary key인 id를 이용하여 DB를 업데이트한다.
- 회원 정보 수정 시에도 가입할 때처럼 비밀번호를 해싱 후에 저장한다.
  - localStorage에 저장된 회원 정보도 업데이트한다.
- 회원 탈퇴 시 user_info 테이블에서 회원 정보가 사라지도록 한다.
  - modal을 띄워 탈퇴를 하는 게 맞는지 한 번 더 확인 후에 탈퇴가 이루어지도록 한다.
  - DB에서 foreign key 설정을 on delete cascade로 설정하여 회원 탈퇴 시 작성한 글 및 댓글 등 관련된 모든 정보가 같이 삭제되도록 구현했다.
  - localStorage.clear()를 활용하여 창에 저장된 데이터를 삭제하고 초기 화면으로 돌아간다.

#### 4. 로그아웃
#### 핵심 기능
- 상단 바의 Log out을 누르면 로그아웃이 된다.

#### 기능 설명
- localStorage.clear()를 활용하여 창에 저장된 모든 데이터를 삭제하고 초기 화면으로 돌아간다.
