import React from "react";

const NavbarCities = props => {
	const { area, areaHovered, timezoneList } = props;
	console.log("[NavbarCities]");
	const getCities = area => {
		const cities = timezoneList[area];
		console.log(`[getCities]`);
		console.log(`[area]: ${area}`);
		// console.log(`[cities] : ${cities}`);
		// console.log(`timezoneList[area]:${timezoneList[area]}`);
		return cities.map(city => <li key={city}>{city}</li>);
	};

	return (
		<div className={`menu-cities ${area === areaHovered ? "active" : ""}`}>
			<ul className="flex-center list-cities" key={area} id={area}>
				{getCities(area)}
			</ul>
		</div>
	);
};
export default NavbarCities;
