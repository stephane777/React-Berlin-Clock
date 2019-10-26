import React from "react";
import { formatWithOptions } from "util";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, errorInfo);
		console.log("Something went wrong!");
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<h1
					style={{ color: "#f00", fontSize: "12px", fontFamily: "sans serif" }}
				>
					Something went wrong.
				</h1>
			);
		}

		return this.props.children;
	}
}
export default ErrorBoundary;
