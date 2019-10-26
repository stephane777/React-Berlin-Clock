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
			citiesTimezone: {},
			timezoneList: {},
			selectedCity: {},
			error: null
		};
		this.handleTimezoneList = this.handleTimezoneList.bind(this);
		this.handleCityTimezone = this.handleCityTimezone.bind(this);
		// this.updateArea = this.updateArea.bind(this);
		this.handleFetchCity = this.handleFetchCity.bind(this);
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

	handleCityTimezone(list) {
		const timezoneFullPath = {};
		list.forEach(el => {
			if (el.includes("/") && !el.includes("GMT")) {
				const city = el.match(/\w+$/)[0];
				timezoneFullPath[city] = el;
			}
		});
		return timezoneFullPath;
	}

	handleFetchCity(e, area, city) {
		// this.setState({});
		this.setState({
			area,
			city
		});

		// console.log(Object.keys(area));
	}
	isLoading() {
		const { selectedCity } = this.state;
		// console.log(Object.keys(selectedCity).length === 0);
		return Object.keys(selectedCity).length === 0;
	}
	async componentDidMount() {
		console.log("[Index.js]componentDidMount()");
		try {
			// fetch the list of Cities per Region/area
			const timezoneList = await axios.get(
				"http://worldtimeapi.org/api/timezone/"
			);
			const citiesList = await this.handleTimezoneList(timezoneList.data);
			const citiesTimezone = await this.handleCityTimezone(timezoneList.data);
			// fetch the local time from the user's location
			const currentTimezone = await axios.get("http://worldtimeapi.org/api/ip");
			const selectedCity = await currentTimezone.data;
			const area = await selectedCity.timezone.match(/^\w+/)[0];
			const city = await selectedCity.timezone.match(/\w+$/)[0];
			this.setState({
				area,
				timezoneList: citiesList,
				citiesTimezone,
				selectedCity,
				city
			});
		} catch (error) {
			this.setState({
				error: "An error occured while accessing World time API."
			});
		}
	}
	async componentDidUpdate(prevProps, prevState) {
		console.log(`[Index.js] componentDidUpdate()`);
		console.log("componentDidUpdate");
		console.log(prevProps);
		console.log(prevState);
		// console.log(this.state.area);
		console.log(`${this.state.area}\\${this.state.city}`);
		console.log(`${prevState.area}\\${prevState.city}`);
		// console.log(this.state.selectedCity);
		if (prevState.city !== this.state.city && prevState.city != "") {
			try {
				const area = this.state.area;
				const city = this.state.city;
				let timezone = this.state.citiesTimezone[city];
				// console.log(`timezone: ${timezone}`);

				this.setState({ selectedCity: {} });
				const newTimezone = await axios.get(
					`http://worldtimeapi.org/api/timezone/${timezone}`
				);
				const selectedCity = await newTimezone.data;
				this.setState({ selectedCity });
			} catch (error) {
				console.log("An error has occured!!!!!!!");
				this.setState({
					error
				});
			}
		}
	}
	render() {
		console.log("[Index.js] render()");
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
							area={this.state.area}
							city={this.state.city}
							updateCity={(e, area, city) =>
								this.handleFetchCity(e, area, city)
							}
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
