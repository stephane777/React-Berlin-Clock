import React from "react";
import PropTypes from "prop-types";
import "../style/navbar.css";

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			areaHovered: ""
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
		// this.timezoneList = this.props.timezoneList;
		// this.changeArea = this.props.changeArea;
		// this.area = this.props.area;
		this.getCities = this.getCities.bind(this);
	}

	getCities(area) {
		const cities = this.props.timezoneList[area];
		return cities.map(city => <li key={city}>{city}</li>);
	}

	render() {
		const isTimezoneListPopulated = Object.keys(this.props.timezoneList).length;
		const classes = ["menu-cities"];

		const citiesOnHoverArea = this.areas.map(area => {
			return isTimezoneListPopulated ? (
				<ul
					className={`menu-cities ${
						area === this.state.areaHovered ? "active" : ""
					}`}
					key={area}
					id={area}
				>
					{this.getCities(area)}
				</ul>
			) : null;
			// return timezoneList ? <ul>{timezoneList[area]}</ul> : false;
		});

		return (
			<React.Fragment>
				<ul className="flex-center menu-area">
					{this.areas.map(el => (
						<li
							key={el}
							onMouseOver={() => this.setState({ areaHovered: el })}
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
						</li>
					))}
				</ul>
				{citiesOnHoverArea}
			</React.Fragment>
		);
	}
}

Navbar.propTypes = {
	changeArea: PropTypes.string.isRequired,
	changeArea: PropTypes.func.isRequired
};
export default Navbar;
