import { Card, Typography, Space, Divider, Flex } from "antd";
import { type Workout } from "../stores/workoutDataStore";

// interface for type safety of component props, which itself uses a defined interface for Workout
interface ExerciseCardProps {
  w: Workout;
}

// exported out this component as it is cleaner in mainContent and reusable elsewhere in future
export default function ExerciseCard(props: Readonly<ExerciseCardProps>) {
  const { w } = props;
  return (
    <div className="card-typography">
      <Card key={w.key} size="small">
        <Flex justify="space-between">
          <Typography.Paragraph strong>{w.exercise}</Typography.Paragraph>
          <Typography.Paragraph>Date: {w.date}</Typography.Paragraph>
          
        </Flex>
        <Space split={<Divider type="vertical" />}>
          <Typography.Paragraph>Sets: {w.sets}</Typography.Paragraph>
          <Typography.Paragraph>Reps: {w.reps}</Typography.Paragraph>
          <Typography.Paragraph>Weight: {w.weight} kg</Typography.Paragraph>
        </Space>
      </Card>
    </div>
    
  )
}