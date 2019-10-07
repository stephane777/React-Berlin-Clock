import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Navbar from "./Navbar";
import MainCard from "./MainCard";
import "../style/style.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			area: "",
			city: "",
			timezoneList: {},
			selectedCity: {}
		};
		this.handleTimezoneList = this.handleTimezoneList.bind(this);
		this.updateArea = this.updateArea.bind(this);
	}
	handleTimezoneList(list) {
		const getArea = str => str.match(/^\w+/)[0];
		const timezoneList = list.map(el => {
			return getArea(el);
		});
		const uniqueTimezone = new Set(timezoneList);
		// console.log(uniqueTimezone);
		const stateTimezoneCities = {};
		uniqueTimezone.forEach(el => {
			stateTimezoneCities[el] = [];
		});
		list.forEach(el => {
			const area = getArea(el);
			const city = el.match(/\w+$/)[0];
			stateTimezoneCities[area].push(city);
		});
		console.log(stateTimezoneCities);
		return stateTimezoneCities;
	}
	updateArea(area) {
		// console.log(area);
		this.setState({
			area
		});
	}
	async componentDidMount() {
		console.log("Index.js componentDidMount");
		// console.log("App componentDidMount");
		// const result = await fetch("http://worldtimeapi.org/api/timezone");
		// const json = await result.json();
		// await console.log(json);
		try {
			// fetch the list of Cities per Region/area
			const timezoneList = await axios.get(
				"http://worldtimeapi.org/api/timezone/"
			);
			const citiesList = await this.handleTimezoneList(timezoneList.data);

			// fetch the local time from the user's location
			const currentTimezone = await axios.get("http://worldtimeapi.org/api/ip");
			const selectedCity = await currentTimezone.data;
			const area = await selectedCity.timezone.match(/^\w+/)[0];
			this.setState({
				area,
				timezoneList: citiesList,
				selectedCity
			});
		} catch (error) {
			console.log(error);
		}
	}
	componentDidUpdate() {}
	render() {
		return (
			<div className="container">
				<Navbar
					changeArea={area => this.updateArea(area)}
					area={this.state.area}
					timezoneList={this.state.timezoneList}
				/>
				<MainCard selectedCity={this.state.selectedCity} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
