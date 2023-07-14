var isPlaying = false;
// 유튜브 플레이어 API를 비동기적으로 로드
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 재생 버튼 클릭 이벤트 핸들러
document.getElementById("playButton").addEventListener("click", function () {
    if (isPlaying) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
});

// 재생바 관련 변수 및 요소
var seekBar = document.getElementById("seekBar");
var currentTime = document.getElementById("currentTime");
var duration = document.getElementById("duration");

// YouTube 플레이어 인스턴스 생성
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'xQMaRjaY7S8', // 재생할 YouTube 동영상의 ID
        playerVars: {
            controls: 0, // 컨트롤 비활성화
            autoplay: 1, // 자동 재생 비활성화
            modestbranding: 1, // 로고 숨기기
            rel: 0, // 관련 동영상 표시 비활성화
            iv_load_policy: 3, // 악의적인 동영상 표시 비활성화
            fs: 0 // 전체화면 버튼 비활성화
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}

// YouTube 플레이어가 준비되었을 때 호출되는 함수
function onPlayerReady(event) {
    var durationInSeconds = player.getDuration();
    var formattedDuration = formatTime(durationInSeconds);
    duration.innerText = formattedDuration;

    // 재생바 변경 이벤트 핸들러 등록
    seekBar.addEventListener("input", function () {
        var seekTo = player.getDuration() * (seekBar.value / 100);
        player.seekTo(seekTo, true);
    });
}

// YouTube 플레이어 상태 변경 이벤트 핸들러
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        var durationInSeconds = player.getDuration();
        var formattedDuration = formatTime(durationInSeconds);
        duration.innerText = formattedDuration;

        // 재생바 업데이트
        setInterval(updateSeekBar, 1000);
    }
}

// 재생바 업데이트
function updateSeekBar() {
    var currentTimeInSeconds = player.getCurrentTime();
    var formattedCurrentTime = formatTime(currentTimeInSeconds);
    currentTime.innerText = formattedCurrentTime;

    var durationInSeconds = player.getDuration();
    var percentage = (currentTimeInSeconds / durationInSeconds) * 100;
    seekBar.value = percentage;
}

// 시간 형식 변환 함수
function formatTime(timeInSeconds) {
    var hours = Math.floor(timeInSeconds / 3600)
    var minutes = Math.floor(timeInSeconds / 60) % 60;
    var seconds = Math.floor(timeInSeconds % 60);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return hours + ":" + minutes + ":" + seconds;
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        // 재생 중인 경우, isPlaying 변수를 true로 설정하고 아이콘을 정지 아이콘으로 업데이트
        isPlaying = true;
        document.getElementById("playButton").innerHTML = '<i class="fa-solid fa-pause fa-2x" style="color: #ffc2d4;"></i>';
    } else {
        // 정지 상태인 경우, isPlaying 변수를 false로 설정하고 아이콘을 재생 아이콘으로 업데이트
        isPlaying = false;
        document.getElementById("playButton").innerHTML = '<i class="fa-solid fa-play fa-2x" style="color: #ffc2d4;"></i>';
    }
}