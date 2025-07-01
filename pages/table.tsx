import Skeleton from "@/components/layout/Skeleton";
import WorkoutMainContent from "@/components/workout/WorkoutMainContent";
import Head from "next/head";

export default function Table() {
	return (
		<main>
			<Skeleton>
				<Head>
					<title>Workout Tracker App</title>
				</Head>
				<WorkoutMainContent/>
			</Skeleton>
		</main>
	);
}