import { message } from "antd";

export const useMessageApi = () => {
	const [messageApi, contextHolder] = message.useMessage();

	const showSuccess = (content: string) => messageApi.success(content);
	const showError = (content: string) => messageApi.error(content);
	const showInfo = (content: string) => messageApi.info(content);

	return {
		contextHolder,
		showSuccess,
		showError,
		showInfo,
	};
};
