import Skeleton from "@/components/layout/Skeleton";
import PlaygroundMainContent from "@/components/playground/PlaygroundMainContent";
import Head from "next/head";

export default function Playground() {
	return (
		<main>
			<Skeleton>
				<Head>
					<title>Boilerplate Playground</title>
				</Head>
				<PlaygroundMainContent />
			</Skeleton>
		</main>
	);
}
