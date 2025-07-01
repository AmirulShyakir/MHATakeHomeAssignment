import { Typography, Table, Flex, type TableProps, Button} from "antd"
import { Workout, workouts } from "../stores/workoutDataStore";

const columns: TableProps<Workout>["columns"] = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Exercise',
    dataIndex: 'exercise',
    key: 'exercise',
  },
  {
    title: 'Sets',
    dataIndex: 'sets',
    key: 'sets',
  },
  {
    title: 'Reps',
    dataIndex: 'reps',
    key: 'reps',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
  },
];

export default function TodoMainContent() {
  function handleAddNewWorkout(event: MouseEvent<HTMLElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Flex vertical gap={24}>
      <Flex style={{ width: "100%" }} justify="space-between" align="center">
				<Typography.Title level={2} style={{ marginBottom: 0 }}>
					Workouts
				</Typography.Title>
				<Button type="primary" onClick={handleAddNewWorkout}>
					Add Workout
				</Button>
			</Flex>
      <Table<Workout>
       dataSource={workouts} 
       columns={columns} 
      />
    </Flex>
  )
}
