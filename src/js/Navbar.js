import React from "react";
import PropTypes from "prop-types";
import NavbarCities from "./NavbarCities";
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
		this.isLoading = this.isLoading.bind(this);
	}

	isLoading() {
		const { timezoneList, area } = this.props;
		return !timezoneList[area] && !area && this.state.error === null;
	}

	componentDidMount() {
		console.log("[navbar.js] componentDidMount");
	}
	componentDidUpdate() {
		console.log("[navbar.js componentDidUpdate]");
	}

	render() {
		console.log(Object.keys(this.citiesOnHoverArea));
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
							{/* {this.citiesOnHoverArea && this.citiesOnHoverArea[i]} */}
							{!this.isLoading() ? (
								<NavbarCities
									area={el}
									timezoneList={this.props.timezoneList}
									areaHovered={this.state.areaHovered}
								/>
							) : null}
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
