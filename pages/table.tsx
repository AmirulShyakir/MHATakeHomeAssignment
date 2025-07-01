import Skeleton from "@/components/layout/Skeleton";
import TableMainContent from "@/components/table/TableMainContent";
import Head from "next/head";

export default function Table() {
	return (
		<main>
			<Skeleton>
				<Head>
					<title>Table App</title>
				</Head>
				<TableMainContent/>
			</Skeleton>
		</main>
	);
}