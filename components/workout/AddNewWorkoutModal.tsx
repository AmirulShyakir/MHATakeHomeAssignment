import { Form, Modal, Input, InputNumber } from "antd";
import { Workout } from "../stores/workoutDataStore";
import { formatDate } from "@/utils/helpers";

interface AddNewWorkoutModalProps {
  visible: boolean;
  onAddWorkout: (workout: Workout) => void;
  closeModal: () => void;
}
export default function AddNewWorkoutModal(props: Readonly<AddNewWorkoutModalProps>) {
  const { visible, closeModal, onAddWorkout } = props;
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const { exercise, sets, reps, weight } = values;
      
      // create new workout object with interface for type safety
      const newWorkout: Workout = {
        date: formatDate(new Date()),
        exercise,
        sets,
        reps,
        weight,
      }  

      // simulate the API call, in this case just inform the parent to add the new workout to the list for display
      onAddWorkout(newWorkout);
      resetFormAndCloseModal()
    } catch (error) {
      console.log(error);
    }
  };

  // clears previous form input - reused for both cancel and submit
  const resetFormAndCloseModal = () => {
    form.resetFields();
    closeModal();
  }

  return (
    <Modal
      title="Add New Workout"
      open={visible}
      onOk={handleOk}
      onCancel={resetFormAndCloseModal}
    >
      <Form form={form} layout="vertical" initialValues={{ sets: 1, reps: 1, weight: 1 }}>
        <Form.Item
          label="Exercise"
          name="exercise"
          rules={[
            {
              required: true,
              message: "Please input exercise",
            },
            {
              type: 'string',
              pattern: /^[A-Za-z ]+$/, // only allow alpha, no special characters
              message: 'Only letters and spaces allowed',
            },
          ]}
        >
          <Input placeholder="Enter exercise name" showCount maxLength={20}/>
        </Form.Item>
        <Form.Item
          label="Sets"
          name="sets"
          rules={[
            {
              required: true,
              message: "Please input number of sets",
            },
            {
              type: 'number',
              min: 1,
              message: 'A minimum of 1 set must be entered',
            },
          ]}
        >
          <InputNumber min={1} defaultValue={1}/>
        </Form.Item>
        <Form.Item
          label="Reps"
          name="reps"
          rules={[
            {
              required: true,
              message: "Please input number of reps",
            },
            {
              type: 'number',
              min: 1,
              message: 'A minimum of 1 rep must be entered',
            },
          ]}
        >
          <InputNumber min={1} defaultValue={1}/>
        </Form.Item>
        <Form.Item
          label="Weight"
          name="weight"
          rules={[
            {
              required: true,
              message: "Please input weight",
            },
            {
              type: 'number',
              min: 0.25,
              max: 500,
              message: 'Weight must be between 0.25kg and 500kg',
            },
          ]} 
        >
          <InputNumber min={0.25} max={500}  step={0.25} addonAfter="kg"/> 
        </Form.Item>
      </Form>
    </Modal>
  )
}