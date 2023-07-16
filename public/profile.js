// 필요한 요소 선택
const mailSelect = document.getElementById("mail_Select");
const customEmailInput = document.getElementById("domain-input");
const id = localStorage.getItem("id");

// 이벤트 리스너 등록
mailSelect.addEventListener("change", function () {
    const selectedOption = mailSelect.value;
    if (selectedOption === "custom") {
        customEmailInput.disabled = false;
        customEmailInput.value = ""; // 직접 입력 필드 초기화
    } else {
        customEmailInput.disabled = true;
        customEmailInput.value = selectedOption;
    }
});

window.onload = function () {
    var edit = document.edit; //form데이터를 모두 edit변수에 저장

    // 유효성검사할 부분을 class로 부여했기에 check class 태그를 모두 input에 저장 가져옴
    // 이때 input 한 태그당 배열 인덱스로 받는다.
    var input = document.querySelectorAll('.check');

    // 오류 문구 //errorId : span의 id들(각 요소마다 나타낼 오류를 표시하기 위함)
    // error : class list의 하위 span을 모두 불러냄(일괄 처리를 위함 - 반복문)
    var errorId = ["pwError", "pwCheckError", "nameError", "phoneNumError", "emailError"];
    var error = document.querySelectorAll('.error');


    // 오류문구 초기화 메서드
    // 오류 표시 후, 사용자가 올바르게 수정을 하면 텍스트가 사라지는 모습을 구현
    function innerReset(error) {
        for (var i = 0; i < error.length; i++) {
            error[i].innerHTML = "";
        }
    }

    // 초기화 메서드 호출
    innerReset(error);

    // [ PW 입력문자 유효성검사 ]
    edit.pw.onkeydown = function () {
        innerReset(error); // 초기화 메서드 호출
        var pwLimit = /^[a-zA-Z0-9~!@#$%^&*()_-]{8,20}$/; //정규식(a~z, A~Z, 0~9, ~!@#$%^&*()_- 만 입력가능)
        if (!pwLimit.test(input[0].value)) { //입력값과 정규식 범위와 같지 않다면
            // pw의 오류 문구삽입
            document.getElementById(errorId[0]).innerHTML = " 8~20자의 영문 소대문자, 숫자와 특수기호 '~!@#$%^&*()_-'만 사용 가능합니다.";
        }
    }
    // [ PW 재확인 입력문자 초기화 ]
    //비밀번호 동일여부는 submit 버튼 클릭시 검사해줄 예정
    edit.pwCheck.onkeydown = function () {
        innerReset(error);// 오류문구 초기화   
    }
    // [ 휴대폰번호 입력문자 유효성검사 ]
    edit.phoneNum.onkeydown = function () { //입력값과 정규식 범위와 같지 않다면
        innerReset(error); // 초기화 메서드 호출   
        var pnumLimit = /^01[0|1|6|7|8|9]{1}[0-9]{8}$/; // 정규식(^$--> 문자의미, 01, (6자리중 "1자리"), 0~9--> "8자리")
        if (!pnumLimit.test(input[3].value)) { //입력값과 정규식 범위와 같지 않다면
            // pw의 오류 문구삽입 
            document.getElementById(errorId[3]).innerHTML = "올바른 형식이 아닙니다. 다시 확인해주세요.";
        }
    }

    // [ 이메일 입력 유효성검사 ] 
    edit.email.onkeydown = function () { //입력값과 정규식 범위와 같지 않다면
        innerReset(error); // 초기화 메서드 호출
        var emailLimit = /[0-9a-zA-Z-_.]/; // 정규식 0~9, a~z, A~Z, -, _, .내에서만 입력가능
        if (input[4].value && (!emailLimit.test(input[4].value))) {  //입력값과 정규식 범위와 같지 않다면
            // 이메일의 오류 문구삽입
            document.getElementById(errorId[4]).innerHTML = " 올바른 형식이 아닙니다. 영문,숫자, (-)(_)(.) 입력만 가능합니다.";
        }
    }
    //submit 실행시 수행할 동작
    edit.onsubmit = function (event) { //edit에서 submit이 실행된다면 수행할 함수   
        event.preventDefault();         
        var errorStr = [" 비밀번호를", " 비밀번호 확인을", " 성함을", " 휴대폰번호를"];

        innerReset(error); // 오류문구 초기화

        // [ input 공백확인 ]
        for (var i = 0; i < input.length - 2; i++) { // -1 == submit, email제외 
            if (!input[i].value) {
                document.getElementById(errorId[i]).innerHTML = errorStr[i] + " 입력해 주세요.";
                input[i].focus(); // 포커스 이동
                return false; // 종료 (포커스 이동유지를 위해 false 종료)
            }
        }

        //유효성검사) 비밀번호 재확인
        if (edit.pw.value != edit.pwCheck.value) {
            document.getElementById("pwCheckError").innerHTML = " 비밀번호가 일치하지 않습니다.";
            edit.pwCheck.focus(); // 포커스 이동
            return false;
        }

        // 정규식 변수 모음     
        var idLimit = /^[a-zA-Z0-9-_]{5,20}$/; //정규식(a~z, A~Z, 0~9, -, _만 입력가능)
        var pwLimit = /^[a-zA-Z0-9~!@#$%^&*()_-]{8,20}$/;///[a-zA-Z0-9]{10, 20}/; //정규식(a~z, A~Z, 0~9,~!@#$%^&*()_-특수문자 만 입력가능)
        var pnumLimit = /^01[0|1|6|7|8|9]{1}[0-9]{8}$/; // 01로 시작, 0,1,6,7,8,9 중 한자리, 0~9에서 8자리 입력
        var emailLimit = /[0-9a-zA-Z-_.]/; // 정규식 0~9, a~z, A~Z, -, _, .내에서만 입력가능

        // [ PW 유효성검사 ]
        if (!pwLimit.test(input[0].value)) {
            document.getElementById(errorId[0]).innerHTML = "8~20자의 영문 소대문자, 숫자와 특수기호 '~!@#$%^&*()_-'만 사용 가능합니다.";
            edit.pw.focus(); // 포커스 이동
            return false;
        }

        // [ 휴대폰번호 유효성검사 ]
        if (!pnumLimit.test(input[3].value)) {
            document.getElementById(errorId[3]).innerHTML = " 올바른 형식이 아닙니다. 다시 확인해주세요.";
            edit.phoneNum.focus(); // 포커스 이동
            return false;
        }

        // [ email 아이디 유효성검사 ]
        if (input[4].value && (!emailLimit.test(input[4].value))) {
            document.getElementById(errorId[4]).innerHTML = " 올바른 형식이 아닙니다. 영문,숫자, (-)(_)(.) 외 입력은 불가합니다.";
            edit.email.focus(); // 포커스 이동
            return false;
        }

        // [ email 주소선택 유효성검사 ]
        if (document.getElementById("mail_Select").value == "이메일 선택") {
            document.getElementById(errorId[4]).innerHTML = " 이메일을 선택해주세요.";
            return false;
        }
        //console.log(document.getElementById("mail_Select").value);


        var email;
        if (edit.email.value.trim() !== "") {
            email = edit.email.value + "@" + edit['domain-input'].value;
        }
        else {
            email = null;
        }

        var data = {
            id: id,
            pw: edit.pw.value,
            name: edit.name.value,
            phoneNum: edit.phoneNum.value,
            email: email
        };

        if (Object.keys(data).length > 0) {
            fetch('/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.text())
                .then(data => {
                    console.log(data.success);
                    alert('회원 정보 수정이 완료되었습니다.'); // 성공 메시지 표시
                    window.location.href = "http://172.10.5.163/main";
                })
                .catch(error => {
                    console.error(error);
                    alert('회원 정보 수정 중 오류가 발생했습니다.'); // 오류 메시지 표시
                });
        } else {
            alert('전송할 데이터가 없습니다.'); // 데이터가 비어있음을 알리는 메시지 표시
        }
    }//edit.onsubmit

}//window

if (id) {
    const myIdElement = document.getElementById("my-id");
    myIdElement.textContent = " "+id;
}