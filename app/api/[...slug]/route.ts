import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError, AxiosRequestConfig, ResponseType } from "axios";
import dayjs from "dayjs";

// A single handler acting as a proxyto manage all incoming client-side requests. This will allow us to utilise environment variables to configure our applications.
async function handler(request: NextRequest, context: { params: { slug: string[] } }) {
	const requestMethod = request.method; // Get the HTTP method (GET, POST, etc.)
	const slug = context.params.slug; // Capture dynamic route slug
	const contentType = request.headers.get("content-type") ?? "application/json"; // Check content type

	const BASE_URL = process.env.API_BASE_URL; // Currently fixed to a single URL. Could be extended to support multiple
	const responseType: ResponseType = "json"; // Currently fixed to json. Could be extended to support other response types
	const slugRoute = slug.join("/");
	if (!BASE_URL) {
		const error = "[route.handler][Error] Base route not found and not defined";
		console.error(error);
		return NextResponse.json(
			{
				error: error,
			},
			{ status: 500 }
		);
	}

	const axiosConfig: AxiosRequestConfig = {
		method: requestMethod,
		baseURL: BASE_URL,
		url: slugRoute,
		headers: {
			"Content-Type": contentType,
		},
		data: contentType === "application/json" ? await request.text() : await request.formData(),
		responseType: responseType,
	};

	console.log(
		`[route.handler][${dayjs().format("YYYY-MM-DD HH:mm:ss")}] Making request to: '${
			axiosConfig.baseURL
		}${axiosConfig.url}' with content type: '${contentType}'`
	);

	// Make the Axios call server-side
	try {
		const axiosResponse = await axios(axiosConfig); // Forward the server-side request
		const { data, status, headers } = axiosResponse;

		console.log(
			`[route.handler] Request to: '${axiosConfig.baseURL}${axiosConfig.url}' successfully completed, responded with type '${headers["content-type"]}' and status code: ${status}`
		);

		// For non-stream responses (e.g., JSON)
		if (headers["content-type"].includes("application/json")) {
			return new Response(JSON.stringify(data), {
				status: status,
				headers: {
					"Content-Type": headers["content-type"],
					"Content-Length": headers["content-length"],
				},
			});
		}

		// Streamed responses, such as "application/octet-stream" will need to be handled separately
		return new Response("Unsupported content type", { status: 415 });
	} catch (error: unknown) {
		if (error instanceof Error) {
			const axiosError = error as AxiosError;
			const response = axiosError.response;
			console.log(
				`[route.handler] Axios request failed with status code ${response?.status}: ${response?.statusText}`
			);
			// Return a 500 error if the Axios request fails
			return NextResponse.json(
				{
					error: error.message ?? "Request failed",
				},
				{ status: 500, statusText: response?.statusText }
			);
		}
		return NextResponse.json(
			{
				error: "Request failed with Unknown Error",
			},
			{
				status: 500,
				statusText: "Request failed with Unknown Error. Please contact system administrator.",
			}
		);
	}
}

export {
	handler as GET,
	handler as POST,
	handler as PUT,
	handler as DELETE,
	handler as OPTIONS,
	handler as HEAD,
};
