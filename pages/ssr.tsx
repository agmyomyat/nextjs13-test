import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
import Redis from "ioredis";
//default:Ub3JEH1DI5frnfDDsTUQd2Y5oRZBMJ@tcp-mo2.mogenius.io:29504
// new Redis({
// 	port: 29504, // Redis port
// 	host: "tcp-mo2.mogenius.io", // Redis host
// 	username: "default", // needs Redis >= 6
// 	password: "Ub3JEH1DI5frnfDDsTUQd2Y5oRZBMJ",
// });
// const redis = new Redis("redis://default:Ub3JEH1DI5frnfDDsTUQd2Y5oRZBMJ@tcp-mo2.mogenius.io:29504");
let redis: Redis;
try {
	redis = new Redis(
		"redis://default:f6c77e20f4c54f12bad33b75b9401450@eu2-merry-lobster-30387.upstash.io:30387"
	);
} catch (e: any) {
	console.log(e.message);
}
// const redis = new Redis({
// 	url: "https://eu2-merry-lobster-30387.upstash.io",
// 	token: "AXazACQgY2NlNzFmOTMtMzFiNy00ODdkLTg0Y2UtNzI0MDNhZTFmMjA2ZjZjNzdlMjBmNGM1NGYxMmJhZDMzYjc1Yjk0MDE0NTA=",
// });
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
		// const kv = await fetch(
		// 	"https://api.cloudflare.com/client/v4/accounts/38b160f8095b196eabcc729f65528a08/storage/kv/namespaces/f45655ac40214bc4ae4fe149ca655438/values/foo",
		// 	{
		// 		headers: {
		// 			"X-Auth-Key": "304d80ba351e0c80e65fbb537a82e3b8fdded",
		// 			"X-Auth-Email": "aungmyomyat.sv@gmail.com",
		// 		},
		// 	}
		// );
		console.time("set time");
		const set = await redis.set("foo", "amm"); // Returns a promise which resolves to "OK" when the command succeeds.
		console.timeEnd("set time");
		console.time("get time");
		const response = await redis.get("foo");
		console.timeEnd("get time");
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
