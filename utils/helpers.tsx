import { Grid } from "antd";
import dayjs from "dayjs";

const { useBreakpoint } = Grid;

export const isMobile = (): boolean => {
	const screens = useBreakpoint();
	return !screens.md; // md < 768px (tablets and below)
};

export const formatDate = (date: Date): string  => {
  return dayjs(date).format('DD/MM/YYYY');
}