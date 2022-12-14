import { GetServerSideProps, InferGetServerSidePropsType } from "next";
export default function Ssr({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return <div>{JSON.stringify(data)}</div>;
}
interface Data {
	result: string;
}
export const getServerSideProps: GetServerSideProps<{ data: Data }> = async ({ req, res }) => {
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
		throw Error(e.message);
	}
};
