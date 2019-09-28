import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "../style/style.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			repos: {}
		};
		this.handleTimezoneList = this.handleTimezoneList.bind(this);
	}
	handleTimezoneList(list) {
		const getArea = str => str.match(/^\w+/)[0];
		const timezoneList = list.map(el => {
			return getArea(el);
		});
		const uniqueTimezone = new Set(timezoneList);
		// console.log(uniqueTimezone);
		const stateTimezoneCity = {};
		uniqueTimezone.forEach(el => {
			stateTimezoneCity[el] = [];
		});
		list.forEach(el => {
			const area = getArea(el);
			const city = el.match(/\w+$/)[0];
			stateTimezoneCity[area].push(city);
		});
		console.log(stateTimezoneCity);
		return stateTimezoneCity;
	}
	async componentDidMount() {
		// console.log("App componentDidMount");
		// const result = await fetch("http://worldtimeapi.org/api/timezone");
		// const json = await result.json();
		// await console.log(json);
		try {
			const result = await axios.get("http://worldtimeapi.org/api/timezone/");
			// console.log(result);
			const cityList = this.handleTimezoneList(result.data);
			this.setState({
				repos: cityList
			});
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<div className="container">
				<Navbar />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));
