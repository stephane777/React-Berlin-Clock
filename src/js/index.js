import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			repos: []
		};
	}

	async componentDidMount() {
		// console.log("App componentDidMount");
		// const result = await fetch("http://worldtimeapi.org/api/timezone");
		// const json = await result.json();
		// await console.log(json);
		try {
			const result = await axios.get(
				"http://worldtimeapi.org/api/timezone/Australia/Brisbane"
			);
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return <div>toto a poil!</div>;
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
