import { Layout, Typography } from "antd";
/**
 * The Skeleton.tsx file will be used to create a skeleton layout for the application.
 * Common layout elements, or authentication checking should be included in the Skeleton, and pages should be wrapped with this Skeleton to enforce common behavior.
 */

const headerStyle: React.CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
  textAlign: 'center',
  color: '#fff',
  backgroundColor: 'var(--primary)',
};

export default function Skeleton({ children }: Readonly<{ children?: React.ReactNode }>) {
	// Wrap your layout components, or run authentication checks here
	const { Content, Header } = Layout;

	return (
		<Layout style={{ height: "100vh" }}>
			<Header style={headerStyle}>
				<Typography.Title level={3} style={{ margin: 0 }}>Workout Tracker App</Typography.Title>
			</Header>
			<Content style={{ margin: '24px 48px 0', flex: 1}}>
				{children}
			</Content>
		</Layout>
	)
}
