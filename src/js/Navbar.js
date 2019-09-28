import React from "react";

const Navbar = props => {
	const area = [
		"Africa",
		"America",
		"Antartica",
		"Asia",
		"Atlantic",
		"Australia",
		"Europe",
		"India",
		"Pacific"
	];
	return (
		<ul className="flex-center">
			{area.map(el => (
				<li key={el}>
					<button className="btn-clear nav-link">{el}</button>
				</li>
			))}
		</ul>
	);
};
export default Navbar;
