import { Flex, Typography, Button, Space, Switch } from "antd";

interface TableActionsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  handleOpenModal: () => void;
}

export default function TableActions(props: Readonly<TableActionsProps>) {
  const { isDarkMode, toggleDarkMode, handleOpenModal } = props;
  
  return (
    <Flex style={{ width: "100%" }} justify="space-between" align="center">
      <Button type="primary" onClick={handleOpenModal}>
          Add Workout
      </Button>
      <Space>
        <Typography.Text>Light</Typography.Text>
        <Switch checked={isDarkMode} onChange={toggleDarkMode}/>
        <Typography.Text>Dark</Typography.Text>
      </Space>
    </Flex>
  )
}