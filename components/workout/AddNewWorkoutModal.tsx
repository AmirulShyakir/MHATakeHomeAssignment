import { Form, Modal, Input, InputNumber, Select } from "antd";
import { Workout } from "../stores/workoutDataStore";
import { formatDate } from "@/utils/helpers";
import { useMessageApi } from "@/pages/hooks/useMessageApi";
import axios from "axios";
import React from "react";
import { fetchTopExercises } from "@/services/fetchWorkouts";

interface AddNewWorkoutModalProps {
  visible: boolean;
  onAddWorkout: (workout: Workout) => void;
  closeModal: () => void;
}
export default function AddNewWorkoutModal(props: Readonly<AddNewWorkoutModalProps>) {
  const { visible, closeModal, onAddWorkout } = props;
  const [form] = Form.useForm();
  // custom hook to handle feedback messages for improved UI
  const { contextHolder, showSuccess, showError } = useMessageApi();
  const [exerciseOptions, setExerciseOptions] = React.useState<string[]>([]);

  // fetches 10 exercises from external API
  React.useEffect(() => {
    fetchTopExercises(10).then((res) => {
      console.log("Fetched exercises:", res);
      setExerciseOptions(res);
    });
  }, []);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const { exercise, sets, reps, weight } = values;
      
      // create new workout object with interface for type safety
      const newWorkout: Workout = {
        key: Date.now().toString(), // timestamp as unique key
        date: formatDate(new Date()),
        exercise,
        sets,
        reps,
        weight,
      }  

      // simulate the API call, in this case just inform the parent to add the new workout to the list for display
      onAddWorkout(newWorkout);
      resetFormAndCloseModal()
      showSuccess("Successfully added new workout");
    } catch (error) {
      console.log(error);
      showError("Failed to add new workout");
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
      width={300}
    >
       {contextHolder}
      <Form 
        form={form} 
        layout="vertical" 
        initialValues={{ sets: 1, reps: 1, weight: 1 }}
        style={{ display: 'flex', flexDirection: 'column'}}
      >
        <Form.Item
          label="Exercise"
          name="exercise"
          rules={[
            {
              required: true,
              message: "Please select an exercise",
            },
          ]}
        >
          <Select
            placeholder="Choose an exercise"
            options={exerciseOptions.map(name => ({ value: name, label: name }))}
          />
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
          <InputNumber min={1} style={{ width: '100%' }}/>
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
          <InputNumber min={1} style={{ width: '100%' }}/>
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
              pattern: /^[0-9]+(\.[0-9]+)?$/, // allow only numbers and decimals
              min: 0.25,
              max: 500,
              message: 'Weight must be between 0.25kg and 500kg',
            },
          ]} 
        >
          <InputNumber min={0.25} max={500}  step={0.25} addonAfter="kg" style={{ width: '100%' }}/> 
        </Form.Item>
      </Form>
    </Modal>
  )
}