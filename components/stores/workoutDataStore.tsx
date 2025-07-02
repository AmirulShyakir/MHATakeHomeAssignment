// interface for data type ensures consistency and type safety aacross application
export interface Workout {
  key: string;
  date: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
}

// stub data
export const workouts = [
  {
    key: '1',
    date: '01/01/2025',
    exercise: "Bench Press",
    sets: 3,
    reps: 6,
    weight: 90.0
  },
  {
    key: '2',
    date: '01/01/2025',
    exercise: "Squat",
    sets: 4,
    reps: 8,
    weight: 80.0
  },
  {
    key: '3',
    date: '01/01/2025',
    exercise: "Deadlift",
    sets: 3,
    reps: 10,
    weight: 100.0
  },
];