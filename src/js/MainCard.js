import React from "react";
import TimezoneCityCard from "./TimezoneCityCard";

const MainCard = props => {
	return (
		<React.Fragment>
			<TimezoneCityCard selectedCity={props.selectedCity} />
		</React.Fragment>
	);
};

export default MainCard;
