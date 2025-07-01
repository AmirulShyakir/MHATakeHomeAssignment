import { Typography, Table, Flex, type TableProps, Button, Modal} from "antd"
import { type Workout, workouts as initialWorkouts} from "../stores/workoutDataStore";
import React from "react";
import AddNewWorkoutModal from "./AddNewWorkoutModal";

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

export default function WorkoutMainContent() {
  const [addNewWorkoutModalVisible, setAddNewWorkoutModalVisible] = React.useState<boolean>(false);
  const [workouts, setWorkouts] = React.useState<Workout[]>([]);

  React.useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = () => {
    // simulate fetching data from API
    setWorkouts(initialWorkouts);
  }

  const handleOpenModal = () => {
    setAddNewWorkoutModalVisible(true);
    console.log("opening modal");
  }
  const handleCloseModal = () => {
    setAddNewWorkoutModalVisible(false);
  }

  const handleAddWorkout = (newWorkout: Workout) => {
    setWorkouts([...workouts, newWorkout]);
  }

  return (
    <Flex vertical gap={24}>
      <Flex style={{ width: "100%" }} justify="space-between" align="center">
				<Typography.Title level={2} style={{ marginBottom: 0 }}>
					Workouts
				</Typography.Title>
				<Button type="primary" onClick={handleOpenModal}>
					Add Workout
				</Button>
			</Flex>
      <Table<Workout>
       dataSource={workouts} 
       columns={columns} 
      />
      <AddNewWorkoutModal 
        visible={addNewWorkoutModalVisible}
        closeModal={handleCloseModal}
        onAddWorkout={handleAddWorkout}
      />
    </Flex>
  )
}
