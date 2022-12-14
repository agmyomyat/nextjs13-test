import { GetServerSideProps, InferGetServerSidePropsType } from "next";
export default function Ssr({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return <div>{JSON.stringify(data)}</div>;
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
				runtime: process.env.NEXT_RUNTIME,

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
