import React from "react";
import PropTypes from "prop-types";
import NavbarCities from "./NavbarCities";
import "../style/navbar.css";
import areas from "./areas";

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			areaHovered: "",
			error: null
		};
		this.areas = areas;
		this.citiesOnHoverArea = "";
		this.isLoading = this.isLoading.bind(this);
		this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
		this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
	}
	handleOnMouseEnter(area) {
		this.state.areaHovered !== area
			? this.setState({ areaHovered: area })
			: console.log(`this.state.areaHovered is not updated!`);
	}
	handleOnMouseOut(e) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({ areaHovered: "" });
	}
	isLoading() {
		const { timezoneList, area } = this.props;
		return !timezoneList[area] && !area && this.state.error === null;
	}

	render() {
		// console.log(Object.keys(this.citiesOnHoverArea));

		return (
			<React.Fragment>
				<ul className="flex-center menu-area">
					{this.areas.map((el, i) => (
						<li
							key={el}
							// onMouseOver={el => this.setState({ areaHovered: el })}
							// onMouseLeave={() => this.setState({ areaHovered: "" })}
							onMouseEnter={event => this.handleOnMouseEnter(el)}
							// onMouseOut={event => this.handleOnMouseOut(event,el)}
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
									onMouseOut={this.handleOnMouseOut}
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
