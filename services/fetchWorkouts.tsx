export async function fetchTopExercises(limit: 10): Promise<string[]> {
  const response = await fetch('https://exercisedb.p.rapidapi.com/exercises', {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_EXERCISE_API_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_EXERCISE_API_HOST,
    },
  });

  if (!response.ok) {
    console.error("ExerciseDB API error", response.statusText);
    return [];
  }

  const data = await response.json();
  // array of 10 exercise objects mapped by name
  return data.slice(0, limit).map((exercise: any) => exercise.name);
}