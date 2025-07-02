import { Card, Typography, Space, Divider } from "antd";
import { type Workout } from "../stores/workoutDataStore";

// interface for type safety of component props, which itself uses a defined interface for Workout
interface ExerciseCardProps {
  w: Workout;
}

// exported out this component as it is cleaner in mainContent and reusable elsewhere in future
export default function ExerciseCard(props: Readonly<ExerciseCardProps>) {
  const { w } = props;
  return (
    <Card key={w.key} size="small">
      <Typography.Paragraph strong>Date: {w.date}</Typography.Paragraph>
      <Typography.Paragraph>Exercise: {w.exercise}</Typography.Paragraph>
      <Space split={<Divider type="vertical" />}>
        <Typography.Paragraph>Sets: {w.sets}</Typography.Paragraph>
        <Typography.Paragraph>Reps: {w.reps}</Typography.Paragraph>
        <Typography.Paragraph>Weight: {w.weight} kg</Typography.Paragraph>
      </Space>
    </Card>
  )
}