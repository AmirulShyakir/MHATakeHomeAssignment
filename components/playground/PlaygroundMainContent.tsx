import { Button, Col, Descriptions, Divider, Row, Space, Typography } from "antd";
import { usePlaygroundDataStore } from "../stores/playgroundDataStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
	faArrowDown,
	faArrowLeft,
	faArrowRight,
	faArrowUp,
	faMusic,
} from "@fortawesome/free-solid-svg-icons";

export default function PlaygroundMainContent() {
	const buttonClickCount = usePlaygroundDataStore((state) => state.buttonClickCount);
	const setButtonClickCount = usePlaygroundDataStore((state) => state.setButtonClickCount);

	return (
		<div>
			<Space style={{ marginBottom: 10 }}>
				<FontAwesomeIcon icon={faMusic} size="lg" bounce />
				<Typography.Title level={3} style={{ margin: 0 }}>
					Welcome to the Playground Page
				</Typography.Title>
			</Space>

			<Typography.Paragraph>
				This is where you can experiment with the boilerplate, or reference how certain things work.
				<ul>
					<li>
						<b>Frontend Coding Practices: </b>
						<Link
							href={
								"https://github.com/onboardinglance/intern-knowledge-repository/wiki/Frontend-Coding-Practices"
							}
						>
							https://github.com/onboardinglance/intern-knowledge-repository/wiki/Frontend-Coding-Practices
						</Link>
					</li>
				</ul>
			</Typography.Paragraph>
			<Divider />
			<Typography.Title level={3}>Quick Component Reference</Typography.Title>
			<Typography.Paragraph>
				Our UI library of choice is <code>Ant Design v5</code>. To build your own theme, modify the{" "}
				<code>ConfigProvider</code> wrapped around the components in the <code>_app.tsx</code> file.
				You can refer to the Ant Design documentation for more information.
			</Typography.Paragraph>
			<Divider />
			<Typography.Title level={4}>Buttons</Typography.Title>
			<Row gutter={16}>
				<Col>
					<Button type="primary">Primary</Button>
				</Col>
				<Col>
					<Button type="default">Default</Button>
				</Col>
				<Col>
					<Button type="text">Text</Button>
				</Col>
				<Col>
					<Button type="link" href="/playground">
						Link
					</Button>
				</Col>
			</Row>
			<Divider />
			<Typography.Title level={4}>Icons (FontAwesomeIcon)</Typography.Title>
			<Typography.Paragraph>
				Refer for sample of how to style, import and use FontAwesomeIcons for your project
			</Typography.Paragraph>
			<Space>
				<FontAwesomeIcon icon={faArrowUp} size="lg" />
				<FontAwesomeIcon icon={faArrowLeft} style={{ color: "gold" }} size="2x" />
				<FontAwesomeIcon icon={faArrowDown} spin />
				<FontAwesomeIcon icon={faArrowRight} spinPulse />
			</Space>
			<Divider />
			<Typography.Title level={4}>Zustand Store Example</Typography.Title>
			<Typography.Paragraph>
				Zustand will be our state management library. The below example, is only an example and{" "}
				<b>should not be the default way to manage state</b>. Zustand should only be used for state
				that must be shared between components.
			</Typography.Paragraph>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					padding: 24,
					background: "#efefef",
					borderRadius: 10,
				}}
			>
				<Descriptions
					items={[
						{ key: "buttonClickCount", label: "Button Click Count", children: buttonClickCount },
					]}
				/>
				<Space>
					<Button type="primary" onClick={() => setButtonClickCount(1)}>
						Add 1
					</Button>
					<Button type="default" onClick={() => setButtonClickCount(5)}>
						Add 5
					</Button>
				</Space>
			</div>
		</div>
	);
}
