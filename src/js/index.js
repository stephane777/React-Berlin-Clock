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
			city: "toto",
			timezoneList: {},
			selectedCity: {},
			error: null
		};
		this.handleTimezoneList = this.handleTimezoneList.bind(this);
		this.updateArea = this.updateArea.bind(this);
		this.isLoading = this.isLoading.bind(this);
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
		// console.log(stateTimezoneCities);
		return stateTimezoneCities;
	}
	updateArea(area) {
		// console.log(area);
		this.setState({
			area
		});
	}
	isLoading() {
		const { selectedCity } = this.state;
		// console.log(Object.keys(selectedCity).length === 0);
		return Object.keys(selectedCity).length === 0;
	}
	async componentDidMount() {
		try {
			// fetch the list of Cities per Region/area
			const timezoneList = await axios.get(
				"http://worldtimeapi.org/api/timezone/"
			);
			const citiesList = await this.handleTimezoneList(timezoneList.data);
			// console.log(citiesList);
			// fetch the local time from the user's location
			const currentTimezone = await axios.get("http://worldtimeapi.org/api/ip");
			const selectedCity = await currentTimezone.data;
			const area = await selectedCity.timezone.match(/^\w+/)[0];
			const city = await selectedCity.timezone.match(/\w+$/)[0];
			this.setState({
				area,
				timezoneList: citiesList,
				selectedCity,
				city
			});
		} catch (error) {
			this.setState({
				error: "An error occured while accessing World time API."
			});
		}
	}
	componentDidUpdate() {}
	render() {
		const style = {
			fontSize: "22px",
			fontWeight: "bold"
		};
		const { error } = this.state;
		return (
			<div className="container">
				{this.isLoading() && !error && <p style={style}>Loading</p>}
				{error && <p>{error}</p>}
				{!this.isLoading() && (
					<React.Fragment>
						<Navbar
							changeArea={area => this.updateArea(area)}
							area={this.state.area}
							city={this.state.city}
							timezoneList={this.state.timezoneList}
						/>
						<MainCard selectedCity={this.state.selectedCity} />
					</React.Fragment>
				)}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
