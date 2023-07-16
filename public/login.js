window.isLoggedIn = false;
window.onload = function () {
    var login = document.login; //form데이터를 모두 저장
    var input = document.querySelectorAll('.check');

    // 오류 문구 //errorId : span의 id들(각 요소마다 나타낼 오류를 표시하기 위함)
    // error : class list의 하위 span을 모두 불러냄(일괄 처리를 위함 - 반복문)
    var errorId = ["idError", "pwError"];

    document.getElementById("btn_signup").addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "http://172.10.5.163/signup";
    });

    login.onsubmit = function (event) {
        event.preventDefault(); 
        var errorStr = [" 아이디를", " 비밀번호를"];
        // [ input 공백확인 ]
        for (var i = 0; i < input.length; i++) {
            if (!input[i].value) {
                document.getElementById(errorId[i]).innerHTML = errorStr[i] + " 입력해 주세요.";
                input[i].focus(); // 포커스 이동
                return false; // 종료 (포커스 이동유지를 위해 false 종료)
            }
        }

        // 정규식 변수 모음     
        var idLimit = /^[a-zA-Z0-9-_]{5,20}$/; //정규식(a~z, A~Z, 0~9, -, _만 입력가능)
        var pwLimit = /^[a-zA-Z0-9~!@#$%^&*()_-]{10,20}$/;///[a-zA-Z0-9]{10, 20}/; //정규식(a~z, A~Z, 0~9,~!@#$%^&*()_-특수문자 만 입력가능)

        var data = {
            id: login.id1.value,
            pw: login.pw.value
        };

        console.log(data);

        if (Object.keys(data).length > 0 && data.id !== null) {
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data); // 서버 응답 출력
                    if (data.success) {
                        alert('로그인이 완료되었습니다.'); // 성공 메시지 표시
                        window.isLoggedIn = true;
                        // updateNavbarIcons();
                        console.log(window.isLoggedIn);
                        localStorage.setItem("login", window.isLoggedIn);
                        localStorage.setItem("id", data.id);
                        localStorage.setItem("pw", data.pw);
                        localStorage.setItem("name", data.name);
                        localStorage.setItem("tel", data.tel);
                        localStorage.setItem("email", data.email);
                        
                        window.location.href = "http://172.10.5.163/main";
                    }
                    else {
                        // id pw 오류
                        if (data.code == 0) {
                            alert('아이디 또는 비밀번호가 일치하지 않습니다.');
                            window.isLoggedIn = false;
                            window.location.href = "http://172.10.5.163/login";
                        }
                        else {
                            alert('error');
                            window.isLoggedIn = false;
                            window.location.href = "http://172.10.5.163/login";
                        }
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert('로그인 중 오류가 발생했습니다.'); // 오류 메시지 표시
                    // window.isLoggedIn = false;
                    // window.location.href = "http://172.10.5.163/login";
                });
        } else {
            alert('전송할 데이터가 없습니다.'); // 데이터가 비어있음을 알리는 메시지 표시
        }
    }//login.onsubmit

}//window