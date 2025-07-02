import { Typography, Table, Flex, type TableProps, Button, Modal, Space, Switch, Card, Divider} from "antd"
import { type Workout, workouts as initialWorkouts} from "../stores/workoutDataStore";
import React, { use } from "react";
import AddNewWorkoutModal from "./AddNewWorkoutModal";
import { useLightDarkModeState } from "../stores/lightDarkModeState";
import { isMobile } from "@/utils/helpers";
import ExerciseCard from "./ExerciseCard";
import WorkoutTableActions from "./TableActions";
import TableActions from "./TableActions";

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
  const isDarkMode = useLightDarkModeState((state) => state.isDarkMode);
  const toggleDarkMode = useLightDarkModeState((state) => state.toggleDarkMode);
  const [addNewWorkoutModalVisible, setAddNewWorkoutModalVisible] = React.useState<boolean>(false);
  const [workouts, setWorkouts] = React.useState<Workout[]>([]);

  const mobile = isMobile();

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
      <Typography.Title level={2} style={{ marginBottom: 0 }}>
        Workouts
      </Typography.Title>
      {/* component so that it can be reused */}
      <TableActions 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handleOpenModal={handleOpenModal}
      />
      {/* ternary used instead of logical && since a distinct boolean state is used to render only two components */}
      {mobile ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          {workouts.map((w) => (
            <ExerciseCard key={w.key} w={w} />
          ))}
        </Space>
      ) : (
        <Table<Workout> dataSource={workouts} columns={columns} />
      )}
      <AddNewWorkoutModal 
        visible={addNewWorkoutModalVisible}
        closeModal={handleCloseModal}
        onAddWorkout={handleAddWorkout}
      />
    </Flex>
  )
}
