import "@/styles/globals.css";
import "@fontsource-variable/inter";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { useLightDarkModeState } from "@/components/stores/lightDarkModeState";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
	config.autoAddCss = false; // Prevent fontawesome icons from autoloading css first

	// use Zustand globally persisted state to change the component design tokens
	const isDarkMode = useLightDarkModeState((state) => state.isDarkMode);

	// workaround for antD not having design token to edit cell bg
	React.useEffect(() => {
		document.body.classList.toggle('dark', isDarkMode);
		document.body.classList.toggle('light', !isDarkMode);
	}, [isDarkMode]);

	// Wrap your providers here
	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: "Inter Variable",
				},
				components: {
					Table: {
						headerBg: isDarkMode ? 'var(--secondary)' : 'var(--primary)', 
						headerColor: isDarkMode ? 'var(--textDarkMode)' : 'var(--text)',
						headerSplitColor: isDarkMode ? 'var(--textDarkMode)' : 'var(--text)',
						rowHoverBg: isDarkMode ? '#2a2a2a' : '#f5f5f5',
						colorText: isDarkMode ? 'var(--textDarkMode)' : 'var(--text)'
					},
					Card: {
						colorBgContainer: isDarkMode ? 'var(--tableCellDarkMode)' : 'var(--foreground)',
						colorText: isDarkMode ? 'var(--textDarkMode)' : 'var(--text)'
					}
				}
			}}
		>
			<Component {...pageProps} />
		</ConfigProvider>
	);
}
