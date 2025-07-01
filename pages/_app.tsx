import "@/styles/globals.css";
import "@fontsource-variable/inter";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	config.autoAddCss = false; // Prevent fontawesome icons from autoloading css first

	// Wrap your providers here
	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: "Inter Variable",
				},
				components: {
					Table: {
						headerBg: 'var(--primary)', 
						headerSplitColor: 'var(--background)'
					}
				}
			}}
		>
			<Component {...pageProps} />
		</ConfigProvider>
	);
}
