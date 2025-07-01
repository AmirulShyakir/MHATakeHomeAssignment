import { Form, Modal, Input, InputNumber } from "antd";

interface AddNewWorkoutModalProps {
  visible: boolean;
  loading?: boolean;
  closeModal: () => void;
}
export default function AddNewWorkoutModal(props: Readonly<AddNewWorkoutModalProps>) {
  const { visible, closeModal, loading } = props;
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      form.resetFields();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    closeModal();
  }

  return (
    <Modal
      title="Add New Workout"
      open={visible}
      confirmLoading={loading}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" initialValues={{ sets: 1, reps: 1,weight: 1 }}>
        <Form.Item
          label="Exercise"
          name="exercise"
          rules={[
            {
              required: true,
              message: "Please input exercise",
            },
          ]}
        >
          <Input placeholder="Enter exercise name"/>
        </Form.Item>
        <Form.Item
          label="Sets"
          name="sets"
          rules={[
            {
              required: true,
              message: "Please input number of sets",
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
          ]} 
        >
          <InputNumber min={1} defaultValue={1} addonAfter="kg"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}