<script lang="ts">
	function onKakaoLogin() {
		// 카카오 로그인 버튼을 눌렀을 때 동작하는 함수
		Kakao.Auth.authorize({
			redirectUri: 'http://localhost:5173/oauth' // 카카오 로그인 후 리다이렉트 될 주소
		});
	}
</script>

<button on:click={onKakaoLogin}>
	<img
		src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
		width="222"
		alt="카카오 로그인 버튼"
	/>
</button>
