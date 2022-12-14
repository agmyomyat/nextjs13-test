import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
export const config = {
	runtime: "experimental-edge",
};
const kv_super = "sSgHIsMBIWb0FPWHSYUYPjsahcygS27idro7Nnf5";
export default function Ssr(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
	useEffect(() => {
		console.log("prop", props);
	}, [props]);
	return <div>{JSON.stringify(props)}</div>;
}
interface Data {
	result: string;
}
export const getServerSideProps: GetServerSideProps = async context => {
	try {
		const kv = await fetch(
			"https://api.cloudflare.com/client/v4/accounts/38b160f8095b196eabcc729f65528a08/storage/kv/namespaces/f45655ac40214bc4ae4fe149ca655438/values/foo",
			{
				headers: {
					"X-Auth-Key": "304d80ba351e0c80e65fbb537a82e3b8fdded",
					"X-Auth-Email": "aungmyomyat.sv@gmail.com",
				},
			}
		);
		// const response = await fetch("https://eu2-merry-lobster-30387.upstash.io/get/foo", {
		// 	headers: {
		// 		Authorization:
		// 			"Bearer AXazACQgY2NlNzFmOTMtMzFiNy00ODdkLTg0Y2UtNzI0MDNhZTFmMjA2ZjZjNzdlMjBmNGM1NGYxMmJhZDMzYjc1Yjk0MDE0NTA=",
		// 	},
		// });
		const response = await kv.text();
		console.log(response);
		return {
			props: {
				response,
			},
		};
	} catch (e: any) {
		console.log(e.message);
		return {
			props: {
				error: e.message,
			},
		};
	}
};
// export default function Ssr() {
// 	return <div>hi</div>;
// }
