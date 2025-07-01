import { Grid } from "antd";

const { useBreakpoint } = Grid;

export const isMobile = () => {
	const screens = useBreakpoint();
	return !screens.md; // md < 768px (tablets and below)
};