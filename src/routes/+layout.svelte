<script lang="ts">
	import { onMount } from 'svelte';

	// 페이지가 로드 됐을 때 실행
	onMount(() => {
		if (Kakao.isInitialized()) return; // 이미 초기화가 되어있다면 실행하지 않음
		Kakao.init('54ad2df7938bde6e10f488573b34add1'); // 카카오 JS SDK를 초기화
	});
</script>

<slot />
