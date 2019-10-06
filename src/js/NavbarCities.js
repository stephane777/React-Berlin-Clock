import React from "react";

const NavbarCities = props => {
	const { area, areaHovered, timezoneList, onMouseOut } = props;
	// console.log("[NavbarCities]");
	const getCities = area => {
		const cities = timezoneList[area];
		return cities.map(city => <li key={city}>{city}</li>);
	};

	return (
		<div
			id={`container-${area.toLowerCase()}`}
			className={`menu-cities ${area === areaHovered ? "active" : ""}`}
			onMouseLeave={event => onMouseOut(event)}
			// onMouseLeave={event => console.log(`onMouseLeave: ${event.target}`)}
		>
			<ul
				className="flex-center list-cities"
				key={area}
				id={area.toLowerCase()}
			>
				{getCities(area)}
			</ul>
			{/* <div>toto a ski</div> */}
		</div>
	);
};
export default NavbarCities;
