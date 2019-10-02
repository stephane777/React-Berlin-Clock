import React from "react";
import PropTypes from "prop-types";
import "../style/navbar.css";

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			areaHovered: "",
			error: null
		};
		this.areas = [
			"Africa",
			"America",
			"Antarctica",
			"Asia",
			"Atlantic",
			"Australia",
			"Europe",
			"Indian",
			"Pacific"
		];
		this.citiesOnHoverArea = "";
		// this.timezoneList = this.props.timezoneList;
		// this.changeArea = this.props.changeArea;
		// this.area = this.props.area;
		this.getCities = this.getCities.bind(this);
		this.isLoading = this.isLoading.bind(this);
	}

	getCities(area) {
		const cities = this.props.timezoneList[area];
		return cities.map(city => <li key={city}>{city}</li>);
	}
	isLoading() {
		const { timezoneList, area } = this.props;
		return !timezoneList[area] && !area && this.state.error === null;
	}

	// console.log(this.citiesOnHoverArea);

	render() {
		console.log(`Navbar.js render`);
		!this.isLoading()
			? (this.citiesOnHoverArea = this.areas.map(area => {
					// console.log(isTimezoneListPopulated);
					return (
						<div
							className={`menu-cities ${
								area === this.state.areaHovered ? "active" : ""
							}`}
						>
							<ul className="flex-center list-cities" key={area} id={area}>
								{this.getCities(area)}
							</ul>
						</div>
					);
					// return timezoneList ? <ul>{timezoneList[area]}</ul> : false;
			  }))
			: null;

		return (
			<React.Fragment>
				<ul className="flex-center menu-area">
					{this.areas.map((el, i) => (
						<li
							key={el}
							onMouseOver={() => {
								this.setState({ areaHovered: el });
							}}
							// onMouseLeave={() => this.setState({ areaHovered: "" })}
						>
							<button
								className="btn-clear nav-link"
								onClick={() => this.props.changeArea(el)}
								style={
									el === this.props.area ? { color: "red" } : { color: "#000" }
								}
							>
								{el}
							</button>
							{this.citiesOnHoverArea && this.citiesOnHoverArea[i]}
						</li>
					))}
				</ul>
			</React.Fragment>
		);
	}
}

Navbar.propTypes = {
	changeArea: PropTypes.string.isRequired,
	changeArea: PropTypes.func.isRequired
};
export default Navbar;
