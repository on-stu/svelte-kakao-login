import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import axios from 'axios';

async function getKakaoToken(code: string): Promise<string> {
	const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=54ad2df7938bde6e10f488573b34add1&redirect_uri=http://localhost:5173/oauth&code=${code}`;
	const response = await axios.post(url);
	return response.data.access_token;
}

export type TKakaoUser = {
	id: number;
	connected_at: string;
	properties: {
		nickname: string;
	};
	kakao_account: {
		profile: {
			nickname: string;
		};
		profile_needs_agreement: boolean;
	};
};

async function getKakaoUser(accessToken: string): Promise<TKakaoUser | null> {
	const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	const user = response.data;
	return user;
}

export const GET = (async ({ url }) => {
	const code = url.searchParams.get('code');

	if (!code) return json({ status: 400, body: { error: 'code is required' } });

	const token = await getKakaoToken(code);

	const user = await getKakaoUser(token);
	if (!user) return json({ status: 400, body: { error: 'user not found' } });
	console.log(user);
	// TODO: 카카오 유저로 로그인 로직 처리
	throw redirect(302, '/');
}) satisfies RequestHandler;
