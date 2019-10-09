import React from "react";
import "../style/TimezoneCityCard.css";

const TimezoneCityCard = ({ selectedCity }) => {
	const {
		timezone,
		client_ip,
		unixtime,
		utc_datetime,
		datetime,
		utc_offset
	} = selectedCity;

	const convertUnixTs = t => {
		var dt = new Date(t * 1000);
		var hr = dt.getHours();
		var m = "0" + dt.getMinutes();
		var s = "0" + dt.getSeconds();
		return hr + ":" + m.substr(-2) + ":" + s.substr(-2);
	};
	// const convertUnix
	const timeUTC = convertUnixTs(unixtime);
	// const datetime =
	return (
		<div className="timezoneDetails">
			<div>
				<span>{timezone}</span>
			</div>
			<div>
				<span>UTC Date & Time: </span>
				<span>{timeUTC}</span>
			</div>
			<div>
				<span>UTC Offset: </span>
				<span>{utc_offset}</span>
			</div>
			<div>
				<span>Local Date & Time: </span>
				<span>{datetime}</span>
			</div>
		</div>
	);
};
export default TimezoneCityCard;
