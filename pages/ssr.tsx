import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
export const config = {
	runtime: "experimental-edge",
};
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
		const kv = await (context as any).env.PIWARE.get("foo");

		const response = await fetch("https://eu2-merry-lobster-30387.upstash.io/get/foo", {
			headers: {
				Authorization:
					"Bearer AXazACQgY2NlNzFmOTMtMzFiNy00ODdkLTg0Y2UtNzI0MDNhZTFmMjA2ZjZjNzdlMjBmNGM1NGYxMmJhZDMzYjc1Yjk0MDE0NTA=",
			},
		});
		const data: Data = await response.json();
		console.log(data);
		return {
			props: {
				kv,
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
