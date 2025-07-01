import { Flex, Typography, Button } from "antd";

export default function WorkoutTitleAndActions() {
  return (
    <Flex style={{ width: "100%" }} justify="space-between" align="center">
      <Typography.Title level={2} style={{ marginBottom: 0 }}>
        Workouts
      </Typography.Title>
      <Button type="primary" onClick={handleAddNewWorkout}>
        Add Workout
      </Button>
    </Flex>
  )
}