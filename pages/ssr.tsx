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
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	try {
		const response = await fetch("https://r2.eiga.workers.dev");
		const data: Data = await response.json();
		console.log(data);
		res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=59");
		return {
			props: {
				data,
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
