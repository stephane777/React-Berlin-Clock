import React from "react";
import TimezoneCityCard from "./TimezoneCityCard";
import ErrorBoundaries from "./ErrorBoundaries";

const MainCard = props => {
	const { updateCity } = props;
	return (
		<ErrorBoundaries>
			<TimezoneCityCard selectedCity={props.selectedCity} />
		</ErrorBoundaries>
	);
};

export default MainCard;
